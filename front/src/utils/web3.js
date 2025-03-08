import { ethers } from 'ethers';

// ABI for the NFT contract
const NFT_CONTRACT_ABI = [
  // This would be the actual ABI for your NFT contract
  // Example ABI entries:
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  "function approve(address to, uint256 tokenId)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function setApprovalForAll(address operator, bool approved)"
];

// ABI for the marketplace contract
const MARKETPLACE_CONTRACT_ABI = [
  // This would be the actual ABI for your marketplace contract
  // Example ABI entries:
  "function createListing(uint256 tokenId, uint256 price)",
  "function cancelListing(uint256 listingId)",
  "function purchaseListing(uint256 listingId) payable",
  "function getListingPrice(uint256 listingId) view returns (uint256)",
  "function getListingDetails(uint256 listingId) view returns (address seller, uint256 tokenId, uint256 price, bool active)"
];

// Contract addresses (would be different for different networks)
const NFT_CONTRACT_ADDRESS = {
  1: '0x...', // Ethereum Mainnet
  5: '0x...', // Goerli Testnet
  137: '0x...', // Polygon Mainnet
  80001: '0x...' // Mumbai Testnet
};

const MARKETPLACE_CONTRACT_ADDRESS = {
  1: '0x...', // Ethereum Mainnet
  5: '0x...', // Goerli Testnet
  137: '0x...', // Polygon Mainnet
  80001: '0x...' // Mumbai Testnet
};

// Get contract instances
export const getNFTContract = async (provider, chainId) => {
  if (!NFT_CONTRACT_ADDRESS[chainId]) {
    throw new Error(`NFT contract not deployed on chain ID ${chainId}`);
  }
  
  return new ethers.Contract(
    NFT_CONTRACT_ADDRESS[chainId],
    NFT_CONTRACT_ABI,
    provider
  );
};

export const getMarketplaceContract = async (provider, chainId) => {
  if (!MARKETPLACE_CONTRACT_ADDRESS[chainId]) {
    throw new Error(`Marketplace contract not deployed on chain ID ${chainId}`);
  }
  
  return new ethers.Contract(
    MARKETPLACE_CONTRACT_ADDRESS[chainId],
    MARKETPLACE_CONTRACT_ABI,
    provider
  );
};

// Get user's NFT cards
export const getUserCards = async (provider, address, chainId) => {
  try {
    const nftContract = await getNFTContract(provider, chainId);
    const balance = await nftContract.balanceOf(address);
    
    const tokenIds = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
      tokenIds.push(tokenId.toString());
    }
    
    return tokenIds;
  } catch (error) {
    console.error('Error getting user cards:', error);
    throw error;
  }
};

// Create a marketplace listing
export const createMarketplaceListing = async (signer, tokenId, price, chainId) => {
  try {
    const nftContract = await getNFTContract(signer, chainId);
    const marketplaceContract = await getMarketplaceContract(signer, chainId);
    
    // First approve the marketplace to transfer the NFT
    const marketplaceAddress = MARKETPLACE_CONTRACT_ADDRESS[chainId];
    const approveTx = await nftContract.approve(marketplaceAddress, tokenId);
    await approveTx.wait();
    
    // Then create the listing
    const priceInWei = ethers.utils.parseEther(price.toString());
    const listingTx = await marketplaceContract.createListing(tokenId, priceInWei);
    const receipt = await listingTx.wait();
    
    // Extract listing ID from event logs
    const event = receipt.events.find(e => e.event === 'ListingCreated');
    const listingId = event.args.listingId.toString();
    
    return listingId;
  } catch (error) {
    console.error('Error creating marketplace listing:', error);
    throw error;
  }
};

// Purchase a marketplace listing
export const purchaseMarketplaceListing = async (signer, listingId, chainId) => {
  try {
    const marketplaceContract = await getMarketplaceContract(signer, chainId);
    
    // Get the listing price
    const price = await marketplaceContract.getListingPrice(listingId);
    
    // Purchase the listing
    const purchaseTx = await marketplaceContract.purchaseListing(listingId, {
      value: price
    });
    await purchaseTx.wait();
    
    return true;
  } catch (error) {
    console.error('Error purchasing marketplace listing:', error);
    throw error;
  }
}; 