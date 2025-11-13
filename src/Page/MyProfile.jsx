import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto my-10  p-6 bg-gray-800 shadow-md rounded-md text-white ">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-green-500"
          referrerPolicy="no-referrer"
        />

        <p><strong>Name:</strong> {user?.displayName || "No name"}</p>
        <p><strong>Email:</strong> {user?.email}</p>

        <button
          onClick={() => alert("Update Profile functionality")}
          className="btn btn-neutral mt-4 w-full"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
