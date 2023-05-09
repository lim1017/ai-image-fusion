// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useState, useEffect } from "react";
import { Loader, SinglePhotoCard, FormField } from "../components";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { fetchPosts } from "../lib/api";
import { debounce } from "lodash";

Modal.setAppElement("#root");

interface RenderCardsProp {
  data: any;
  title: string;
  postsLoading: boolean;
}

const RenderCards = ({ data, title, postsLoading }: RenderCardsProp) => {
  if (data?.length > 0) {
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
  //master page loading
  const [loading, setLoading] = useState(false);

  const [postsLoading, setPostsLoading] = useState(false);

  const [showLoadingMsg, setShowLoadingMsg] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const [allPosts, setAllPosts] = useState(null);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMorePosts = (currPg: number, totalPgs: number) => {
    if (currPg < totalPgs) {
      setPostsLoading(true);
      fetchPosts(currentPage + 1, 10)
        .then((result) => {
          setAllPosts((prev) => [...prev, ...result.data]);
          setCurrentPage(result.currentPage);
          setTotalPages(result.totalPages);
        })
        .finally(() => {
          setPostsLoading(false);
          //
        });
    }
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
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

  useEffect(() => {
    const fetchPostWrapper = async () => {
      try {
        setLoading(true);
        const result = await fetchPosts(currentPage, 10);
        return result;
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostWrapper().then((result) => {
      setAllPosts(result.data);
      setCurrentPage(1);
      setTotalPages(result.totalPages);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setShowLoadingMsg(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [loading]);

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      fetchMorePosts(currentPage, totalPages);
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPages]);

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
        {loading ? (
          <div className="flex items-center justify-center flex-col">
            {showLoadingMsg && (
              <h3 className="mb-4 font-extrabold text-[#222328] text-[32px]">
                Sorry free database 😄... few more seconds (20)!{" "}
              </h3>
            )}
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
                  postsLoading={postsLoading}
                />
              ) : (
                <RenderCards
                  postsLoading={postsLoading}
                  data={allPosts}
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
