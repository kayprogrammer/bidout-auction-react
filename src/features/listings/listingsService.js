import axios from 'axios';

axios.defaults.baseURL =`${process.env.REACT_APP_BASE_API_URL}/listings`

// Retrieve listings
const getListings = async (quantity) => {
    var url = '/'
    if (quantity){
        url = `/?quantity=${quantity}`
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