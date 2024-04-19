import { Loader, FormField } from "../../../components";
import { QueryFetchMode } from "../lib/types";
import { RenderCards } from "../components/Cards";
import { useFetchFilterImages } from "../hooks/useFetchFilterImages";
const MyPostsAndFavourite = () => {
  const {
    handleSearchChange,
    isLoading,
    isFetchingNextPage,
    isAuthenticated,
    searchText,
    searchedResults,
    allPostsz,
    mode,
  } = useFetchFilterImages();

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex justify-center flex-col">
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          {mode === QueryFetchMode.MY_POSTS ? "My Posts" : "Favourites"}
        </h1>
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
                Showing Results for{" "}
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
  );
};

export default MyPostsAndFavourite;
