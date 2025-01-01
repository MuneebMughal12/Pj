import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 ">
          <label htmlFor="city" className="text-lg text-white">
            Location
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="text-lg text-white">
            Type
          </label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="property" className="text-lg text-white">
            Property
          </label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="minPrice" className="text-lg text-white">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="maxPrice" className="text-lg text-white">
            Max Price
          </label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bedroom" className="text-lg text-white">
            Bedroom
          </label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        
        <button
          onClick={handleFilter}
          className="flex items-center justify-center w-full px-4 py-2 bg-[#DD9933] text-white rounded-md hover:bg-[#379be2] transition"
        >
          Serch
        </button>
      </div>
    </div>
  );
}

export default Filter;
