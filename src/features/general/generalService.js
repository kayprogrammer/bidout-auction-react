import axios from 'axios';


const SITEDETAIL_URL = "/general/site-detail/"
const REVIEWS_URL = "/general/reviews/"

// Retrieve Site Details
const getSitedetails = async () => {
    const response = await axios.get(SITEDETAIL_URL);
    return response.data;
}

// Retrieve Reviews
const getReviews = async () => {
    const response = await axios.get(REVIEWS_URL);
    return response.data;
}

const generalService = { getSitedetails, getReviews }

export default generalService;