import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { PostsResponse, SinglePost } from "../lib/types";
import { fetchPosts } from "../../../lib/api";
import { useAuth0 } from "@auth0/auth0-react";

export const useFetchFilterImages = () => {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated, "isAuthenticated");
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState<null | SinglePost[]>(
    null
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<PostsResponse>({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, pageSize: 10 }),
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

  const postData = data as InfiniteData<PostsResponse>;
  const allPostsz = postData?.pages.flatMap((page) => page.data) ?? [];

  const fetchMorePosts = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPostsz.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
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

  return {
    handleSearchChange,
    isLoading,
    searchText,
    searchedResults,
    isFetchingNextPage,
    allPostsz,
    isAuthenticated,
  };
};
