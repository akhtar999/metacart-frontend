import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProduct from "./FeaturedProduct";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 Pro"
        subtitle="Experience the power of the latest iPhone 14 with our most Pro camera ever. "
        link="/product/6511eee08006d2bb718e0da1"
        image={iphone}
      />
      <FeaturedProduct />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add studio display and colour-matched Magic accessories to your bag after configure your Mac mini."
        link="/product/6511eee08006d2bb718e0da9"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
