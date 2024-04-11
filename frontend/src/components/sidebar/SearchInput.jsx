// import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations";
import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

const SearchInput = () => {
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const [searchlist, setSearchlist] = useState([]);
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    const search = e.target.value;
    search
      ? setSearchlist(
          conversations.filter((c) =>
            c.fullName
              .toLowerCase()
              .replaceAll(" ", "")
              .includes(search.toLowerCase().replaceAll(" ", ""))
          )
        )
      : setSearchlist([]);
    setInput({ fullName: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchlist([]);
    setInput({});
    if (!input._id) {
      return toast.error("Please select name from the Searchlist!!");
    }
    setSelectedConversation(input);
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <div className="dropdown">
        <input
          tabIndex={0}
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full"
          value={input.fullName || ""}
          onChange={handleChange}
        />
        <ul
          tabIndex={0}
          className="dropdown-content z-[100] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {searchlist.length ? (
            searchlist.map((c, i) => (
              <li
                className="font-bold flex justify-center p-3 hover:bg-base-200 cursor-pointer"
                key={i}
                onClick={() => setInput(c)}
              >
                {c.fullName}
              </li>
            ))
          ) : input.fullName ? (
            <li className=" text-warning font-bold flex justify-center items-center">
              No conversation found :{"("}
            </li>
          ) : (
            <li className=" text-primary font-bold flex justify-center items-center">
              Search to get suggestions!!
            </li>
          )}
        </ul>
      </div>
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
