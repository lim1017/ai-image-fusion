import { useState, useEffect } from "react";
import { Loader, FormField } from "../components";
import Modal from "react-modal";

import { fetchPosts } from "../lib/api";
import { debounce } from "lodash";
import { SinglePost } from "../lib/types";
import { RenderCards } from "./Home";
import { useAuth0 } from "@auth0/auth0-react";

Modal.setAppElement("#root");

const MyPostsAndFavourite = () => {
  const { user } = useAuth0();

  const [userPosts, setUserPosts] = useState<SinglePost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState<null | SinglePost[]>(
    null
  );

  useEffect(() => {
    const fetchPostWrapper = async () => {
      setIsLoading(true);
      try {
        const result = await fetchPosts({
          pageParam: 1,
          pageSize: 100,
          userEmail: user?.email || "",
        });
        return result;
      } catch (err) {
        alert(`${err} askdfskajdfh`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostWrapper().then((result) => {
      setUserPosts(result.data);
    });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = userPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      console.log("");
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex justify-center flex-col">
        <h1 className="font-extrabold text-[#222328] text-[32px]">My Posts</h1>
        {/* <h4 className="flex self-center mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Three exciting ways to create an image... Try it out{" "}
        </h4>
        <Link className="font-inter font-medium" to="/create-post">
          HERE!
        </Link> */}
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {isLoading ? (
          <div className="flex items-center justify-center flex-col">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for{" "}
                <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                  postsLoading={isLoading}
                />
              ) : (
                <RenderCards
                  postsLoading={isLoading}
                  data={userPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
      <div id="modal"></div>
    </section>
  );
};

export default MyPostsAndFavourite;
