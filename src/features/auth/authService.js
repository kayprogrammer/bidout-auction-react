import axios from 'axios';

// Register user
const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

const register = async (userData) => {
    const response = await axios.post('/auth/register/', userData, config);
    return response.data;
}

// Login user 
const login = async (userData) => {
    const response = await axios.post('/auth/login/', userData, config);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data))
    }
    return response.data;
};

// Logout user 
const logout = async () => {
    const response = await axios.get('/auth/logout/');
    return response.data;
};

// Activate user 
const activate = async (userData) => {
    const response = await axios.post('/auth/verify-email/', userData, config);
    return response.data;
};

// Resend Activation Email 
const resendActivationEmail = async (userData) => {
    const response = await axios.post('/auth/resend-verification-email/', userData, config);
    return response.data;
};

// Request Password Reset Email 
const requestPasswordResetEmail = async (userData) => {
    const response = await axios.post('/auth/request-password-reset-otp/', userData, config);
    return response.data;
};

// Verify Password Reset Otp 
const verifyPasswordResetOtp = async (userData) => {
    const response = await axios.post('/auth/verify-password-reset-otp/', userData, config);
    return response.data;
};

// Set New Password 
const setNewPassword = async (userData) => {
    const response = await axios.post('/auth/set-new-password/', userData, config);
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    activate,
    resendActivationEmail,
    requestPasswordResetEmail,
    verifyPasswordResetOtp,
    setNewPassword
}

export default authService;