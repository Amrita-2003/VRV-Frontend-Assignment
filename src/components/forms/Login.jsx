import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState("login"); // 'login', 'forgotPassword', 'resetPassword'
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth(); 

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { role } = JSON.parse(storedAuth);
      if (role === "admin") {
        navigate("/dashboard", { replace: true });
      } else if (role === "user") {
        navigate("/user", { replace: true });
      } else if (role === "vendor") {
        navigate("/creator", { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const mockUsers = [
      { email: "admin@example.com", password: "admin123", role: "admin" },
      { email: "user@example.com", password: "user123", role: "user" },
      { email: "creator@example.com", password: "creator123", role: "vendor" },
    ];

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const userAuthData = { email: user.email, role: user.role };
      localStorage.setItem("auth", JSON.stringify(userAuthData));
      setAuth(userAuthData);

      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "user") {
        navigate("/user");
      } else if (user.role === "vendor") {
        navigate("/creator");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // In a real app, this would trigger a password reset email
    setView("resetPassword");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // In a real app, this would verify the reset code and set a new password
    setError("");
    setView("login");
    alert("Password reset successful. Please log in with your new password.");
  };

  const renderLoginView = () => (
    <form onSubmit={handleLogin} className="p-8 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-center">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email Address
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </span>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
          Password
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.78zm4.261 4.262l1.514 1.514a2.003 2.003 0 012.234 2.234l1.514 1.514a4 4 0 00-5.263-5.263z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.67-.105 2.454-.303z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Sign In
      </button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => setView("forgotPassword")}
          className="text-indigo-600 hover:text-indigo-800 text-sm"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );

  const renderForgotPasswordView = () => (
    <form onSubmit={handleForgotPassword} className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Forgot Password
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Enter your email to receive a password reset code
      </p>
      
      <div>
        <label htmlFor="resetEmail" className="block text-gray-700 font-medium mb-2">
          Email Address
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </span>
          <input
            type="email"
            id="resetEmail"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Send Reset Code
      </button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => setView("login")}
          className="text-indigo-600 hover:text-indigo-800 text-sm"
        >
          Back to Login
        </button>
      </div>
    </form>
  );

  const renderResetPasswordView = () => (
    <form onSubmit={handleResetPassword} className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Reset Password
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Enter the reset code and your new password
      </p>
      
      <div>
        <label htmlFor="resetCode" className="block text-gray-700 font-medium mb-2">
          Reset Code
        </label>
        <input
          type="text"
          id="resetCode"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          placeholder="Enter reset code"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          required
        />
      </div>
      
      <div>
        <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Reset Password
      </button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => setView("login")}
          className="text-indigo-600 hover:text-indigo-800 text-sm"
        >
          Back to Login
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-center text-white">
            {view === "login" && "Login"}
            {view === "forgotPassword" && "Reset Your Password"}
            {view === "resetPassword" && "Create New Password"}
          </h1>
          <p className="text-center text-white/80 mt-2">
            {view === "login" && "Sign in to continue"}
            {view === "forgotPassword" && "We'll help you recover your account"}
            {view === "resetPassword" && "Enter your new password"}
          </p>
        </div>
        
        {view === "login" && renderLoginView()}
        {view === "forgotPassword" && renderForgotPasswordView()}
        {view === "resetPassword" && renderResetPasswordView()}
      </div>
    </div>
  );
};

export default Login;