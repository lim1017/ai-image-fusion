import React, { useState, useEffect, useRef } from "react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

interface DropdownMenuProps {
  options: {
    label: string;
    linkTo: string;
  }[];
}

const DropdownMenu = ({ options }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        <div>
          <ul className="absolute right-0 mt-2 py-2 bg-white border border-gray-300 rounded shadow-lg w-40">
            {options.map((option) => {
              return (
                <li key={option.label}>
                  <Link to={`/${option.linkTo}`} className="mr-2">
                    <button
                      className="block text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={option.onClick}
                    >
                      {option.label}
                    </button>
                  </Link>
                </li>
              );
            })}

            <li className="mt-3 mb-2">
              <LogoutButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
