import React, { useState } from "react";

const BrowseProperties = () => {
  const [activeTabs, setActiveTabs] = useState({});

  const categories = [
    {
      id: 1, // Unique ID for each category
      title: "Homes",
      icon: "🏠", // Replace with a proper icon if needed
      tabs: ["Popular", "Type", "Area Size"],
      content: {
        Popular: ["On Installments", "1 Bedroom Flats", "2 Bedroom Flats"],
        Type: ["Houses", "Flats"],
        "Area Size": ["5 Marla", "10 Marla"],
      },
    },
    {
      id: 2,
      title: "Plots",
      icon: "📍", // Replace with a proper icon if needed
      tabs: ["Popular", "Type", "Area Size"],
      content: {
        Popular: [
          "5 Marla Residential Plots",
          "10 Marla Residential Plots",
          "With Possession",
        ],
        Type: ["Residential Plots", "Commercial Plots"],
        "Area Size": ["3 Marla", "10 Marla"],
      },
    },
    {
      id: 3,
      title: "Commercial",
      icon: "🏢", // Replace with a proper icon if needed
      tabs: ["Popular", "Type", "Area Size"],
      content: {
        Popular: ["Small Offices", "New Shops", "Running Shops"],
        Type: ["Offices", "Shops"],
        "Area Size": ["Small Shops", "Large Shops"],
      },
    },
  ];

  const handleTabClick = (categoryId, tab) => {
    setActiveTabs((prev) => ({
      ...prev,
      [categoryId]: tab, // Set the active tab for the specific category
    }));
  };

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Browse Properties</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="w-full sm:w-96 bg-white shadow-md rounded-lg"
          >
            {/* Category Header */}
            <div className="p-4 flex items-center gap-2">
              <div className="text-2xl">{category.icon}</div>
              <h3 className="text-xl font-semibold">{category.title}</h3>
            </div>
            {/* Tabs */}
            <div className="flex border-b text-center">
              {category.tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(category.id, tab)}
                  className={`flex-1 p-2 ${
                    activeTabs[category.id] === tab
                      ? "border-b-2 border-green-500 text-green-500 font-bold"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Content */}
            <div className="p-4 grid grid-cols-2 gap-4">
              {category.content[
                activeTabs[category.id] || "Popular" // Default to "Popular"
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg text-center hover:bg-green-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseProperties;
