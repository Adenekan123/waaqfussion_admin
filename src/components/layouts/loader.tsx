import { verifyAuth } from "../../api/auth";
import { redirect } from "react-router-dom";

const root_loader =  () => {
  const isAuth = verifyAuth();
  if (!isAuth) return redirect("/signin");
  return null;
};

export default root_loader;
