"use client";

import { useState } from "react";
import { WaqTable } from "../..";
import OrdersModal from "../orders/orders-modal";
import { IOrders } from "../../../types/orders";
// { recent = false }: { recent?: boolean }
const items = [
  {
    name: "Adenekan Usman Adesope",
    email: "mr.nekan123@gmail.com",
    phone: "+2349076308204",
    state: "lagos",
    address: "25, Adedeji Aderogba Street",
    items: [
      {
        orders: [
          {
            productid: {
              _id: "65789c1326964e7f9a9ac181",
              categoryid: "656da60de2bf454dcce0d75b",
              skillid: "656da6cde2bf454dcce0d770",
              name: "IoT Starter Kit",
              description: [
                "COD option availableBuild Five Robotic Models - MEX mobile",
                " Crane",
                " Forklift",
                " Snow Sweeper",
                " and a Walking Robot and learn basic mechanical design concepts",
                " Control their movements using the remote control avishkaar mobile app and give exciting sounds to them!",
              ],
              tag: "IoT",
              agerange: "12+ Ages",
              images: [
                "uploads/0973646001702403088_01-hero-image.webp",
                "uploads/0906999001702403088_2-lifestyle-image.webp",
                "uploads/0988564001702403088_03-parts.webp",
                "uploads/0881376001702403088_04-build-over2.webp",
                "uploads/0875053001702403088_5-isk-code-control.webp",
                "uploads/0736594001702403088_6-learn.webp",
                "uploads/0654132001702403088_isk-avishkaarcc-video-thumbail-64dda95f65c2b.webp",
              ],
              price: {
                curr: 4199,
                prev: 4499,
                discount: 6,
                _id: "65789c1326964e7f9a9ac182",
              },
              ratings: {
                rating: 5,
                totalreviews: 67,
                _id: "65789c1326964e7f9a9ac183",
              },
              createdAt: "2023-12-12T17:44:51.394Z",
              updatedAt: "2023-12-12T17:44:51.394Z",
            },
            quantity: 3,
            _id: "6579819bcd2ad066ff5c4731",
          },
        ],
        totalamount: 12597,
        _id: "6579819bcd2ad066ff5c4730",
      },
    ],
    _id: "6579819bcd2ad066ff5c472f",
  },
];
export const ParterOrders = () => {
  const [openmodal, setOpenmodal] = useState<{
    key: string;
    data: { items: IOrders[] };
  } | null>();

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="font-bold">Partner Orders</h2>
      <WaqTable items={items} getter={setOpenmodal as () => void} />
      {openmodal ? (
        <>
          {openmodal.key === "items" ? (
            <OrdersModal
              list={openmodal.data}
              close={() => setOpenmodal(null)}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};
