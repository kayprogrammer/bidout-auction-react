import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listingsService from './listingsService';

const initialState = {
    listings: [],
    listing: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

// get listings
export const getListings = createAsyncThunk('listings/getAll', async (quantity=null, thunkAPI) => {
    try {
        return await listingsService.getListings(quantity);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// get listing
export const getListing = createAsyncThunk('listings/get', async (listingId, thunkAPI) => {
    try {
        return await listingsService.getListing(listingId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// get auctioneer listings
export const getAuctioneerListings = createAsyncThunk('listings/getAuctioneerListings', async (quantity=null, thunkAPI) => {
    try {
        return await listingsService.getAuctioneerListings(quantity);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const listingsSlice = createSlice({
    name: 'listings',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getListings.pending, (state) =>  {
                state.isLoading = true
            })
            .addCase(getListings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listings=action.payload.data;
            })
            .addCase(getListings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message=action.payload
            })
            .addCase(getListing.pending, (state) =>  {
                state.isLoading = true
            })
            .addCase(getListing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listing=action.payload.data;
            })
            .addCase(getListing.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message=action.payload
            })
            .addCase(getAuctioneerListings.pending, (state) =>  {
                state.isLoading = true
            })
            .addCase(getAuctioneerListings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listings=action.payload.data;
            })
            .addCase(getAuctioneerListings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message=action.payload
            })
    },
})

export const { reset } = listingsSlice.actions;
export default listingsSlice.reducer; 