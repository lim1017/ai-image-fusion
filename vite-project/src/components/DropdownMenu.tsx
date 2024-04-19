import { useState, useEffect, useRef } from "react";
import LogoutButton from "../Modules/Auth/components/LogoutButton";
import { Link } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import Button from "./Button";

interface DropdownMenuProps {
  options: {
    label: string;
    linkTo: string;
  }[];
  string?: string;
  mobileMenuOpen?: boolean;
}

const DropdownMenu = ({ options, string }: DropdownMenuProps) => {
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
      <div className="relative inline-block" ref={dropdownRef}>
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
          <nav className="mt-2 absolute bg-white py-2 px-4 rounded shadow-md z-20 left-[-5px] min-w-[170px] animate zoomIn">
            <div>
              <div className="p-2 text-[19px]">Hello, {string}</div>

              {options.map((option) => {
                return (
                  <Link key={option.linkTo} to={`/${option.linkTo}`}>
                    <Button intent="alt" className="mb-2">
                      {option.label}
                    </Button>
                  </Link>
                );
              })}

              <LogoutButton />
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
