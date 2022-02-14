import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    <div className="relative z-0 mt-6 flex justify-center  rounded-md shadow-sm">
      {pages > 1 && (
        <div>
          {[...Array(pages).keys()].map((x) => (
            <Link
              className={` relative z-10 inline-flex items-center  border px-4 py-2 text-sm font-medium text-indigo-600 ${
                page == x + 1 &&
                "border-indigo-500 bg-indigo-50  text-indigo-600"
              }`}
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/changeproducts/${x + 1}`
              }
            >
              {x + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Paginate;
