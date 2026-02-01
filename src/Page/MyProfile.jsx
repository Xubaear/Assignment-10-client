import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage("");
    setError("");

    try {
      await updateProfile(user, {
        displayName: displayName.trim() || null,
        photoURL: photoURL.trim() || null,
      });

      // Keep context user in sync so UI updates immediately
      setUser({
        ...user,
        displayName: displayName.trim() || null,
        photoURL: photoURL.trim() || null,
      });

      setMessage("Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-[#BCD377] dark:bg-gray-800 shadow-md rounded-md text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-green-500 object-cover"
          referrerPolicy="no-referrer"
        />

        {!isEditing ? (
          <>
            <p>
              <strong>Name:</strong> {user?.displayName || "No name"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-neutral mt-4 w-full"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form
            onSubmit={handleSave}
            className="w-full flex flex-col gap-3 mt-2"
          >
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">Photo URL</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter photo URL"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                type="submit"
                className="btn btn-success flex-1"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-ghost flex-1"
                onClick={() => {
                  setIsEditing(false);
                  setDisplayName(user?.displayName || "");
                  setPhotoURL(user?.photoURL || "");
                  setError("");
                  setMessage("");
                }}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {message && (
          <p className="text-green-400 text-sm text-center mt-2">{message}</p>
        )}
        {error && (
          <p className="text-red-400 text-sm text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
