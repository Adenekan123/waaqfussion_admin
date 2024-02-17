import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Layout } from "./components/layouts/";
import Dashboard from "./pages/dashboard";
import { PartnerOrders, VisitorOrders } from "./pages/orders";
import { Partners, Visitors } from "./pages/users";
import { Categories, Courses, Product, Skills } from "./pages/setup";
import { ClientProvider } from "./contexts/client-provider";
import React from "react";
import SigninForm from "./pages/signin/form";
import { AuthProvider } from "./contexts/auth-provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="signin" element={<SigninForm />} />
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="orders">
          <Route path="partner" element={<PartnerOrders />} />
          <Route path="visitor" element={<VisitorOrders />} />
        </Route>
        <Route path="users">
          <Route path="partners" element={<Partners />} />
          <Route path="visitors" element={<Visitors />} />
        </Route>
        <Route path="setup">
          <Route path="products" element={<Product />} />
          <Route path="categories" element={<Categories />} />
          <Route path="skills" element={<Skills />} />
          <Route path="courses" element={<Courses />} />
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClientProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer />
    </ClientProvider>
  </React.StrictMode>
);
