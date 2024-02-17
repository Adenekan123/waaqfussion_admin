import { useQuery } from "react-query";
import { fetch_visitors } from "../../api/users";
import { WaqTable } from "../../components";

export const Visitors = () => {
  const { data } = useQuery("users/visitors", fetch_visitors);

  return (
    <div className="flex flex-col gap-y-8 p-8">
      <h2 className="font-bold text-slate-700">Visitors</h2>
      <WaqTable items={data} />;
    </div>
  );
};
