import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Modules/Auth/components/Header";

import { lazy, Suspense } from "react";
import { Loader } from "./components";
import { useAuth0 } from "@auth0/auth0-react";
import { ProtectedRoute } from "./components/Containers/ProtectedRoute";
import { ChatWidget } from "./Modules/Chat/ChatWidget/Components/ChatWidget";
import WebSocketChat from "./Modules/Chat/WebSocketChat/pages/WebSocketChat";

const Home = lazy(() => import("./Modules/DisplayImages/pages/Home"));
const CreatePost = lazy(() => import("./Modules/CreateImage/pages/CreatePost"));
const About = lazy(() => import("./pages/About"));
const MyPostsAndFavourite = lazy(
  () => import("./Modules/DisplayImages/pages/MyPostsAndFavourite")
);

export const Content = () => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();
  return (
    <>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-150px)]">
        <Suspense
          fallback={
            <div className="flex justify-center pt-4 mt-4">
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about" element={<About />} />
            <Route path="/chat" element={<WebSocketChat />} />

            <Route
              path="/my-posts"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MyPostsAndFavourite />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favourites"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MyPostsAndFavourite />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>There's nothing here: 404!</div>} />
          </Routes>
        </Suspense>
        {location.pathname !== "/chat" && <ChatWidget />}
      </main>
    </>
  );
};
