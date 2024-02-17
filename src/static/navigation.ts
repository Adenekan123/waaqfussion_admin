import { INavigation } from "../types";
import { MdSpaceDashboard, MdOutlineCategory } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { RiListRadio } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { GrConfigure } from "react-icons/gr";
import { PiUsersThreeBold  } from "react-icons/pi";
import { LiaUsersSolid   } from "react-icons/lia";
import {TbShoppingCartCog } from "react-icons/tb";

export const navigations: INavigation[] = [
  {
    title: "dashboard",
    icon: MdSpaceDashboard,
    url: "/",
  },
  {
    title: "users",
    icon: HiUsers,
    url: "",
    sublist: [
      { title: "partners", icon: PiUsersThreeBold, url: "/users/partners" },
      { title: "visitors", icon: LiaUsersSolid, url: "/users/visitors" },
    ],
  },
  {
    title: "orders",
    icon: BiSolidShoppingBags,
    url: "",
    sublist: [
      { title: "partners", icon: PiUsersThreeBold, url: "/orders/partner" },
      { title: "visitors", icon: LiaUsersSolid, url: "/orders/visitor" },
    ],
  },
  {
    title: "product setup",
    icon: GrConfigure,
    url: "",
    sublist: [
      { title: "products", icon: TbShoppingCartCog, url: "/setup/products" },
      {
        title: "categories",
        icon: MdOutlineCategory,
        url: "/setup/categories",
      },
      { title: "skills", icon: RiListRadio, url: "/setup/skills" },
    ],
  },
];
