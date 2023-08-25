import { useState, useEffect, useRef } from "react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";

interface DropdownMenuProps {
  options: {
    label: string;
    linkTo: string;
  }[];
  data?: any;
  mobileMenuOpen?: boolean;
}

const DropdownMenu = ({ options, data, mobileMenuOpen }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
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
    <div>
      {mobileMenuOpen ? (
        <div>
          {options.map((option) => {
            return (
              <Link to={`/${option.linkTo}`} className="mr-2">
                <button className="block text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                  {option.label}
                </button>
              </Link>
            );
          })}

          <LogoutButton className="text-[12px]" />
        </div>
      ) : (
        <div
          className="relative inline-block animate slideInRight"
          ref={dropdownRef}
        >
          <button
            className="border-solid border-gray-400 border-2 px-6 py-2 text-lg rounded-3xl w-full focus:border-violet-500 focus:outline-none"
            onClick={toggleMenu}
          >
            <FaHamburger
              className="inline-block hover:opacity-50"
              size="2.25em"
            />
          </button>
          {isOpen && (
            <div>
              <ul className="absolute right-0 mt-2 py-2 bg-white border border-gray-300 rounded shadow-lg w-40">
                <p className="p-2 mb-2">{data.nickname}</p>
                {options.map((option) => {
                  return (
                    <li className="mb-1" key={option.label}>
                      <Link to={`/${option.linkTo}`} className="mr-2">
                        <button className="block text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                          {option.label}
                        </button>
                      </Link>
                    </li>
                  );
                })}

                <li className="mb-2">
                  <LogoutButton />
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
