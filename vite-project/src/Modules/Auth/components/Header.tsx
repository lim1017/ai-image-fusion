import { logo } from "../../../assets";
import { Link } from "react-router-dom";

import Button from "../../../components/Button";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import DropdownMenu from "../../../components/DropdownMenu";
import { useEffect, useState } from "react";

import { FaHamburger } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import { useDispatch } from "react-redux";
import { userActions } from "../../../redux/userReducer";
import { fetchUser } from "../lib/api";

export default function Header() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const token = await getAccessTokenSilently();
      //@ts-expect-error its handled
      const userInfo = await fetchUser(user.email, token);
      dispatch({
        type: userActions.SETFAV,
        payload: userInfo.data.user.favourites,
      });
    };

    if (isAuthenticated && user) {
      getUser();
    }
  }, [isAuthenticated]);

  const userOptions = [
    {
      label: "My Posts",
      linkTo: "my-posts",
    },
    {
      label: "Favourites",
      linkTo: "favourites",
    },
    {
      label: "Chat",
      linkTo: "chat",
    },
  ];

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <div className="flex items-center">
          <Link to="/" className="mr-2">
            <img src={logo} alt="logo" className="w-28 object-contain" />
          </Link>
          <Link to="/about">
            <Button className="ml-2" intent="action">
              About
            </Button>
          </Link>
        </div>

        {/* Hamburger menu */}
        <div className="md:hidden relative">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-white px-4 py-2 rounded-full"
          >
            {mobileMenuOpen ? (
              <div className="border-solid border-gray-400 border-2 px-6 py-2 text-lg rounded-3xl w-full focus:border-violet-500 focus:outline-none">
                <FaHamburger
                  className="inline-block opacity-50"
                  size="2.25em"
                />
              </div>
            ) : (
              <div className="border-solid border-gray-400 border-2 px-6 py-2 text-lg rounded-3xl w-full focus:border-violet-500 focus:outline-none">
                <FaHamburger className="inline-block" size="2.25em" />
              </div>
            )}
          </button>

          {mobileMenuOpen && (
            <nav className="mt-2 absolute bg-white py-2 px-4 rounded shadow-md z-20 left-[-5px] min-w-[170px] animate zoomIn">
              <Link to="/create-post">
                <Button intent="primary" className="mb-3 mt-3 text-[14px]">
                  Create
                </Button>
              </Link>
              {user ? (
                <div>
                  {userOptions.map((option) => {
                    return (
                      <Link to={`/${option.linkTo}`}>
                        <Button intent="alt" className="mb-2">
                          {option.label}
                        </Button>
                      </Link>
                    );
                  })}

                  <LogoutButton />
                </div>
              ) : (
                <LoginButton />
              )}
            </nav>
          )}
        </div>
        <div className="hidden md:flex items-center">
          <Link to="/chat" className="mr-4">
            <Button intent="primary">Chat</Button>
          </Link>
          {user ? (
            <DropdownMenu options={userOptions} string={user?.nickname} />
          ) : (
            <LoginButton />
          )}
        </div>
      </header>
    </>
  );
}
