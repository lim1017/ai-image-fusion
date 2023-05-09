import { logo } from "../assets";
import { Link } from "react-router-dom";

import Button from "../components/Button";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <div className="flex items-center">
        <Link to="/" className="mr-2">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        {/* <Button className="ml-2" intent="action">
          About
        </Button> */}
      </div>

      <Link to="/create-post">
        <Button intent="primary">Create</Button>
      </Link>
    </header>
  );
}
