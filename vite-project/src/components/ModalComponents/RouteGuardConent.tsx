import { Link } from "react-router-dom";
import Button from "../Button";

export default function RouteGuardConent() {
  return (
    <div>
      <h2 className="text-[32px] font-bold">Route Guarding</h2>

      <h4 className="mt-3">
        Created <b>HOC</b> (higher order component) to handle route guarding,
        will redirect to home page if not logged in when accessing protected
        route such as <b>/my-posts</b>
      </h4>

      <Link to="/my-posts">
        <Button intent="primary" className="mb-3 mt-3 text-[14px]">
          My Posts
        </Button>
      </Link>
    </div>
  );
}
