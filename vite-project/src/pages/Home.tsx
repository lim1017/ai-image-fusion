// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useState, useEffect } from "react";
import { Loader, SinglePhotoCard, FormField } from "../components";
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <SinglePhotoCard key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showLoadingMsg, setShowLoadingMsg] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/post`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const result = await res.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setShowLoadingMsg(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [loading]);

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
                Sorry free database 😄... few more seconds!{" "}
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
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
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
