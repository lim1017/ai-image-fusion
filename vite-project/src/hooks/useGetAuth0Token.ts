import { useAuth0 } from "@auth0/auth0-react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useState } from "react";

export const useGetAuth0Token = () => {
  const [decodedToken, setDecodedToken] = useState<JwtPayload>();
  const [token, setToken] = useState("");

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated) {
    getAccessTokenSilently().then((token) => {
      setToken(token);
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      console.log(decoded);
    });
  }

  return {
    user,
    token,
    decodedToken,
  };
};
