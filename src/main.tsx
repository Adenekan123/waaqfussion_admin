import React from "react";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Dashboard />} />
      <Route path="orders">
        <Route path="partner" element={<PartnerOrders />} />
        <Route path="vsistor" element={<VisitorOrders />} />
      </Route>
      <Route path="users">
        <Route path="partners" element={<Partners />} />
        <Route path="visitors" element={<Visitors />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
