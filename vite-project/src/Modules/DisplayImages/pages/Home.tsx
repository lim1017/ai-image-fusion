import React from "react";
import { Loader, FormField } from "../../../components";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import AnimatedWrapper from "../../../components/Containers/AnimatedWrapper";
import { RenderCards } from "../components/Cards";
import { useFetchFilterImages } from "../hooks/useFetchFilterImages";
import { QueryFetchMode } from "../lib/types";

const Home = () => {
  const {
    handleSearchChange,
    isLoading,
    searchText,
    searchedResults,
    isFetchingNextPage,
    allPostsz,
    isAuthenticated,
  } = useFetchFilterImages(QueryFetchMode.POSTS);

  return (
    <AnimatedWrapper>
      <section className="max-w-7xl mx-auto ">
        <div className="flex justify-center flex-col">
          <h1 className="font-extrabold text-[#222328] text-[32px]">
            The Community Showcase
          </h1>
          <h4 className="flex self-center mt-2 text-[#666e75] text-[16px] max-w-[500px]">
            Three exciting ways to create an image... Try it out{" "}
          </h4>
          <Link
            className="font-inter font-medium text-purple-500 text-[22px] hover:opacity-50"
            to="/create-post"
          >
            <Button intent="primary" className="mb-3 mt-3 text-[14px]">
              Create Post
            </Button>
          </Link>
          <h4 className="flex self-center mt-2 text-[#666e75] text-[16px] max-w-[500px]">
            Login to track your posts, and favourites!
          </h4>
        </div>

        <div className="mt-16">
          <FormField
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search something..."
            value={searchText}
            handleChange={handleSearchChange}
            data-testid="search-input"
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
                    data={allPostsz}
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
    </AnimatedWrapper>
  );
};

export default Home;
