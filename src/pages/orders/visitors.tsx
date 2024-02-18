import { useQuery } from "react-query";
import { fetch_visitororders } from "../../api";
import { WaqTable } from "../../components";
import { useState } from "react";
import { IOrders } from "../../types/orders";
import OrdersModal from "../../components/pages/orders/orders-modal";

export const VisitorOrders = () => {
  const { data } = useQuery("users/partners", fetch_visitororders);

  const [openmodal, setOpenmodal] = useState<{
    key: string;
    data: { items: IOrders[] };
  } | null>();

  const getter = (v: { key: string; data: {items:IOrders[]} }) => {
    setOpenmodal(v);
  };
  return (
    <div className="flex flex-col gap-y-8 p-8">
      <h2 className="font-bold text-slate-700">Visitor Orders</h2>
      <WaqTable items={data} getter={getter as () => void} />
      {openmodal ? (
        <>
          {openmodal.key === "items" ? (
            <OrdersModal
              list={openmodal.data}
              close={() => setOpenmodal(null)}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};
