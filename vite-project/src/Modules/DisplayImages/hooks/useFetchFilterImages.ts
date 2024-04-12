import { InfiniteData } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { PostsResponse, QueryFetchMode, SinglePost } from "../lib/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useCustomInfiniteQuery } from "./useCustomInfiniteQuery";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/selectors";
import { useLocation } from "react-router-dom";

export const useFetchFilterImages = () => {
  const { isAuthenticated, user } = useAuth0();
  const { favourites } = useSelector(selectUser);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState<null | SinglePost[]>(
    null
  );

  const { pathname } = useLocation();

  const [mode, setMode] = useState<QueryFetchMode>(
    pathname === "/my-posts"
      ? QueryFetchMode.MY_POSTS
      : pathname === "/"
      ? QueryFetchMode.POSTS
      : QueryFetchMode.FAVOURITES
  );

  useEffect(() => {
    //useEffect require for when navigating from /my-posts to /favourites, as it uses the same component
    if (pathname === "/favourites") setMode(QueryFetchMode.FAVOURITES);
    if (pathname === "/my-posts") setMode(QueryFetchMode.MY_POSTS);
  }, [pathname]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useCustomInfiniteQuery({ mode, user, favourites });

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
    user,
    mode,
  };
};
