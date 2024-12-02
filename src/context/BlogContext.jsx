import React, { createContext, useState, useContext } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([
    { 
      id: 1, 
      title: "The Future of Technology", 
      content: "Technology is evolving rapidly, and the possibilities are endless...", 
      date: "2024-01-01",
      category: "Tech",
      color: "bg-blue-100 hover:bg-blue-200"
    },
    { 
      id: 2, 
      title: "A Guide to Web Development", 
      content: "Web development has come a long way with the introduction of new tools and frameworks...", 
      date: "2024-02-15",
      category: "Development",
      color: "bg-green-100 hover:bg-green-200"
    },
    { 
      id: 3, 
      title: "Understanding React Hooks", 
      content: "React hooks are one of the most exciting features of React, and they allow you to manage state and side effects...", 
      date: "2024-03-10",
      category: "React",
      color: "bg-purple-100 hover:bg-purple-200"
    },
    { 
      id: 4, 
      title: "How to Build a Node.js API", 
      content: "Node.js makes it easier to build scalable and fast server-side applications...", 
      date: "2024-04-01",
      category: "Backend",
      color: "bg-indigo-100 hover:bg-indigo-200"
    },
    { 
      id: 5, 
      title: "CSS Grid: The Future of Layouts", 
      content: "CSS Grid is a powerful layout system that makes it easier to build complex, responsive layouts...", 
      date: "2024-05-18",
      category: "CSS",
      color: "bg-red-100 hover:bg-red-200"
    },
  ]);

  const addBlog = (newBlog) => {
    const blogWithColor = {
      ...newBlog,
      color: `bg-${getRandomColor()}-100 hover:bg-${getRandomColor()}-200`
    };
    setBlogs((prevBlogs) => [...prevBlogs, blogWithColor]);
  };

  const getRandomColor = () => {
    const colors = ['blue', 'green', 'purple', 'indigo', 'red', 'teal', 'orange'];
    return colors[Math.floor(Math.random() % colors.length)];
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => {
  return useContext(BlogContext);
};