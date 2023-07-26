import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";
import { useLocation } from "react-router-dom";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: location.pathname },
    });
    console.log("after login");
  };

  return (
    <Button intent="alt" onClick={handleLogin}>
      Log Ins
    </Button>
  );
};

export default LoginButton;
