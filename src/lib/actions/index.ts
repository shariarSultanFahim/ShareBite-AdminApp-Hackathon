// Axios configuration

import { getSession } from "next-auth/react";
import { authSession } from "../server/session.ssr";
import axios from "axios";

// Configuring root url
export const rootURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
if (!rootURL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

// configuring axios on initial load
export const instance = axios.create({
  baseURL: rootURL,
  headers: {
    accept: "*/*",
  },
});

// Add trailing slash to all requests - this is a workaround for the issue with the API made in Django
instance.interceptors.request.use((config) => {
  if (config?.url?.[config.url.length - 1] !== "/") {
    config.url += "/";
  }
  return config;
});

// Set Bearer Token
instance.interceptors.request.use(async (configuration) => {
  let session = null;
  if (typeof window !== "undefined") {
    // For CSR
    try {
      session = await getSession();
    } catch (error) {
      console.warn("Could not retrieve session for API request:", error);
    }
  } else {
    //  For SSR
    session = await authSession();
  }

  if (session) {
    // If session is available, set Authorization Token in Header
    const token = (session as { accessToken?: string })?.accessToken;

    if (token) {
      configuration.headers.Authorization = `Bearer ${token}`;
    }
  }

  return configuration;
});

export default instance;
