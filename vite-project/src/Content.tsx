import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Home, CreatePost } from "./pages";
import MyPostsAndFavourite from "./pages/MyPostsAndFavourite";
import About from "./pages/About";

export const Content = () => {
  return (
    <>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-posts" element={<MyPostsAndFavourite />} />
        </Routes>
      </main>
    </>
  );
};
