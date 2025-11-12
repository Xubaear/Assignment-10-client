import React, { useContext, useState } from "react";
// 🔹 Use react-router for links (you already did)
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // ✅ get user & logout
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => setDropdownOpen(false)) // ✅ close dropdown after logout
      .catch(err => console.log(err));
  };

  const links = (
    <>
      <Link to="/"><li><a>Home</a></li></Link>
      {user && <Link to="/add-transaction"><li><a>Add Transaction</a></li></Link>}
      {user && <Link to="/my-transactions"><li><a>My Transaction</a></li></Link>}
      {user && <Link to="/reports"><li><a>Reports</a></li></Link>}
    </>
  );

  return (
    <div className="navbar bg-linear-to-r from-gray-800 via-gray-700 to-gray-600 text-white shadow-md max-w-6xl mx-auto rounded-xl">
      
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
            </svg>
          </div>

          {dropdownOpen && (
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {links}
              {user && (
                <li className="mt-2 border-t pt-2">
                  {/*  Show email */}
                  <span className="block px-2 py-1">{user.email}</span>
                  {/*  Logout button */}
                  <button onClick={handleLogout} className="btn btn-error btn-sm w-full mt-1">Logout</button>
                </li>
              )}
            </ul>
          )}
        </div>

        <Link to="/" className="btn btn-ghost text-xl">FinEase</Link>
      </div>
      {/* Navbar Start End */}

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      {/* Navbar Center End */}

      {/* Navbar End */}
      <div className="navbar-end">
        {!user ? (
          // 🔹 Login Button (if no user)
          <button onClick={() => (window.location.href = "/login")} className="button">
            <div className="blob1"></div>
            <div className="blob2"></div>
            <div className="inner">Login</div>
          </button>
        ) : (
          <div className="relative">
            {/* 🔹 Profile picture */}
            <img
              src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              
              className="w-10 h-10 rounded-full border-2 border-green-500 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              referrerPolicy="no-referrer" 
            />

            {/* 🔹 Dropdown under profile pic */}
            {dropdownOpen && (
              <div className="absolute right-0  mt-2 w-60 bg-gray-700 rounded shadow-lg p-3 z-50">
                <p className="text-sm mb-2  text-center">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="btn btn-error w-full btn-sm mt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Navbar End End */}

    </div>
  );
};

export default Navbar;
