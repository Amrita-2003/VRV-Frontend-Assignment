import React, { useState } from "react";
import { useBlogs } from "../context/BlogContext";
import CSidebar from "../components/CreatorNav";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const { addBlog } = useBlogs();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      addBlog({ title, content, date: new Date().toLocaleDateString() });
      setTitle(""); 
      setContent("");
      toast.success("Your blog post has been successfully published!"); 
    } else {
      toast.error("All fields are required. Please fill in the title and content."); 
    }
  };

  return (
    <div className="write-blog-container flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <CSidebar isOpen={isSidebarOpen} />

      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64 sm:ml-64" : "ml-0 sm:ml-64"
        } p-8`}
      >
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 text-center">
          Write a New Blog Post
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-8 space-y-6 max-w-3xl mx-auto border border-gray-100"
        >
          <div className="form-group">
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-indigo-700 mb-2"
            >
              Blog Title:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border-2 border-indigo-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter an engaging title for your blog post"
              required
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="content"
              className="block text-lg font-semibold text-indigo-700 mb-2"
            >
              Blog Content:
            </label>
            <Editor
              apiKey="3tyyaj049ws7lfwkluh6d4fq94g6g12kg47xsmsnj6qnb3yk"
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 400,
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                content_style:
                  "body { font-family:Arial,sans-serif; font-size:16px; color:#333 }",
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                       text-white text-lg font-semibold rounded-full 
                       hover:scale-105 transition-transform duration-300 
                       shadow-lg hover:shadow-xl"
          >
            Publish Your Blog
          </button>
        </form>
      </main>

      <ToastContainer />
    </div>
  );
};

export default WriteBlog;