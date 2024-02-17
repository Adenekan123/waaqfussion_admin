import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  create_products,
  fetch_productscategories,
  fetch_productskills,
  update_product,
} from "../../../api/products";
import { ICategory, IProductForm } from "../../../types/product";
import { useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const initial_state: IProductForm = {
  name: "",
  tag: "",
  agerange: "",
  categoryid: "",
  skillid: "",
  images: [],
  description: [],
  price: { curr: "", prev: "", discount: "" },
  ratings: { rating: "", totalreviews: "" },
};
export const ProductForm = ({
  update_data,
  close,
}: {
  update_data: IProductForm | null;
  close: () => void;
}) => {
  console.log({ update_data });
  const queryclient = useQueryClient();
  const { data: categories } = useQuery(
    "product/categories",
    fetch_productscategories
  );
  const { data: skills } = useQuery("product/skills", fetch_productskills);
  const [text, setText] = useState("");
  const [state, setState] = useState(update_data || initial_state);

  //new product
  const addProductQry = useMutation(
    (key: IProductForm) => {
      return create_products(key);
    },
    {
      onSuccess: (data) => {
        if (data?.message) {
          toast.success(data.message);
          setState(initial_state);
          queryclient.invalidateQueries("products");
        }
      },
    }
  );

  //update product
  const updateQry = useMutation(
    (key: { productid: string; fields: IProductForm }) => {
      return update_product(key);
    },
    {
      onSuccess: (data) => {
        close();
        if (data?.message) {
          toast.success(data.message);
          setState(initial_state);
          queryclient.invalidateQueries("products");
        }
      },
    }
  );

  const onAddNewDescription = () => {
    if (!text.length) return;
    setState((prev) => ({ ...prev, description: [text, ...prev.description] }));
    setText("");
  };

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const updateprice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, price: { ...prev.price, [name]: value } }));
  };
  const updaterating = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [name]: value },
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = event.target.files;
    if (newImages)
      setState((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update_data
      ? updateQry.mutate({
          productid: state._id as string,
          fields: state,
        })
      : addProductQry.mutate(state);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-3 p-8 gap-4">
        <div>
          <label htmlFor="name" className="block mb-3 capitalize">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            id="name"
            name="name"
            value={state.name}
            onChange={update}
            className="block w-full border rounded-md bg-white py-3 px-3"
          />
        </div>
        <div>
          <label htmlFor="tag" className="block mb-3 capitalize">
            Tag
          </label>
          <input
            type="text"
            placeholder="Enter tag"
            id="tag"
            name="tag"
            value={state.tag}
            onChange={update}
            className="block w-full border rounded-md bg-white py-3 px-3"
          />
        </div>
        <div>
          <label htmlFor="agerange" className="block mb-3 capitalize">
            Age Range
          </label>
          <input
            type="text"
            placeholder="Enter age range"
            id="agerange"
            name="agerange"
            value={state.agerange}
            onChange={update}
            className="block w-full border rounded-md bg-white py-3 px-3"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-3 capitalize">
            Category
          </label>
          <select
            name="categoryid"
            id="category"
            value={state.categoryid}
            onChange={update}
            className="block w-full border rounded-md bg-white py-3 px-3"
          >
            <option value="0">Select Category</option>
            {categories &&
              categories.map((category: ICategory) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="skills" className="block mb-3 capitalize">
            Skill
          </label>
          <select
            name="skillid"
            id="skill"
            onChange={update}
            value={state.skillid}
            className="block w-full border rounded-md bg-white py-3 px-3"
          >
            <option value="0">Select Skill</option>
            {skills &&
              skills.map((skill: ICategory) => (
                <option key={skill._id} value={skill._id}>
                  {skill.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="images" className="block mb-3 capitalize">
            Images
          </label>
          <input
            name="images"
            type="file"
            id="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="block w-full border rounded-md bg-white py-3 px-3"
          />
        </div>
        <div className=" col-span-3">
          <label htmlFor="agerange" className="block mb-3 capitalize">
            Price
          </label>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Previuos Price"
              id="prev"
              name="prev"
              value={state.price.prev}
              onChange={updateprice}
              className="block w-full border rounded-md bg-white py-3 px-3"
            />
            <input
              type="text"
              placeholder="Current Price"
              id="curr"
              name="curr"
              value={state.price.curr}
              onChange={updateprice}
              className="block w-full border rounded-md bg-white py-3 px-3"
            />
            <input
              type="text"
              placeholder="Discount"
              id="discount"
              name="discount"
              value={state.price.discount}
              onChange={updateprice}
              className="block w-full border rounded-md bg-white py-3 px-3"
            />
          </div>
          <div className=" col-span-3 mt-4">
            <label htmlFor="agerange" className="block mb-3 capitalize">
              Ratings
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="rating"
                id="rating"
                name="rating"
                value={state.ratings.rating}
                onChange={updaterating}
                className="block w-full border rounded-md bg-white py-3 px-3"
              />
              <input
                type="text"
                placeholder="Total reviews"
                id="totalreviews"
                name="totalreviews"
                value={state.ratings.totalreviews}
                onChange={updaterating}
                className="block w-full border rounded-md bg-white py-3 px-3"
              />
            </div>
          </div>
        </div>
        <div className=" col-span-3">
          <label htmlFor="description" className="block mb-3 capitalize">
            Description
          </label>
          <div className="border">
            <div className="p-3 border flex gap-x-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                name="text"
                id="text"
                className="py-1 border px-3 basis-11/12"
                placeholder="Enter description"
              />
              <button
                type="button"
                className="bg-slate-300 px-6 py-2 font-semibold"
                onClick={onAddNewDescription}
              >
                Add
              </button>
            </div>
            <div className="p-3 ml-6">
              <ul className="list-disc">
                {state.description.map((item) => (
                  <li className="list-item" key={nanoid(3)}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 text-center">
        <button
          disabled={addProductQry.isLoading || updateQry.isLoading}
          type="submit"
          className="bg-orange-500 disabled:opacity-50 text-orange-50 font-semibold capitalize px-6 py-3 rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
