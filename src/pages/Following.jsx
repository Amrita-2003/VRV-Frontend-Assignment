import React, { useReducer } from "react";
import { initialState, reducer, actionTypes } from "../utils/Reducer";
import Sidebar from "../components/UserNav";

const Following = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const creators = state.members.filter((member) => member.role === "creator");

  const toggleFollow = (id) => {
    dispatch({ type: actionTypes.TOGGLE_FOLLOW, id });
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-indigo-50 to-purple-100">
      <Sidebar />

      <main className="ml-0 sm:ml-64 flex-1 p-8 transition-all duration-300">
        <h1 className="text-4xl font-extrabold mb-8 text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Explore Creators
        </h1>

        {creators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="creator-card p-6 bg-white rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 
                           border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="mb-4 w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 
                                text-white rounded-full flex items-center justify-center 
                                text-3xl font-bold shadow-md">
                  {creator.email[0].toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {creator.email}
                </h2>
                <p className="text-sm text-gray-500 mb-4 capitalize">
                  Role: Creator
                </p>
                <button
                  onClick={() => toggleFollow(creator.id)}
                  className={`px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wider 
                              transform hover:scale-105 transition-all duration-300 
                              ${
                                creator.isFollowing
                                  ? "bg-red-500 hover:bg-red-600 text-white"
                                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
                              }`}
                >
                  {creator.isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-lg">
            <p className="text-center text-gray-600 text-lg">
              No creators available at the moment.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Following;