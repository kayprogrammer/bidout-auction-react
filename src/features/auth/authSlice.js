import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import jwt_decode from "jwt-decode";

const initialState = {
    user: null,
    guestUser: null,
    profile: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
    otpResent: false
};

export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
    try {
        return await authService.logout()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const activate = createAsyncThunk("auth/activate", async (user, thunkAPI) => {
    try {
        return await authService.activate(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const resendActivationEmail = createAsyncThunk("auth/resendActivationEmail", async (user, thunkAPI) => {
    try {
        return await authService.resendActivationEmail(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const requestPasswordReset = createAsyncThunk("auth/requestPasswordReset", async (user, thunkAPI) => {
    try {
        return await authService.requestPasswordReset(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const setNewPassword = createAsyncThunk("auth/setNewPassword", async (user, thunkAPI) => {
    try {
        return await authService.setNewPassword(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const getProfile = createAsyncThunk("auctioneer/getProfile", async (_, thunkAPI) => {
    try {
        return await authService.getProfile()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateProfile = createAsyncThunk("auctioneer/updateProfile", async (user, thunkAPI) => {
    try {
        return await authService.updateProfile(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = false;
            state.message = "";
            state.otpResent = false;
        },
        refreshToken: (state, action) => {
            var userDict = action.payload
            userDict['id'] = jwt_decode(action.payload.access)['user_id'] 
            state.user = userDict;
        },
        resetUser: (state) => {
            state.user = null
        },
        updateUserState: (state, action) => {
            state.user = action.payload
        },
        updateGuestUser: (state, action) => {
            state.guestUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                var userDict = action.payload.data
                userDict['id'] = jwt_decode(action.payload.data.access)['user_id'] 
                state.user = userDict;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(activate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(activate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;

            })
            .addCase(activate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resendActivationEmail.pending, (state) => {
                state.isLoading = true;
                state.otpResent = true;
            })
            .addCase(resendActivationEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.otpResent = true;
            })
            .addCase(resendActivationEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(requestPasswordReset.pending, (state) => {
                state.isLoading = true;
                state.otpResent = true;
            })
            .addCase(requestPasswordReset.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.otpResent = true;
                state.user = action.meta.arg
            })
            .addCase(requestPasswordReset.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(setNewPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setNewPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(setNewPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.message = action.payload.message;
                state.profile = action.payload.data
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
})

export const { reset, refreshToken, resetUser, updateUserState, updateGuestUser } = authSlice.actions;

export default authSlice.reducer;