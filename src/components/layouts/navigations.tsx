"use client";

import { useState } from "react";

import { Link } from "react-router-dom";
import { INavigation } from "../../types";
import { navigations } from "../../static";
import { FaChevronDown } from "react-icons/fa";
import { nanoid } from "nanoid";

export const Navigation = ({ navigation }: { navigation: INavigation }) => {
  const { title, url, icon: Icon, sublist } = navigation;
  const [open, setOpen] = useState(false);
  return (
    <>
      {url ? (
        <Link
          to={url}
          className={`flex justify-between items-center w-full border-0 mb-3 py-3 px-3 hover:bg-orange-100 rounded-md`}
          onClick={() => (sublist ? setOpen((prev) => !prev) : setOpen(false))}
        >
          <span className="flex items-center gap-x-4">
            <span>
              <Icon size={24} className="text-orange-500" />
            </span>
            <span className="capitalize">{title}</span>
          </span>
          {sublist ? (
            <span>
              <FaChevronDown size={14} className="text-slate-500" />
            </span>
          ) : null}
        </Link>
      ) : (
        <button
          className={`flex justify-between items-center w-full border-0 mb-3 py-3 px-3 hover:bg-orange-100 rounded-md`}
          onClick={() => (sublist ? setOpen((prev) => !prev) : setOpen(false))}
        >
          <span className="flex items-center gap-x-4">
            <span>
              <Icon size={24} className="text-orange-500" />
            </span>
            <span className="capitalize">{title}</span>
          </span>
          {sublist ? (
            <span>
              <FaChevronDown size={14} className="text-slate-500" />
            </span>
          ) : null}
        </button>
      )}

      {sublist ? (
        <div
          className={`pl-3 overflow-hidden ${
            open ? "max-h-96" : "max-h-0"
          } transition-all`}
        >
          {sublist.map((item) => (
            <Navigation navigation={item} key={nanoid(4)} />
          ))}
        </div>
      ) : null}
    </>
  );
};
export const Navigations = () => {
  return (
    <div className="w-full flex flex-col">
      {navigations.map((navigation) => (
        <Navigation navigation={navigation} key={nanoid(5)} />
      ))}
    </div>
  );
};
