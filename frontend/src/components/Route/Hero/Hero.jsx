
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Routes } from "react-router-dom";
import styles from "../../../styles/styles";
import bannerImage from "../../../Assests/brand-color-with-out-pattern.png";
import logo from "../../../Assests/logo.png";
import Filter from "../../Filter/Filter";

const Hero = () => {
  // State to manage active content and button selection
  const [activeTab, setActiveTab] = useState("realEstate");

  // Function to handle button clicks
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      {/* Logo Section */}
      <div className={`${styles.section} w-full flex flex-col items-center`}>
        <img src={logo} alt="Logo" className="w-[150px] h-auto mb-5" />

        {/* Buttons Section */}
        <div className="flex gap-5 mt-5">
        <Link
    to="/RealEstate"
    className={`px-6 py-2 rounded-lg text-[18px] font-[Poppins] font-[500] ${
      activeTab === "RealEstate"
        ? "bg-[#299bb8] text-white"
        : "bg-white text-[#DD9933] border border-[#DD9933]"
    } hover:bg-[#DD9933] hover:text-white transition`}
    onClick={() => handleTabChange("RealEstate")}
  >
    Real-State
  </Link>
          <button
            className={`px-6 py-2 rounded-lg text-[18px] font-[Poppins] font-[500] ${
              activeTab === "buildingDevelopment"
                ? "bg-[#299bb8] text-white"
                : "bg-white text-[#DD9933] border border-[#DD9933]"
            }`}
            onClick={() => handleTabChange("buildingDevelopment")}
          >
            Building Development
          </button>
        </div>

 {/* Filter Component */}
            <div className="mt-10">
              <Filter />
            </div>
    
        {/* Content Section */}
        <div className="mt-10 text-center">
          {activeTab === "realEstate" && (
            <div>
              <h1
                className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#DD9933] font-[600] capitalize`}
              >
                Explore the Best Real Estate.
              </h1>
              <p className="pt-5 text-[18px] font-[Poppins] font-[400] text-[#DD9933]">
                Discover top properties and find your dream home with ease.
              </p>
            </div>
          )}

          {activeTab === "buildingDevelopment" && (
            <div>
              <h1
                className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#DD9933] font-[600] capitalize`}
              >
                Leading Building Development.
              </h1>
              <p className="pt-5 text-[18px] font-[Poppins] font-[400] text-[#DD9933]">
                Build your dream project with our expert development services.
              </p>
            </div>
          )}

         
        </div>
      </div>
    </div>
  );
};

export default Hero;

