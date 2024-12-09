import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductDetails } from '../utils/api'; // API calls

// Async Thunks for API Calls

// Fetch all products
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProducts(); // API call to fetch products
      return response.data; // Assume response contains the product list in `data`
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Fetch product details by ID
export const getProductDetails = createAsyncThunk(
  'products/getProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchProductDetails(id); // API call to fetch product details
      return response.data; // Assume response contains the product details in `data`
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product details');
    }
  }
);

// Initial State
const initialState = {
  products: [], // List of all products
  productDetails: null, // Details of a single product
  loading: false, // Loading state for API requests
  error: null, // Error message
};

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Optional: Add synchronous reducers if needed
    clearProductDetails: (state) => {
      state.productDetails = null; // Clear product details
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getProducts
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getProductDetails
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Reducer and Actions
export const { clearProductDetails } = productSlice.actions;
export default productSlice.reducer; // Export as `productReducer`
