import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts, fetchPostsById } from "../../../lib/api";
import { PostsResponse, QueryFetchMode } from "../lib/types";

// Assuming these are the necessary imports or definitions

interface useCustomInfiniteQueryProps {
  mode: QueryFetchMode;
  user?: any;
  favourites?: string[];
}

// Custom hook definition
export const useCustomInfiniteQuery = ({
  mode,
  user,
  favourites,
}: useCustomInfiniteQueryProps) => {
  const queryKey =
    mode === QueryFetchMode.MY_POSTS
      ? [QueryFetchMode.MY_POSTS]
      : mode === QueryFetchMode.FAVOURITES
      ? [QueryFetchMode.FAVOURITES]
      : [QueryFetchMode.POSTS];

  const fetchQuery = ({ pageParam = 1 }) => {
    if (mode === QueryFetchMode.MY_POSTS) {
      return fetchPosts({
        pageParam,
        pageSize: 10,
        userEmail: user?.email || "",
      });
    } else if (mode === QueryFetchMode.FAVOURITES) {
      return fetchPostsById({
        pageParam,
        pageSize: 10,
        userFavorites: favourites || [],
      });
    } else {
      return fetchPosts({
        pageParam,
        pageSize: 10,
      });
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<PostsResponse>({
      queryKey,
      queryFn: fetchQuery,
      getNextPageParam: (lastPage) => {
        if (lastPage?.currentPage && lastPage.totalPages) {
          return lastPage.currentPage < lastPage.totalPages
            ? lastPage.currentPage + 1
            : undefined;
        }
      },
      onError: (err) => {
        console.error(err);
        alert("Oops, something went wrong. Please try again later.");
      },
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
