import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router";
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
      {user && <li><Link to="/add-transaction">Add Transaction</Link></li>}
      {user && <li><Link to="/my-transactions">My Transaction</Link></li>}
      {user && <li><Link to="/reports">Reports</Link></li>}
      <li><Link to='/contact'>Contacts</Link></li>
      <li><Link to='/about'>About Us</Link></li>
    </>
  );


   


  return (
    <div className="navbar bg-gray-200 dark:bg-gray-800 text-gray-900  dark:text-white max-w-6xl mx-auto rounded-xl shadow-md">
      










      
      <div className="navbar-start">
        <div className="dropdown">
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
          {mobileOpen && (
            <ul className="menu dropdown-content bg-gray-700 p-3 rounded shadow mt-2 w-48">
              {links}
              {user && (
                <>
                  <li><Link to="/my-profile">My Profile</Link></li>
                  <li>
                    <span>{user.email}</span>
                    <button onClick={handleLogout} className="btn btn-error btn-sm w-full mt-1">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost text-xl ml-2">FinEase</Link>
 <div className="mr-3">
        <input
           onChange={(e) => handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle"/>
   </div>

      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>







      
      <div className="navbar-end relative" ref={profileRef}>
        {user ? (
          <>
         
            <img
              src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-500"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <div className="absolute right-0 mt-40 w-60 bg-gray-700 rounded shadow p-3 z-50">
                <Link to="/my-profile"><p className="text-center font-medium cursor-pointer">My Profile</p></Link>
                <p className="text-center">{user.email}</p>
                <button onClick={handleLogout} className="btn btn-error w-full btn-sm mt-2">Logout</button>
              </div>
            )}
          </>
        ) : (
          <button onClick={() => (window.location.href = "/login")} className="btn">Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
