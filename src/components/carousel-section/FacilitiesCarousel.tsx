"use client";
import React from "react";
import CustomCarousel from "../slider/CustomCarousel";
import { CarouselItem } from "@/types/carousel";


interface FacilitiesCarouselProps {
    items: CarouselItem[];
}

export default function FacilitiesCarousel({ items }: FacilitiesCarouselProps) {
    const renderCarouselItem = (item: CarouselItem) => (
        <div className="px-4">
            <div className="flex flex-col gap-3">
                <div className="relative overflow-hidden group rounded-2xl">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full aspect-[384/380] object-cover"
                    />
                    {item.icon && (
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                            <img src={item.icon} alt={item.title} />
                        </div>
                    )}
                </div>
                <div className="text-md leading-text-md font-semibold text-center">
                    {item.title}
                </div>
            </div>
        </div>
    );

    const carouselSettings = {
        slidesToShow: 3,
        autoplaySpeed: 4000,
        arrows: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };

    return (
        <CustomCarousel 
            items={items}
            settings={carouselSettings}
            isPaging={true}
            isControlAbsolute={true}
            renderItem={renderCarouselItem}
        />
    );
} 