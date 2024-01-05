import { useState, useEffect } from "react";
import { Loader, FormField } from "../components";
import { fetchPosts } from "../lib/api";
import { debounce } from "lodash";
import { PostsResponse, SinglePost } from "../lib/types";
import { RenderCards } from "./Home";
import { useAuth0 } from "@auth0/auth0-react";
import { useInfiniteQuery } from "@tanstack/react-query";

const MyPostsAndFavourite = () => {
  const { user, isAuthenticated } = useAuth0();

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState<null | SinglePost[]>(
    null
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<PostsResponse>({
      queryKey: ["user-posts"],
      queryFn: ({ pageParam = 1 }) =>
        fetchPosts({ pageParam, pageSize: 10, userEmail: user?.email || "" }),
      getNextPageParam: (lastPage) => {
        if (
          lastPage.currentPage !== undefined &&
          lastPage.totalPages !== undefined
        ) {
          if (lastPage.currentPage < lastPage.totalPages) {
            return lastPage.currentPage + 1;
          }
        } else {
          return undefined;
        }
      },
      onError(err) {
        console.log(err);
        alert("Opps Something went wrong, Please try again later");
      },
    });

  const allPosts = data?.pages.flatMap((page) => page.data) ?? [];
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const fetchMorePosts = () => {
    console.log(hasNextPage);
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        console.log("fetching");
        fetchMorePosts();
      }
    }, 500);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage]);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex justify-center flex-col">
        <h1 className="font-extrabold text-[#222328] text-[32px]">My Posts</h1>
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
            <div>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                  postsLoading={isFetchingNextPage}
                  isAuthenticated={isAuthenticated}
                />
              ) : (
                <RenderCards
                  postsLoading={isFetchingNextPage}
                  data={allPosts}
                  title="No Posts Yet"
                  isAuthenticated={isAuthenticated}
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
