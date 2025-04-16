"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomCarousel from "../slider/CustomCarousel";

interface CustomSliderProps {
    items: Array<{
        id: number;
        image: string;
    }>;
    aspectRatio?: string;
}

export default function CustomSlider({ items, aspectRatio = "aspect-[594/453]" }: CustomSliderProps) {
    const sliderRef = useRef<Slider | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: false,
        fade: true,
        beforeChange: (_: any, next: number) => {
            setActiveSlide(next);
        }
    };

    const handlePrevClick = () => {
        if (sliderRef.current) {
            const prevIndex = activeSlide === 0 ? items.length - 1 : activeSlide - 1;
            sliderRef.current.slickGoTo(prevIndex);
        }
    };

    const handleNextClick = () => {
        if (sliderRef.current) {
            const nextIndex = activeSlide === items.length - 1 ? 0 : activeSlide + 1;
            sliderRef.current.slickGoTo(nextIndex);
        }
    };

    const renderItem = (item: any) => (
        <div key={item.id}>
            <div className="rounded-2xl overflow-hidden">
                <div className={`relative ${aspectRatio}`}>
                    <img
                        src={item.image}
                        alt="Slider Image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );

    const renderPaging = () => {
        return (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 
                            ${index === activeSlide ? 'bg-white' : 'bg-white/50'}`}
                        onClick={() => sliderRef.current?.slickGoTo(index)}
                    />
                ))}
            </div>
        );
    };

    const renderArrows = () => {
        return (
            <>
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 transition-colors duration-300 flex items-center justify-center z-10"
                    onClick={handlePrevClick}
                >
                    <CaretLeft size={24} weight="bold" className="text-white" />
                </button>
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 transition-colors duration-300 flex items-center justify-center z-10"
                    onClick={handleNextClick}
                >
                    <CaretRight size={24} weight="bold" className="text-white" />
                </button>
            </>
        );
    };

    return (
        <div className="relative">
            <CustomCarousel
                items={items}
                renderItem={renderItem}
                settings={settings}
                isPaging={false}
                isControlAbsolute={true}
                ref={sliderRef}
                onPrevClick={handlePrevClick}
                onNextClick={handleNextClick}
            />
            {renderPaging()}
            {renderArrows()}
        </div>
    );
} 