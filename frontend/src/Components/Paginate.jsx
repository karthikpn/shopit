import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    <>
      {pages > 1 && (
        <div>
          {[...Array(pages).keys()].map((x) => (
            <Link
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
    </>
  );
};

export default Paginate;
