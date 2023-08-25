import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";

const LogoutButton = ({ ...rest }) => {
  const { logout } = useAuth0();

  return (
    <Button
      intent="secondary"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      {...rest}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
