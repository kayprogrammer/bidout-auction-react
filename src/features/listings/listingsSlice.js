import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listingsService from './listingsService';

const initialState = {
    listings: [],
    listing: {},
    categories: [],
    bids: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
    statusCode: null,
}

// get listings
export const getListings = createAsyncThunk('listings/getAll', async (quantity = null, thunkAPI) => {
    try {
        return await listingsService.getListings(quantity);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// get listings by category
export const getListingsByCategory = createAsyncThunk('listings/getByCategory', async (categorySlug, thunkAPI) => {
    try {
        return await listingsService.getListingsByCategory(categorySlug);
    } catch (error) {
        const status = error.response.status
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue({status: status, message: message});
    }
})

// get watchlist listings
export const getWatchlistListings = createAsyncThunk('listings/getWatchlistListings', async (_, thunkAPI) => {
    try {
        return await listingsService.getWatchlistListings();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Add Listing To Watchlist
export const addListingToWatchlist = createAsyncThunk('listings/addListingToWatchlist', async (listingData, thunkAPI) => {
    try {
        return await listingsService.addListingToWatchlist(listingData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// get listing
export const getListing = createAsyncThunk('listings/get', async (listingSlug, thunkAPI) => {
    try {
        return await listingsService.getListing(listingSlug);
    } catch (error) {
        const status = error.response.status
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue({status: status, message: message});
    }
})

// get listing bids
export const getListingBids = createAsyncThunk('bids/get', async (listingSlug, thunkAPI) => {
    try {
        return await listingsService.getListingBids(listingSlug);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// get auctioneer listings
export const getAuctioneerListings = createAsyncThunk('listings/getAuctioneerListings', async (quantity = null, thunkAPI) => {
    try {
        return await listingsService.getAuctioneerListings(quantity);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// get categories
export const getCategories = createAsyncThunk('listings/categories/categories', async (_, thunkAPI) => {
    try {
        return await listingsService.getCategories();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// create listing
export const createListing = createAsyncThunk('listings/post', async (listingData, thunkAPI) => {
    try {
        return await listingsService.createListings(listingData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// create listing
export const updateListing = createAsyncThunk('listings/patch', async (listingData, thunkAPI) => {
    try {
        return await listingsService.updateListing(listingData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Retrieve listing bids
export const retrieveListingBids = createAsyncThunk('authBids/get', async (listingSlug, thunkAPI) => {
    try {
        return await listingsService.retrieveListingBids(listingSlug);
    } catch (error) {
        const status = error.response.status
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue({status: status, message: message});
    }
})

// Retrieve listing bids
export const placeBid = createAsyncThunk('bids/post', async (bidsData, thunkAPI) => {
    try {
        return await listingsService.placeBid(bidsData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.data) || error.response.data.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const listingsSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {
        removeFromWatchlist: (state, action) => {
            const listings = action?.payload?.listings
            const listing_slug = action?.payload?.slug
            const updated_listings = listings.filter(obj => obj.slug !== listing_slug)
            state.listings = updated_listings
        },
        reset: (state) => {
            state.listings = []
            state.listing = {}
            state.categories = []
            state.bids = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listings = action.payload.data;
            })
            .addCase(getListings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getListingsByCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListingsByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listings = action.payload.data;
                state.statusCode = null;
            })
            .addCase(getListingsByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.statusCode = action.payload.status;
            })
            .addCase(getWatchlistListings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWatchlistListings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listings = action.payload.data;
            })
            .addCase(getWatchlistListings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(addListingToWatchlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(addListingToWatchlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getListing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listing = action.payload.data;
                state.statusCode = null // Status code can be used for the entire stuff anyway
            })
            .addCase(getListing.rejected, (state, action) => {
                state.isLoading = false;
                state.statusCode = action.payload.status
            })
            .addCase(getListingBids.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bids = action.payload.data;
            })
            .addCase(getListingBids.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getAuctioneerListings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAuctioneerListings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listings = action.payload.data;
            })
            .addCase(getAuctioneerListings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories = action.payload.data;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(createListing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;

            })
            .addCase(createListing.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(updateListing.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.message = action.payload.message;

            })
            .addCase(updateListing.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload
            })
            .addCase(retrieveListingBids.pending, (state) => {
                state.isLoading = true
            })
            .addCase(retrieveListingBids.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bids = action.payload.data.bids;
                state.listing = { name: action.payload.data.listing }
                state.statusCode = null
            })
            .addCase(retrieveListingBids.rejected, (state, action) => {
                state.isLoading = false;
                state.statusCode = action.payload.status
            })
    },
})

export const { reset, removeFromWatchlist } = listingsSlice.actions;
export default listingsSlice.reducer; 