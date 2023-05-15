import { useState, useEffect } from "react";
import { Loader, SinglePhotoCard, FormField } from "../components";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { fetchPosts } from "../lib/api";
import { debounce } from "lodash";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { PostsResponse, SinglePost } from "../lib/types";

Modal.setAppElement("#root");

interface RenderCardsProp {
  data: SinglePost[] | null;
  title: string;
  postsLoading: boolean;
}

const RenderCards = ({ data, title, postsLoading }: RenderCardsProp) => {
  if (data && data?.length > 0) {
    return (
      <>
        {data.map((post, i) => (
          <SinglePhotoCard key={i} {...post} />
        ))}
        {postsLoading && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
      </>
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState<null | SinglePost[]>(
    null
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<PostsResponse>({
      //@ts-expect-error - need to fix
      querryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, pageSize: 10 }),
      getNextPageParam: (lastPage, allPages) => {
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
  console.log(data);
  const postData = data as InfiniteData<PostsResponse>;
  const allPostsz = postData.pages.flatMap((page) => page.data) ?? [];

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

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      fetchMorePosts();
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage]);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex justify-center flex-col">
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <h4 className="flex self-center mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Three exciting ways to create an image... Try it out{" "}
        </h4>
        <Link className="font-inter font-medium" to="/create-post">
          HERE!
        </Link>
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
                  postsLoading={isFetchingNextPage}
                />
              ) : (
                <RenderCards
                  postsLoading={isFetchingNextPage}
                  data={allPostsz}
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

export default Home;
