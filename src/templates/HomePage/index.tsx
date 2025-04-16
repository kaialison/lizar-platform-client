// HomePage.tsx

import Header from "@/components/layouts/header";
import HeroSection from "./section/HeroSection";
import IntroductionSection from "./section/IntroductionSection";
import CarouselSection from "./section/CarouselSection";
import LocationSection from "./section/LocationSection";
import ReviewSection from "./section/ReviewSection";
import AppIntroDuctionSection from "./section/AppIntroductionSection";
import EmptyContent from "@/components/ui/EmptyContent";
export default function HomePage() {
  return (
    <div className="flex flex-col lg:gap-20 gap-0">
      <HeroSection />
      <IntroductionSection />
      <CarouselSection />
      <LocationSection />
      <ReviewSection />
      <AppIntroDuctionSection />
    </div>
    
  );
}

