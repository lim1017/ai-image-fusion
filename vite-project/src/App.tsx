import "./App.css";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";

import { Content } from "./Content";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const navigate = useNavigate();

  const handleRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || "/");
  };

  return (
    <div>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        onRedirectCallback={handleRedirectCallback}
        cacheLocation="localstorage"
      >
        <QueryClientProvider client={queryClient}>
          <Content />
        </QueryClientProvider>
      </Auth0Provider>
    </div>
  );
};

export default App;
