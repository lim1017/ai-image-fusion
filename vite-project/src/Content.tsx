import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

import { lazy, Suspense } from "react";
import { Loader } from "./components";
import About from "./pages/About";

const Home = lazy(() => import("./pages/Home"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
// const About = lazy(() => import("./pages/About"));
const MyPostsAndFavourite = lazy(() => import("./pages/MyPostsAndFavourite"));

export const Content = () => {
  return (
    <>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
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
            <Route path="/my-posts" element={<MyPostsAndFavourite />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};
