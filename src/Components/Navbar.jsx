import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router"; // Note: Ensure 'react-router-dom' if v6
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const { user, logOut } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  const handleLogout = () => {
    logOut().then(() => {
      setMobileOpen(false);
      setProfileOpen(false);
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/explore">Explore</Link></li>
      {user && <li><Link to="/add-transaction">Add Transaction</Link></li>}
      {user && <li><Link to="/my-transactions">My Transaction</Link></li>}
      {user && <li><Link to="/reports">Reports</Link></li>}
      <li><Link to='/blog'>Blogs</Link></li>
      <li><Link to='/contact'>Contacts</Link></li>
      <li><Link to='/about'>About Us</Link></li>
    </>
  );

  return (
    <>
      {/* Fixed Glass Navbar */}
      <header className="w-full fixed top-0 left-0 z-50 transition-all duration-300
        bg-white/70 dark:bg-black/60 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700">
        
        <div className="navbar max-w-6xl mx-auto px-4">
          
          {/* Navbar Start */}
          <div className="navbar-start py-3">
            <div className="dropdown">
              <button
                className="btn btn-ghost lg:hidden text-gray-800 dark:text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </button>
              
              {mobileOpen && (
                <ul className="menu dropdown-content bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-lg shadow-xl mt-4 w-52 border border-gray-100 dark:border-gray-600">
                  {links}
                  {user && (
                    <>
                      <div className="divider my-1"></div>
                      <li><Link to="/my-profile">My Profile</Link></li>
                      <li className="mt-2">
                        <span className="text-xs opacity-70">{user.email}</span>
                        <button onClick={handleLogout} className="btn btn-error btn-sm w-full mt-1 text-white">
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
            
            <Link to="/" className="btn btn-ghost normal-case text-xl ml-2 text-green-600 dark:text-white font-bold">
              FinEase
            </Link>

            <div className="ml-2">
              <input
                onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem('theme') === "dark"}
                className="toggle theme-controller" 
              />
            </div>
          </div>

          {/* Navbar Center - Desktop */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-medium text-gray-700 dark:text-gray-200">
              {links}
            </ul>
          </div>

          {/* Navbar End - Profile */}
          <div className="navbar-end relative" ref={profileRef}>
            {user ? (
              <>
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-500 dark:border-white object-cover"
                  onClick={() => setProfileOpen(!profileOpen)}
                  alt="Profile"
                />
                {profileOpen && (
                  <div className="absolute right-0 top-14 w-60 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-xl border border-gray-100 dark:border-gray-600 p-4 z-50">
                    <div className="text-center mb-4">
                       <img src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="pic" className="w-12 h-12 mx-auto rounded-full mb-2 object-cover"/>
                       <p className="font-semibold text-sm">{user.displayName || "User"}</p>
                       <p className="text-xs opacity-70 break-words">{user.email}</p>
                    </div>
                    <Link to="/my-profile" className="btn btn-sm btn-ghost w-full mb-2 border border-gray-200 dark:border-gray-600">My Profile</Link>
                    <button onClick={handleLogout} className="btn btn-error w-full btn-sm text-white">Logout</button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-sm btn-outline text-green-600 hover:bg-green-600 hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black">Login</Link>
                <Link to="/register" className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spacer div to prevent content from hiding behind fixed navbar (80px height) */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;