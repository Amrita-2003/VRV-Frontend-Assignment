import React, { useState, useEffect } from "react";
import { useBlogs } from "../context/BlogContext";
import CSidebar from "../components/CreatorNav";

const PastBlogs = () => {
  const { blogs } = useBlogs();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 font-sans">
      <CSidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64 sm:ml-64" : "ml-0 sm:ml-64"
        } p-8`}
      >
        <header className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b-2 border-indigo-200 space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center sm:text-left">
            Your Published Blogs
          </h1>
          <input
            type="text"
            placeholder="Search your blogs..."
            value={search}
            onChange={handleSearchChange}
            className="px-4 py-2 border-2 border-indigo-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto shadow-sm"
          />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-6 bg-white rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 
                           border border-gray-100 transform hover:rotate-1"
              >
                <h2 className="text-xl font-bold text-indigo-700 mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-3 italic">{blog.date}</p>
                <p className="text-gray-700 line-clamp-3">{blog.content}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center bg-white rounded-xl p-12 shadow-lg">
              <p className="text-gray-500 text-lg">
                You haven't written any blogs yet. Start sharing your thoughts!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastBlogs;