// import { IErrorResponse } from "../types/auth";
// import { apiErrorHandler } from "./error.handler";

const url = import.meta.env.VITE_API_URL;

export const fetch_partnerorders = async () => {
  const request = await fetch(`${url}/order/partners`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        import.meta.env.VITE_AUTH_KEY
      )}`,
    },
    cache: "no-cache",
  });
  if (!request.ok) {
    if (request.status === 403) {
      // Handle 403 status (Token expired or unauthorized)
      throw new Error("Token expired or unauthorized");
    } else {
      // Handle other non-OK statuses
      throw new Error(`Unable to fetch orders`);
    }
  } else return await request.json();
};
export const fetch_partnerRecentOrders = async () => {
  const request = await fetch(`${url}/order/visitors/recent`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        import.meta.env.VITE_AUTH_KEY
      )}`,
    },
    cache: "no-cache",
  });
  if (!request.ok) {
    if (request.status === 403) {
      // Handle 403 status (Token expired or unauthorized)
      throw new Error("Token expired or unauthorized");
    } else {
      // Handle other non-OK statuses
      throw new Error(`Unable to fetch parner orders`);
    }
  } else return await request.json();
};

export const fetch_visitororders = async () => {
    const request = await fetch(`${url}/order/visitors`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
      cache: "no-cache",
    });
    if (!request.ok) {
      if (request.status === 403) {
        // Handle 403 status (Token expired or unauthorized)
        throw new Error("Token expired or unauthorized");
      } else {
        // Handle other non-OK statuses
        throw new Error(`Invalid credentials`);
      }
    } else return await request.json();
  
};
