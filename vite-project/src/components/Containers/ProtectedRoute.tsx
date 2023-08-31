import { Navigate } from "react-router";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: JSX.Element;
};

export const ProtectedRoute = ({
  isAuthenticated,
  children,
}: ProtectedRouteProps): JSX.Element => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
