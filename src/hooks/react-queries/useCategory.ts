import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  create_productcategory,
  delete_category,
  fetch_productscategories,
} from "../../api/products";
import { ICategory } from "../../types/product";
import { toast } from "react-toastify";

type ICreateResponse = {
  message: string;
  error?: string;
};

const useCategory = () => {
  const queryClient = useQueryClient();
  const fetch_query = useQuery("product/category", fetch_productscategories);

  //queries
  const create_query = useMutation(
    (key: ICategory) => {
      return create_productcategory(key);
    },
    {
      onSuccess: (data: ICreateResponse) => {
        toast.success(data?.message || data?.error);
        queryClient.invalidateQueries("product/category");
      },
    }
  );

  const deleteQuery = useMutation(
    (key: { categoryid: string }) => {
      return delete_category(key);
    },
    {
      onSuccess: (data: ICreateResponse) => {
        toast.success(data?.message || data?.error);
        queryClient.invalidateQueries("product/category");
      },
    }
  );

  // actions
  const create = async (key: { name: string }) => {
    const { isLoading, isSuccess, data } = create_query;
    create_query.mutate(key);
    console.log(isLoading, isSuccess, data);
  };

  return { fetch_query, create, deleteQuery };
};

export default useCategory;
