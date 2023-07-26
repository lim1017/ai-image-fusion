import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";
import { useLocation } from "react-router-dom";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: location.pathname },
    });
  };

  return (
    <Button intent="alt" onClick={handleLogin}>
      Log In
    </Button>
  );
};

export default LoginButton;
