
export const apiErrorHandler = (data:unknown) => {
  switch ((data as Error).message) {
    case "403":
      localStorage.removeItem(import.meta.env.VITE_AUTH_KEY);
      return;

    default:
      return console.log((data as Error).message)
  }
};
