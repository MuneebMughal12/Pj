import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import logo from "../../Assests/logo.png";

const MainContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/RealEstate"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex items-center justify-center h-screen bg-black"
      style={{
        backgroundColor: "#000", // Black background for splash
      }}
    >
      <img src={logo} alt="Logo" className="w-80 animate-fade-in-out" />
    </div>
  );
};

export default MainContent;
