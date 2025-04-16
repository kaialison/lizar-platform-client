import React from "react";
import CustomSlider from "@/components/carousel-section/LocationSlider";

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

export default function LocationSection() {
    return (
        <section className="lg:py-20 py-10 bg-[#F7FAF9]">
            <div className="container">
                <div className="grid grid-cols-1 gap-10">
                    <div className="grid grid-cols-1 text-center gap-3">
                        <div className="lg:text-md text-sm lg:leading-text-md leading-sm text-secondary-700">TẬN HƯỞNG NIỀM VUI THỂ THAO MỖI NGÀY</div>
                        <div className="lg:text-display-md text-display-xs lg:leading-display-md leading-display-xs font-bold">KHÔNG GIAN LÝ TƯỞNG</div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <CustomSlider items={locationItems} />
                        <div className="relative aspect-[594/453] rounded-2xl overflow-hidden">
                            <img
                                src="/images/ggmap.png"
                                alt="Location Map"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
