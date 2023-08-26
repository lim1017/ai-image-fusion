import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";
import { useLocation } from "react-router-dom";

interface LoginBtnProps {
  animate?: boolean;
}

const LoginButton = ({ animate }: LoginBtnProps) => {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: location.pathname },
    });
    console.log("after login");
  };

  const classes = animate ? "animate slideInRight" : "";

  return (
    <Button className={classes} intent="alt" onClick={handleLogin}>
      Login
    </Button>
  );
};

export default LoginButton;
