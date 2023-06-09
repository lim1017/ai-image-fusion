import React, { useState, useEffect, useRef } from "react";
import LogoutButton from "./LogoutButton";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // Handle option click logic here
    console.log("Selected option:", option);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="border-solid border-gray-400 border-2 px-6 py-2 text-lg rounded-3xl w-full focus:border-violet-500 focus:outline-none"
        onClick={toggleMenu}
      >
        {/* Replace with your desired icon */}
        <span className="text-gray-500">&#x2630;</span>
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 py-2 bg-white border border-gray-300 rounded shadow-lg w-40">
          <li>
            <button
              className="block text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleOptionClick("Option 1")}
            >
              My Posts
            </button>
          </li>
          <li>
            <button
              className="block text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleOptionClick("Option 2")}
            >
              Favourites
            </button>
          </li>
          <li className="mt-3">
            <LogoutButton />
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
