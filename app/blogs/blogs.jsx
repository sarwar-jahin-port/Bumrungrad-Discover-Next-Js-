"use client";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardLoader } from "@/components/ui/cardload"; // Make sure this is correctly implemented

const AllBlogs = () => {
  const [allBlogData, setAllBlogData] = useState([]);
  const [loader, setLoader] = useState(true); // Default to loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [nextPageUrl, setNextPageUrl] = useState(null); // URL for next page
  const [prevPageUrl, setPrevPageUrl] = useState(null); // URL for previous page
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Fetch blog data when component mounts, page changes, or search changes
  const fetchBlogs = (page, searchTerm) => {
    setLoader(true); // Set loader to true when fetching new data
    const query = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "";
    fetch(`http://127.0.0.1:8000/api/get-all-blogs?page=${page}${query}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === 200) {
          setAllBlogData(resData?.data?.data);
          setCurrentPage(resData?.data?.current_page);
          setTotalPages(Math.ceil(resData.data?.total / resData.data?.per_page)); // Calculate total pages
          setNextPageUrl(resData?.data?.next_page_url);
          setPrevPageUrl(resData?.data?.prev_page_url);
        } else {
          setAllBlogData([]);
          setTotalPages(1);
          setNextPageUrl(null);
          setPrevPageUrl(null);
        }
        setLoader(false); // Stop loader regardless of response
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
        setLoader(false);
      });
  };

  // Fetch initial data when the component mounts, page changes, or search is applied
  useEffect(() => {
    fetchBlogs(currentPage, search);
  }, [currentPage, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearch(searchInput);
  };

  return (
    <div className="p-5 md:p-10 md:container md:mx-auto">
      <div className="">
        <h1 className="capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue">
          Bumrungrad Health Blogs
        </h1>
        <form onSubmit={handleSearchSubmit} className="mt-5 flex gap-2 max-w-md">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search blogs by title..."
            className="flex-1 border border-ash/40 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue text-white rounded text-sm font-semibold hover:opacity-90"
          >
            Search
          </button>
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setSearch("");
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-ash/40 rounded text-sm hover:bg-cream"
            >
              Clear
            </button>
          )}
        </form>
        <div className="my-5">
          <Divider />
        </div>
      </div>

      {loader ? (
        <CardLoader cardLength={15} gridNumber={3} speed="slow" /> // Skeleton loader
      ) : allBlogData?.length === 0 ? (
        <p className="my-10 text-center text-black/60">
          No blogs found{search ? ` for "${search}"` : ""}.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 my-10">
          {allBlogData?.map((d, i) => (
            <div
              key={i}
              className="shadow rounded hover:shadow-xl duration-300 ease-linear flex flex-col justify-between"
            >
              <Image
                height={300}
                width={1000}
                src={d.blogImage}
                alt="Bumrungrad International Hospital"
                className="w-full h-[200px] object-cover"
              />
              <div className="p-5">
                <h5 className="font-semibold text-blue text-lg">{d.blogTitle}</h5>
                <div
                  className="text-sm lg:text-base mb-5"
                  dangerouslySetInnerHTML={{
                    __html: `${d?.blogDescription.slice(0, 300)}${
                      d.blogDescription.length > 300 ? "..." : ""
                    }`,
                  }}
                />
                <Link
                  href={`/blogs/${d?.slug}`}
                  className="px-4 py-2 bg-blue text-white shadow rounded text-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-center items-center space-x-4 mt-16">
        {prevPageUrl && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-blue text-white rounded"
          >
            Prev
          </button>
        )}
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        {nextPageUrl && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-blue text-white rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
