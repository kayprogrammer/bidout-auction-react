import axios from 'axios';

axios.defaults.baseURL =`${process.env.REACT_APP_BASE_API_URL}/general`

// Retrieve Site Details
const getSitedetails = async () => {
    const response = await axios.get('/site-detail/');
    return response.data;
}

// Retrieve Reviews
const getReviews = async () => {
    const response = await axios.get('/reviews/');
    return response.data;
}

const generalService = { getSitedetails, getReviews }

export default generalService;