const base_url = import.meta.env.VITE_BASE_URL;
// const admin_url = import.meta.env.VITE_API_URL;

export const login_async = async (credentials: {
  email: string;
  password: string;
}) => {
  const request = await fetch(`${base_url}/auth/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
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

export const verifyAuth = () => {
  return localStorage.getItem(import.meta.env.VITE_AUTH_KEY);
};
