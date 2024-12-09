import axios from 'axios';

// Create an axios instance with a base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

// Add request interceptor to add authorization headers if a token is present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Attach token to request headers
  }
  return req;
});

// ----------------- Cart Routes --------------------

// Add item to cart
export const addToCart = (data) => {
  return API.post('/cart', data); // POST request to add an item to the cart
};

// Get user's cart
export const getCart = () => {
  return API.get('/cart'); // GET request to fetch the user's cart
};

// Update cart item
export const updateCartItem = (itemId, data) => {
  return API.put(`/cart/${itemId}`, data); // PUT request to update a cart item by ID
};

// Delete cart item
export const deleteCartItem = (itemId) => {
  return API.delete(`/cart/${itemId}`); // DELETE request to remove a cart item by ID
};

// ----------------- Order Routes --------------------

// Place an order
export const placeOrder = (data) => {
  return API.post('/orders', data); // POST request to place an order
};

// Get user's order history
export const getOrderHistory = () => {
  return API.get('/orders'); // GET request to fetch the user's order history
};

// ----------------- Product Routes --------------------

// Get all products
export const getProducts = () => {
  return API.get('/products'); // GET request to fetch all products
};

// Add a new product (admin only)
export const addProduct = (data) => {
  return API.post('/products', data); // POST request to add a new product (admin only)
};

// Update an existing product (admin only)
export const updateProduct = (id, data) => {
  return API.put(`/products/${id}`, data); // PUT request to update a product by ID (admin only)
};

// Delete a product (admin only)
export const deleteProduct = (id) => {
  return API.delete(`/products/${id}`); // DELETE request to delete a product by ID (admin only)
};

// ----------------- User Routes --------------------

// Register a new user
export const registerUser = (data) => {
  return API.post('/register', data); // POST request to register a new user
};

// Login user
export const loginUser = (credentials) => {
  return API.post('/login', credentials); // POST request to log in a user
};

// Get user profile
export const getUserProfile = () => {
  return API.get('/profile'); // GET request to fetch user profile (protected route)
};
