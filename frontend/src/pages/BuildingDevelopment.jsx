import React from 'react'
// import Header from "../components/Layout/Header";
import BuildingHeader from "../components/Layout/BuildingHeader"
import Hero from "../components/Route/Hero/Hero";
// import BuildingCata from "../components/Route/Categories/BuildingCata";
// import BuldingCata from "../components/Route/Categories/BuildingCata"
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import { BuildingCata } from '../static/data';

const BuildingDevelopment = () => {
  return (
    <div>
        
        {/* <Header activeHeading={1} /> */}
        <BuildingHeader  activeHeading={1} />
        <Hero />
        <BuildingCata />
        <BestDeals />
        <Events />
        <FeaturedProduct />
        <Sponsored />
        <Footer />
    </div>
  )
}

export default BuildingDevelopment