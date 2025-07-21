import React from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <Testimonials />
      <Pricing />
      <CallToAction />
      <Footer />
    </>
  );
};

export default LandingPage;
