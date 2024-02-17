import { TbLogout2 } from "react-icons/tb";
import { Navigations } from "./navigations";
import { useAuthContext } from "../../contexts/auth-provider";

export const Aside = () => {
   const {logout} = useAuthContext();
  return (
    <div className="h-full basis-2/12 border pr-8 pl-6 py-4 pb-8 flex flex-col">
      <span className="block logo text-4xl mb-8 pl-4 text-orange-500">Logo</span>
      <Navigations />
      <div className="mt-auto pl-4">
        <button onClick={logout} type="button" className="bg-orange-500 text-orange-50 px-4 py-3 font-semibold rounded-md capitalize w-full flex justify-center items-center">
          <span>
            <TbLogout2 size={20} />
          </span>
          <span className="ml-3">Logout</span>
          
        </button>
      </div>
    </div>
  );
};
