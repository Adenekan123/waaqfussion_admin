import { useMutation, useQuery, useQueryClient } from "react-query";
import { WaqTable } from "../..";
import { useState } from "react";
import {
  delete_category,
  fetch_productscategories,
} from "../../../api/products";
import { Modal } from "../../ui/modal";
import { BiPlus } from "react-icons/bi";
import { ProductCategoryForm } from "./form";
import { ICategory, IModal } from "../../../types/product";
import { apiErrorHandler } from "../../../api/error.handler";

export const ProductCategories = () => {
  const [selected, setSelected] = useState<ICategory | null>(null);
  const [openmodal, setOpenmodal] = useState<IModal | null>(null);
  
  const queryclient = useQueryClient();
  const { data: categories } = useQuery(
    "product/categories",
    fetch_productscategories,{onError:apiErrorHandler}
  );
  const deleteQuery = useMutation(
    (key: { categoryid: string }) => {
      return delete_category(key);
    },
    {
      onSuccess: () => {
        setOpenmodal(null);
        queryclient.invalidateQueries("product/categories");
      },
    }
  );

  const onAdd = () => {
    setSelected(null);
    setOpenmodal({ key: "form", data: [""] });
  };
  const onUpdate = (data: { name: string; _id: string }) => {
    setSelected(data);
    setOpenmodal({ key: "form", data: [""] });
  };

  const onDelete = (data: { name: string; _id: string }) =>
    deleteQuery.mutate({ categoryid: data._id });
  return (
    <div className="flex flex-col gap-y-8 p-8">
      <div className="flex gap-x-4 justify-between items-center">
        <h2 className="font-bold text-slate-700">All Product Categories</h2>
        <div>
          <button
            className="bg-orange-500 text-orange-100 capitalize font-semibold flex items-center gap-x-3 p-3 rounded-md"
            onClick={onAdd}
          >
            <BiPlus size={22} /> Add
          </button>
        </div>
      </div>
      <WaqTable
        items={categories}
        actions={[
          {
            title: "Update",
            func: onUpdate,
            style: "bg-orange-500 text-orange-50",
          },
          {
            title: "Delete",
            func: onDelete,
            style: "bg-red-500 text-red-50",
          },
        ]}
      />
      {openmodal ? (
        <>
          <Modal close={() => setOpenmodal(null)}>
            {openmodal.key === "form" ? (
              <ProductCategoryForm
                update_data={selected}
                close={() => setOpenmodal(null)}
              />
            ) : null}
          </Modal>
        </>
      ) : null}
    </div>
  );
};
