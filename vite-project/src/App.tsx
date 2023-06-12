import "./App.css";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, CreatePost } from "./pages";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import MyPostsAndFavourite from "./pages/MyPostsAndFavourite";

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
      >
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/my-posts" element={<MyPostsAndFavourite />} />
            </Routes>
          </main>
        </QueryClientProvider>
      </Auth0Provider>
    </div>
  );
};

export default App;
