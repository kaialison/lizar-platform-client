// HomePage.tsx
"use client";
import Header from "@/components/layouts/header";
import HeroSection from "./section/HeroSection";
import IntroductionSection from "./section/IntroductionSection";
import CarouselSection from "./section/CarouselSection";
import LocationSection from "./section/LocationSection";
import ReviewSection from "./section/ReviewSection";
import AppIntroDuctionSection from "./section/AppIntroductionSection";
import { useRequest } from "ahooks";
import { API_PATHS } from "@/constants/apis";
import { PAGINATION_PARAMS } from "@/constants";
import { getLocationApi } from "@/service/api/complex";
export default function HomePage({
  location
}: {
  location: any
}) {

  return (
    <div className="flex flex-col lg:gap-20 gap-0">
      <HeroSection />
      <IntroductionSection />
      <CarouselSection />
      <LocationSection location={location?.data} /> 
      <ReviewSection />
      <AppIntroDuctionSection />
    </div>
    
  );
}

