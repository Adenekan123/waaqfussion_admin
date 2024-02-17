const url = import.meta.env.VITE_API_URL;
export const fetch_togglepartners = async (userid: string, status: number) => {
  return await (
    await fetch(
      `${url}/partners/toggleuser?userid=${userid}&status=${status}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            import.meta.env.VITE_AUTH_KEY
          )}`,
        },
        cache: "no-cache",
      }
    )
  ).json();
};
export const fetch_visitors = async () => {
  return await (
    await fetch(`${url}/visitors`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
      cache: "no-cache",
    })
  ).json();
};
export const fetch_partners = async () => {
  return await (
    await fetch(`${url}/partners`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
      cache: "no-cache",
    })
  ).json();
};
