import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // redirect to login manually
        window.location.href = "/login";
      } else {
        setAllowed(true); // user is logged in, allow page
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  // render children only if allowed
  return allowed ? <>{children}</> : null;
};

export default PrivateRoute;
