"use client";

import React from "react";
import CustomSlider from "@/components/carousel-section/LocationSlider";
import { create } from "zustand";

const locationItems = [
    {
        id: 0,
        image: "/images/court.png",
    },
    {
        id: 1,
        image: "/images/carousel-item3.png",
    },
    {
        id: 2,
        image: "/images/carousel-item2.png",
    },
];

interface LocationStore {
    selectedMapUrl: string;
    setSelectedMapUrl: (url: string) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
    selectedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0832030824!2d106.71220627586037!3d10.807094089344325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a7b39bb8df%3A0x6c7c0e1e8b49516c!2sHappyLand%20Pickleball!5e0!3m2!1svi!2s!4v1710921867345!5m2!1svi!2s",
    setSelectedMapUrl: (url: string) => set({ selectedMapUrl: url }),
    isLoading: false,
    setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));

export default function LocationSection() {
    const { selectedMapUrl, isLoading } = useLocationStore();
    return (
        <section id="location-section" className="lg:py-20 md:py-16 py-10 bg-[#F7FAF9] overflow-hidden">
            <div className="container px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:gap-10">
                    <div className="grid grid-cols-1 text-center gap-2 md:gap-3">
                        <div className="text-sm md:text-base lg:text-md leading-relaxed md:leading-text-md text-secondary-700">TẬN HƯỞNG NIỀM VUI THỂ THAO MỖI NGÀY</div>
                        <div className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">KHÔNG GIAN LÝ TƯỞNG</div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        <CustomSlider items={locationItems} />
                        <div className="relative aspect-[4/3] md:aspect-[594/453] rounded-2xl overflow-hidden shadow-lg">
                            <div className="absolute inset-0 bg-gray-50"></div>
                            <div className="relative w-full h-full">
                                {isLoading && (
                                    <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-10">
                                        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                                <iframe
                                    src={selectedMapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
