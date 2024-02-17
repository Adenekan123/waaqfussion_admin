import { Outlet, useNavigate } from "react-router-dom";
import { Aside } from "./aside";
import { Main } from "./main";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/auth-provider";
export const Layout = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext()

  useEffect(() => {
    if (!user.token) navigate("/signin",{replace:true});
  }, [user.token, navigate]);
  return (
    <div className="flex h-screen overflow-hidden">
      <Aside />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};
