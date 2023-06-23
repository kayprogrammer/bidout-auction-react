import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import generalService from './generalService';

const initialState = {
    sitedetails: {},
    reviews: [],
    isError: false,
    isLoading: false,
    subscriptionLoading: false,
    isSuccess: false,
    message: ''
}

// get site details
export const getSitedetails = createAsyncThunk('sitedetails/get', async (_, thunkAPI) => {
    try {
        return await generalService.getSitedetails();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// get reviews
export const getReviews = createAsyncThunk('reviews/getAll', async (_, thunkAPI) => {
    try {
        return await generalService.getReviews();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// subscribe
export const subscribe = createAsyncThunk('subscribe/post', async (data, thunkAPI) => {
    try {
        return await generalService.subscribe(data);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = false;
            state.message = "";
            state.subscribe = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSitedetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sitedetails=action.payload.data;
            })
            .addCase(getSitedetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message=action.payload
            })
            .addCase(getReviews.pending, (state) =>  {
                state.isLoading = true
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reviews=action.payload.data;
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message=action.payload
            })
            .addCase(subscribe.pending, (state) =>  {
                state.subscriptionLoading = true
            })
            .addCase(subscribe.fulfilled, (state, action) => {
                state.subscriptionLoading = false;
                state.isSuccess = true;
                state.message=action.payload.message;
            })
            .addCase(subscribe.rejected, (state, action) => {
                state.subscriptionLoading = false;
                state.isError = true;
                state.message=action.payload
            })
    },
})

export const { reset } = generalSlice.actions;
export default generalSlice.reducer; 