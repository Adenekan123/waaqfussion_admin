import { useMutation, useQueryClient } from "react-query";
import { create_productcategory, update_category } from "../../../api/products";
import { useState } from "react";
import { ICategory } from "../../../types/product";
import { apiErrorHandler } from "../../../api/error.handler";
import { toast } from "react-toastify";

const initial_state = {
  _id: "",
  name: "",
};
export const ProductCategoryForm = ({
  update_data,
  close,
}: {
  update_data: ICategory | null;
  close: () => void;
}) => {
  const queryclient = useQueryClient();
  const [state, setState] = useState(update_data || initial_state);

  //add cetegory
  const { isLoading: creating, mutate } = useMutation(
    (key: { name: string }) => {
      return create_productcategory(key);
    },
    {
      onSuccess: (data) => {
        if (data?.message) {
          toast(data.message);
          setState(initial_state);
          queryclient.invalidateQueries("product/categories");
        }
        close();
      },
      onError: apiErrorHandler,
    }
  );
  //update cetegory
  const { mutate: mutateUpdate, isLoading: updating } = useMutation(
    (key: { name: string; categoryid: string }) => {
      return update_category(key);
    },
    {
      onSuccess: (data) => {
        close();
        if (data?.message) {
          toast(data.message);
          setState(initial_state);
          queryclient.invalidateQueries("product/categories");
        }
      },
    }
  );

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update_data
      ? mutateUpdate({
          name: state.name,
          categoryid: update_data._id ? update_data._id : "",
        })
      : mutate({ name: state.name });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-1 p-8 gap-4">
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
      </div>
      <div className="p-8 text-center">
        <button
          disabled={creating || updating}
          type="submit"
          className="bg-orange-500 disabled:opacity-50 text-orange-50 font-semibold capitalize px-6 py-3 rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
