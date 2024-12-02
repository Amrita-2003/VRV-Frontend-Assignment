import React, { useEffect, useState } from "react";
import Sidebar from "../components/UserNav";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const url = "https://dummyjson.com/posts";
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        setError("Failed to load posts");
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 text-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-red-600 text-2xl font-bold mb-4">Oops! Something Went Wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 font-sans">
      <Sidebar />

      <main className="ml-0 sm:ml-64 flex-1 p-8 transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 text-center">
          Trending Posts
        </h1>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 
                           border border-gray-100 p-6 transform hover:rotate-1"
              >
                <h2 className="text-xl font-bold text-indigo-700 mb-3">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{post.body.slice(0, 100)}...</p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags?.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div>👍 {post.reactions?.likes} Likes</div>
                  <div>👎 {post.reactions?.dislikes} Dislikes</div>
                </div>
                <div className="text-sm text-gray-500 mb-4">Views: {post.views}</div>

                <Link
                  to="#"
                  className="w-full block text-center py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                             text-white rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Shimmer />
        )}
      </main>
    </div>
  );
};

export default UserDashboard;