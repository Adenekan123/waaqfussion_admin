import { LiaUsersSolid } from "react-icons/lia";
import { PiUsersThreeBold } from "react-icons/pi";
import { ImCart } from "react-icons/im";
import { HiShoppingBag } from "react-icons/hi";

export const Stats = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-blue-50 p-6 rounded-md flex flex-col justify-center items-center text-center gap-y-3 text-blue-500">
        <span>
          <PiUsersThreeBold size={48} />
        </span>
        <span className="font-semibold capitaliz text-xl">Partners</span>
        <span className="font-semibold capitalize text-blue-600 text-2xl">
          20
        </span>
      </div>
      <div className="bg-orange-50 p-6 rounded-md flex flex-col justify-center items-center text-center gap-y-3 text-orange-500">
        <span>
          <LiaUsersSolid size={48} />
        </span>
        <span className="font-semibold capitalize text-xl">Visitors</span>
        <span className="font-semibold capitalize text-orange-600 text-2xl">
          100
        </span>
      </div>
      <div className="bg-green-50 p-6 rounded-md flex flex-col justify-center items-center text-center gap-y-3  text-green-500">
        <span>
          <ImCart size={48} />
        </span>
        <span className="font-semibold capitalize text-xl">
          Partner's Orders
        </span>
        <span className="font-semibold capitalize text-green-600 text-2xl">
          50
        </span>
      </div>
      <div className="bg-purple-50 p-6 rounded-md flex flex-col justify-center items-center text-center gap-y-3 text-purple-500">
        <span>
          <HiShoppingBag size={48} />
        </span>
        <span className="font-semibold capitaliz text-xl">
          Visitor's Orders
        </span>
        <span className="font-semibold capitalize text-purple-600 text-2xl">
          20
        </span>
      </div>
    </div>
  );
};
