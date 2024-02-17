import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetch_partners, fetch_togglepartners } from "../../api/users";
import { WaqTable } from "../../components";

export const Partners = () => {
  const queryclient = useQueryClient();
  const { data } = useQuery("users/partners", fetch_partners);

  const { isLoading, mutate } = useMutation(
    (key: { userid: string; status: number }) => {
      return fetch_togglepartners(key.userid, key.status);
    },
    { onSuccess: () => queryclient.invalidateQueries("users/partners") }
  );

  const getter = (v: { key: string; data: number; userid?: string }) => {
    if (
      v &&
      v.key &&
      v.key === "status" &&
      (v.data === 0 || v.data === 1) &&
      v.userid
    )
      mutate({ userid: v.userid, status: v.data });
  };

  return (
    <div className="flex flex-col gap-y-8 p-8">
      <h2 className="font-bold text-slate-700">
        Partners {isLoading ? "Loading..." : null}
      </h2>
      <WaqTable items={data} getter={getter as () => void} />
    </div>
  );
};
