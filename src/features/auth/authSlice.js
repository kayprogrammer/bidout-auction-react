import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
    user: null,
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

export const logout = createAsyncThunk("auth/logout", async () => {
    authService.logout();
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
            state.user = action.payload
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
                state.user = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
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
    },
})

export const { reset, refreshToken } = authSlice.actions;

export default authSlice.reducer;