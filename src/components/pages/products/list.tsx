import { useMutation, useQuery, useQueryClient } from "react-query";
import { ImagePreview, ProductForm, WaqTable } from "../..";
import { useState } from "react";
import { delete_product, fetch_products } from "../../../api/products";
import { Modal } from "../../ui/modal";
import { BiPlus } from "react-icons/bi";
import { IOpenModal, IProductForm } from "../../../types/product";

export const ProductList = () => {
  const [selected, setSelected] = useState<IProductForm | null>(null);
  const queryClient = useQueryClient();
  const { data } = useQuery("products", fetch_products);
  const deleteQuery = useMutation(
    "product/delete",
    (key: { productid: string }) => {
      return delete_product(key);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

  const [openmodal, setOpenmodal] = useState<IOpenModal | null>(null);

  const getter = (v: { key: string; data: { images?: string[] } }) => {
    setOpenmodal(v);
  };
  const onAdd = () => {
    setSelected(null);
    setOpenmodal({ key: "form", data: {} });
  };
  const onDelete = (data: { _id: string }) => {
    deleteQuery.mutate({ productid: data._id });
  };
  const onUpdate = (data: IProductForm) => {
    setSelected(data);
    setOpenmodal({ key: "form", data: {} });
  };
  return (
    <div className="flex flex-col gap-y-8 p-8">
      <div className="flex gap-x-4 justify-between items-center">
        <h2 className="font-bold text-slate-700">All Courses</h2>
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
        items={data}
        getter={getter as () => void}
        actions={[
          {
            title: "Update",
            func: onUpdate,
            style: "bg-orange-500 text-orange-50",
          },
          {
            title: "Delete",
            func: onDelete,
            style: "bg-red-500 text-red-50 font-semibold",
          },
        ]}
      />
      {openmodal ? (
        <>
          <Modal close={() => setOpenmodal(null)}>
            {openmodal.key === "form" ? (
              <ProductForm
                update_data={selected}
                close={() => setOpenmodal(null)}
              />
            ) : null}
            {openmodal.key === "images" ? (
              <ImagePreview
                itemid={openmodal.data._id ? openmodal.data._id : ""}
              />
            ) : null}
          </Modal>
        </>
      ) : null}
    </div>
  );
};
