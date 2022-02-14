import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = () => {
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div class="flex items-center justify-center ">
      <div class="flex rounded ">
        <input
          className="w-3/4 px-4 py-2 text-black"
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="border-l bg-blue-500 px-4 text-white hover:bg-blue-600 "
          onClick={submitHandler}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
