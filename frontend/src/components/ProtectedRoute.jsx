import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const nav = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("isLogin")) {
      nav("/");
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedRoute;
