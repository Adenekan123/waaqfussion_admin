"use client";
import { nanoid } from "nanoid";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface IGetter {
  key: string;
  data: string[] | object;
  userid?: string;
}

const WaqRow = ({
  row,
  headers,
  getter,
  actions,
}: {
  row: object;
  headers: string[];
  getter?: (v: IGetter) => void;
  actions?: { title: string; func: (v: any) => void; style?: string }[];
}) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      <tr>
        {headers.map((header, j) => (
          <td
            key={nanoid(5)}
            className={`${j > 2 ? "hidden md:table-cell" : ""}`}
          >
            {typeof row[header as keyof typeof row] === "object" ||
            header === "status"
              ? null
              : row[header as keyof typeof row]}
          </td>
        ))}
        <th>
          <button onClick={() => setCollapse((prev) => !prev)}>
            <BiChevronDown size={24} />
          </button>
        </th>
      </tr>
      <tr className={`${collapse ? "table-row" : "hidden"}`}>
        <td colSpan={headers.length + 1} className="border">
          <table className="w-full">
            <tbody>
              {headers.map((header) => (
                <tr key={nanoid(4)}>
                  <th>{header}</th>
                  <td>
                    {typeof row[header as keyof typeof row] === "object" ? (
                      Array.isArray(row[header as keyof typeof row]) &&
                      getter ? (
                        <button
                          className="border border-orange-500 rounded-md px-4 py-1 text-orange-500 font-semibold"
                          onClick={() =>
                            getter({
                              data: row,
                              key: header,
                            })
                          }
                        >
                          View
                        </button>
                      ) : (
                        <>
                          {Object.keys(row[header as keyof typeof row])
                            .map((value) =>
                              value === "_id"
                                ? ""
                                : `${value}: ${
                                    row[header as keyof typeof row][value]
                                  }`
                            )
                            .join(" | ")}
                        </>
                      )
                    ) : header === "status" ? (
                      getter && (
                        <button
                          className="border border-orange-500 rounded-md px-4 py-1 text-orange-500 font-semibold"
                          onClick={() =>
                            getter({
                              data: row,
                              key: header,
                              userid: (row as any)._id,
                            })
                          }
                        >
                          {row[header as keyof typeof row] === 1
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      )
                    ) : (
                      row[header as keyof typeof row]
                    )}
                  </td>
                </tr>
              ))}
              {actions ? (
                <tr>
                  <th>Actions</th>
                  <td>
                    {actions.map((action) => (
                      <button
                        onClick={() => action.func(row)}
                        className={`border rounded-md px-4 py-1 font-semibold capitalize inline-block mr-3 ${action.style}`}
                      >
                        {action.title}
                      </button>
                    ))}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
};

export const WaqTable = ({
  items,
  getter,
  actions,
}: {
  items: object[];
  getter?: (v: { key: string; data: string[] | object | string }) => void;
  actions?: { title: string; func: (v: any) => void; style?: string }[];
}) => {
  if (!items || !Array.isArray(items) || !items.length) return null;
  const headers = Object.keys(items[0]);
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={nanoid(5)}
                className={`${i > 2 ? "hidden md:table-cell" : ""}`}
              >
                {header === "images" ||
                header === "price" ||
                header === "items" ||
                header === "status" ||
                header === "description"
                  ? null
                  : header}
              </th>
            ))}
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <WaqRow
              key={nanoid(5)}
              row={item}
              headers={headers}
              getter={getter}
              actions={actions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
