import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Set the base URL directly to avoid environment variable issues
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend-8rnq.onrender.com";

// Custom error interface with additional properties
interface ApiError extends Error {
  status?: number;
  data?: any;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      // Add default Content-Type header
      headers.set('Content-Type', 'application/json');
      
      let token = undefined;
      try {
        // Try to get token from cookies first
        const userInfo = Cookies.get("admin");
        if (userInfo) {
          const user = JSON.parse(userInfo);
          if (user?.accessToken) {
            token = user.accessToken;
          }
        }
        
        // Fallback: check localStorage if not found in cookies
        if (!token && typeof window !== 'undefined') {
          const localUser = localStorage.getItem("admin");
          if (localUser) {
            const user = JSON.parse(localUser);
            if (user?.accessToken) {
              token = user.accessToken;
            }
          }
        }
        
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
          // Debug log
          console.log("Setting Authorization token for request");
        }
      } catch (error) {
        console.error("Error parsing user info for token:", error);
      }
      
      return headers;
    },
    // Add custom error handling
    responseHandler: async (response) => {
      if (!response.ok) {
        // Log detailed error info for debugging
        const errorData = await response.text();
        console.error(`API Error (${response.status}):`, errorData);
        
        // Throw a more informative error
        const error = new Error(response.statusText) as ApiError;
        error.status = response.status;
        try {
          error.data = JSON.parse(errorData);
        } catch {
          error.data = errorData;
        }
        throw error;
      }
      return response.json();
    },
  }),
  // Add retry logic for network failures
  keepUnusedDataFor: 300, // Cache data for 5 minutes
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 30, // Refetch after 30 seconds
  endpoints: (builder) => ({}),
  tagTypes: [
    "DashboardAmount",
    "DashboardSalesReport",
    "DashboardMostSellingCategory",
    "DashboardRecentOrders",
    "AllProducts",
    "StockOutProducts",
    "AllCategory",
    "AllBrands",
    "getCategory",
    "AllOrders",
    "getBrand",
    "ReviewProducts",
    "AllCoupons",
    "Coupon",
    "AllStaff",
    "Stuff"
  ],
});
