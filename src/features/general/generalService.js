import axios from 'axios';

// Retrieve Site Details
const getSitedetails = async () => {
    const response = await axios.get('/general/site-detail/');
    return response.data;
}

// Retrieve Reviews
const getReviews = async () => {
    const response = await axios.get('/general/reviews/');
    return response.data;
}

const generalService = { getSitedetails, getReviews }

export default generalService;