import { IProductForm, IProductUpdate } from "../types/product";

const url = import.meta.env.VITE_API_URL;
const visitor_url = import.meta.env.VITE_BASE_URL;

export const create_products = async (values: IProductForm) => {
  const {
    name,
    tag,
    images,
    description,
    skillid,
    categoryid,
    agerange,
    price,
    ratings,
  } = values;
  const formdata = new FormData();

  formdata.append("name", name);
  formdata.append("tag", tag);
  formdata.append("agerange", agerange);
  formdata.append("skillid", skillid);
  formdata.append("categoryid", categoryid);
  formdata.append("description", description.join("+"));
  formdata.append("price", JSON.stringify(price));
  formdata.append("ratings", JSON.stringify(ratings));

  for (const image of images) {
    formdata.append("image", image);
  }
  return await (
    await fetch(`${url}/product/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
      body: formdata,
    })
  ).json();
};
export const fetch_products = async () => {
  const request = await fetch(`${url}/product/all`, {
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
      throw new Error(`Unable to fetch products`);
    }
  } else return await request.json();
};
export const get_productimages = async (productid: string) => {
  return await (
    await fetch(`${url}/product/image?productid=${productid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
    })
  ).json();
};

export const delete_product = async (value: { productid: string }) => {
  const request = await fetch(`${url}/product?productid=${value.productid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(
        import.meta.env.VITE_AUTH_KEY
      )}`,
    },
    body: JSON.stringify(value),
  });
  if (!request.ok) {
    if (request.status === 403) {
      // Handle 403 status (Token expired or unauthorized)
      throw new Error("Token expired or unauthorized");
    } else {
      // Handle other non-OK statuses
      throw new Error(`Unable to delete product`);
    }
  } else return await request.json();
};
export const delete_productimage = async (value: {
  image_url: string;
  productid: string;
}) => {
  const request = await fetch(`${url}/product/image`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(
        import.meta.env.VITE_AUTH_KEY
      )}`,
    },
    body: JSON.stringify(value),
  });
  if (!request.ok) {
    if (request.status === 403) {
      // Handle 403 status (Token expired or unauthorized)
      throw new Error("Token expired or unauthorized");
    } else {
      // Handle other non-OK statuses
      throw new Error(`Unable to delete product image`);
    }
  } else return await request.json();
};
export const update_product = async (value: {
  productid: string;
  fields: IProductUpdate;
}) => {
  const { productid, fields } = value;
  const formdata = new FormData();

  const {
    name,
    tag,
    agerange,
    skillid,
    categoryid,
    description,
    price,
    ratings,
    images,
  } = fields;
  if (images && Array.isArray(images) && images.length) {
    for (let i = 0; i < images.length; i++) {
      formdata.append("image", images[i]);
    }
  }
  formdata.append("name", name);
  formdata.append("tag", tag);
  formdata.append("agerange", agerange);
  formdata.append("skillid", skillid);
  formdata.append("categoryid", categoryid);
  formdata.append("description", description.join("+"));
  formdata.append("price", JSON.stringify(price));
  formdata.append("ratings", JSON.stringify(ratings));
  return await (
    await fetch(`${url}/product/update?productid=${productid}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
      body: formdata,
    })
  ).json();
};

//category
export const create_productcategory = async (value: { name: string }) => {
  return await (
    await fetch(`${url}/product/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
      body: JSON.stringify(value),
    })
  ).json();
};
export const fetch_productscategories = async () => {
  return await (
    await fetch(`${visitor_url}/product/categories`, {
      cache: "no-cache",
    })
  ).json();
};

export const delete_category = async (value: { categoryid: string }) => {
  return await (
    await fetch(`${url}/product/category?categoryid=${value.categoryid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
    })
  ).json();
};
export const update_category = async (value: {
  categoryid: string;
  name: string;
}) => {
  const { categoryid, name } = value;
  return await (
    await fetch(`${url}/product/category?categoryid=${categoryid}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
    })
  ).json();
};

export const fetch_productskills = async () => {
  return await (
    await fetch(`${visitor_url}/product/skills`, {
      cache: "no-cache",
    })
  ).json();
};

export const create_productskill = async (value: { name: string }) => {
  return await (
    await fetch(`${url}/product/skill`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
    })
  ).json();
};

export const delete_skill = async (value: { skillid: string }) => {
  return await (
    await fetch(`${url}/product/skill?skillid=${value.skillid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
    })
  ).json();
};
export const update_skill = async (value: {
  skillid: string;
  name: string;
}) => {
  const { skillid, name } = value;
  return await (
    await fetch(`${url}/product/skill?skillid=${skillid}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_AUTH_KEY
        )}`,
      },
    })
  ).json();
};
// export const update_product = async (fileds) => {
//   return await (
//     await fetch(`${url}/order/visitors/recent`, {
//       method: "GET",
//       headers: {
//         Authorization:`Bearer ${localStorage.getItem(import.meta.env.VITE_AUTH_KEY)}`
//       },
//       cache: "no-cache",
//     })
//   ).json();
// };

// export const fdelete_product = async (productid) => {
//   return await (
//     await fetch(`${url}/order/visitors`, {
//       method: "GET",
//       headers: {
//         Authorization:`Bearer ${localStorage.getItem(import.meta.env.VITE_AUTH_KEY)}`
//       },
//       cache: "no-cache",
//     })
//   ).json();
// };
