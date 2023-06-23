import api from '../api'

// Register user

const register = async (userData) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
}

// Login user 
const login = async (userData) => {
    const response = await api.post('/auth/login/', userData);
    return response.data;
};

// Logout user 
const logout = async () => {
    const response = await api.get('/auth/logout/');
    return response.data;
};

// Activate user 
const activate = async (userData) => {
    const response = await api.post('/auth/verify-email/', userData);
    return response.data;
};

// Resend Activation Email 
const resendActivationEmail = async (userData) => {
    const response = await api.post('/auth/resend-verification-email/', userData);
    return response.data;
};

// Request Password Reset Email 
const requestPasswordReset = async (userData) => {
    const response = await api.post('/auth/request-password-reset-otp/', userData);
    return response.data;
};

// Verify Password Reset Otp 
const verifyPasswordResetOtp = async (userData) => {
    const response = await api.post('/auth/verify-password-reset-otp/', userData);
    return response.data;
};

// Set New Password 
const setNewPassword = async (userData) => {
    const response = await api.post('/auth/set-new-password/', userData);
    return response.data;
};

// Get User Profile 
const getProfile = async () => {
    const response = await api.get('/auctioneer/');
    return response.data;
};

// Update User Profile 
const updateProfile = async (userData) => {
    const response = await api.put('/auctioneer/', userData);
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    activate,
    resendActivationEmail,
    requestPasswordReset,
    verifyPasswordResetOtp,
    setNewPassword,
    getProfile,
    updateProfile
}

export default authService;