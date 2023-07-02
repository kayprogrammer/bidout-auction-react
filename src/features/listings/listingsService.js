import api from '../api'

// Retrieve listings
const getListings = async (quantity) => {
    var url = '/listings/'
    if (quantity) {
        url = `/listings/?quantity=${quantity}`
    }
    const response = await api.get(url);
    return response.data;
}

// Retrieve Listings By Category
const getListingsByCategory = async (categorySlug) => {
    const response = await api.get(`/listings/categories/${categorySlug}/`);
    return response.data;
}

// Retrieve Listings By Watchlist
const getWatchlistListings = async () => {
    const response = await api.get('/listings/watchlist/');
    return response.data;
}

// Add Listing To Watchlist
const addListingToWatchlist = async (listingData) => {
    const response = await api.post('/listings/watchlist/', listingData);
    return response.data;
}

// Retrieve single listing
const getListing = async (listingId) => {
    const response = await api.get(`/listings/detail/${listingId}/`);
    return response.data;
}

// Retrieve bids
const getListingBids = async (listingSlug) => {
    const response = await api.get(`/listings/detail/${listingSlug}/bids/`);
    return response.data;
}

// Retrieve Auctioneer listings
const getAuctioneerListings = async (quantity) => {
    var url = '/auctioneer/listings/'
    if (quantity) {
        url = `/auctioneer/listings/?quantity=${quantity}`
    }
    const response = await api.get(url);
    return response.data;
}

// Retrieve Categories
const getCategories = async () => {
    const response = await api.get('/listings/categories/');
    return response.data;
}

// Create listing
const createListings = async (listingData) => {
    const response = await api.post('/auctioneer/listings/', listingData);
    return response.data;
}

// Update listing
const updateListing = async (listingData) => {
    const slug = listingData.slug
    delete listingData['slug']
    const response = await api.patch(`/auctioneer/listings/${slug}/`, listingData);
    return response.data;
}

// Retrieve listing bids
const retrieveListingBids = async (listingSlug) => {
    const response = await api.get(`/auctioneer/listings/${listingSlug}/bids/`);
    return response.data;
}

// Place bid
const placeBid = async (bidData) => {
    const slug = bidData.slug
    delete bidData['slug']
    const response = await api.post(`/listings/detail/${slug}/bids/`, bidData);
    return response.data;
}

const listingsService = { getListings, getListingsByCategory, getWatchlistListings, addListingToWatchlist, getListing, getListingBids, getAuctioneerListings, getCategories, createListings, updateListing, retrieveListingBids, placeBid }

export default listingsService;