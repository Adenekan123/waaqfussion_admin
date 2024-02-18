import { useQuery } from "react-query";
import { fetch_partnerRecentOrders } from "../../../api";
import { WaqTable } from "../..";
import { useState } from "react";
import OrdersModal from "../orders/orders-modal";
import { IOrders } from "../../../types/orders";

export const RecentvisitorOrders = () => {
  const { data } = useQuery("order/partners", fetch_partnerRecentOrders);
  console.log(data)
  const [openmodal, setOpenmodal] = useState<{
    key: string;
    data: {items: IOrders[];} 
  } | null>();
  const getter = (v:{
    key: string;
    data:{items: IOrders[]};
  })=>{
    setOpenmodal(v)
  }
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="font-bold text-slate-700">Recent Orders (Visitor)</h2>
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
