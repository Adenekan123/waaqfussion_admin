import { Outlet } from "react-router-dom";
import { Aside } from "./aside";
import { Main } from "./main";
export const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Aside />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};
