import { nanoid } from "nanoid";
import { WaqTable } from "../..";
import { IOrderItem, IOrders } from "../../../types/orders";
import { Modal } from "../../ui/modal";

const reducedorders = (items: IOrderItem[]) => {
  return items.reduce((acc, curr) => {
    const { productid, quantity } = curr;
    return [
      ...acc,
      {
        name: productid.name,
        tag: productid.tag,
        age: productid.agerange,
        quantity,
      },
    ];
  }, [] as { name: string; tag: string; age: string; quantity: number }[]);
};

const Orders = ({ items }: { items: IOrderItem[] }) => {
  const reduceditems = reducedorders(items);

  return <WaqTable key={nanoid(5)} items={reduceditems} />;
};

const OrdersModal = ({
  list,
  close,
}: {
  list: {items:IOrders[]};
  close: () => void;
}) => {
  return (
    <Modal close={close}>
      {list && Array.isArray(list.items) && list.items.map((item, i) => (
        <>
          <h3 className="mb-3 font-semibold">
            Order {i} (&#8358;{item.totalamount.toLocaleString("en")})
          </h3>
          <Orders items={item.orders} />
        </>
      ))}
    </Modal>
  );
};

export default OrdersModal;
