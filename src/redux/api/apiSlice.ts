import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Set the base URL directly since environment variables might not be loaded
const BASE_URL = "https://backend-8rnq.onrender.com";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      let token = undefined;
      try {
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
          console.log("Sending Authorization token:", token);
        } else {
          console.warn("No admin token found for Authorization header");
        }
      } catch (error) {
        console.error("Error parsing user info for token:", error);
      }
      return headers;
    },
  }),
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
