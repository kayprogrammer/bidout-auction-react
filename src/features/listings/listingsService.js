import api from '../api'

// Retrieve listings
const getListings = async (quantity) => {
    var url = '/listings/'
    if (quantity){
        url = `/listings/?quantity=${quantity}`
    } 
    const response = await api.get(url);
    return response.data;
}

// Retrieve single listing
const getListing = async (listingId) => {
    const response = await api.get(`/listings/${listingId}/`);
    return response.data;
}

// Retrieve Auctioneer listings
const getAuctioneerListings = async (quantity) => {
    var url = '/auctioneer/listings/'
    if (quantity){
        url = `/auctioneer/listings/?quantity=${quantity}`
    } 
    const response = await api.get(url);
    return response.data;
}
const listingsService = { getListings, getListing, getAuctioneerListings }

export default listingsService;