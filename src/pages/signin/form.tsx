import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/auth-provider";
import { useNavigate } from "react-router-dom";

const initial_state = { email: "", password: "" };

const SigninForm = () => {
  const navigate = useNavigate();
  const { login, user } = useAuthContext();
  const [state, setState] = useState(initial_state);
  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(state);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user.token) navigate("/");
  }, [user.token]);
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-50">
      <div className="form-container basis-3/12 bg-slate-200 rounded-sm flex flex-col gap-y-12 px-12 py-10 shadow-md shadow-slate-200">
        <p className="font-bold text-orange-500 capitalize text-xl text-center rounded-md">
          Sign In
        </p>

        <form onSubmit={submit} className="flex flex-col gap-y-12">
          <input
            type="email"
            name="email"
            required
            onChange={update}
            value={state.email}
            placeholder="Email"
            className="w-full px-3 py-4 border-slate-600 rounded-md"
          />
          <input
            type="password"
            name="password"
            required
            onChange={update}
            value={state.password}
            placeholder="Password"
            className="w-full px-3 py-4 border-slate-600 rounded-md"
          />
          
          <button className="block w-full p-4 bg-orange-500 text-orange-100 font-bold rounded-md text-lg" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
