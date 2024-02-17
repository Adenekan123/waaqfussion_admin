import { ReactNode } from "react";
import { GrClose } from "react-icons/gr";

export const Modal = ({
  children,
  close,
}: {
  children: ReactNode;
  close: () => void;
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/80 justify-center items-center p-8">
      <div className="absolute right-8 top-5">
        <button onClick={close} className="text-white">
          <GrClose size={24} />
        </button>
      </div>
      <div className="bg-white p-8 modal-content w-8/12 mx-auto">
        {children}
      </div>
    </div>
  );
};
