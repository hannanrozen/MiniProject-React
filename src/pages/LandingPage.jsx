import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

const LandingPage = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("LandingPage: Current token:", token);
  }, []);

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
