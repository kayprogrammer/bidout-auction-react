import axios from 'axios';

// Retrieve listings
const getListings = async (quantity) => {
    var url = '/listings/'
    if (quantity){
        url = `/listings/?quantity=${quantity}`
    } 
    const response = await axios.get(url);
    return response.data;
}

// Retrieve single listing
const getListing = async (listingId) => {
    const response = await axios.get(`/${listingId}/`);
    return response.data;
}

const listingsService = { getListings, getListing }

export default listingsService;