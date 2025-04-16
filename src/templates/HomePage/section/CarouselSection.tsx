import React from "react";
import FacilitiesCarousel from "@/components/carousel-section/FacilitiesCarousel";
import { CarouselItem } from "@/types/carousel";
const carouselItems: CarouselItem[] = [
    {
        id: 0,
        title: "Chỗ gửi xe rộng rãi",
        image: "/images/carousel-item1.png",
        icon: "/icons/car-icon.svg"
    },
    {
        id: 1,
        title: "Giảng viên đào tạo tiêu chuẩn quốc tế",
        image: "/images/carousel-item2.png",
        icon: "/icons/assistance-icon.svg"
    },
    {
        id: 2,
        title: "Mặt sân chất lượng cao",
        image: "/images/carousel-item3.png",
        icon: "/icons/court-icon.svg"
    },
    {
        id: 3,
        title: "Khu cafe ca nhạc cảnh quan thư giãn",
        image: "/images/carousel-item4.png",
        icon: "/icons/cafe-icon.svg"
    },
    {
        id: 4,
        title: "Chăm sóc y tế",
        image: "/images/carousel-item5.png",
        icon: "/icons/aid-icon.svg"
    },
    {
        id: 5,
        title: "Khu tắm hơi thư giãn miễn phí",
        image: "/images/carousel-item6.png",
        icon: "/icons/air-icon.svg"
    },
    {
        id: 6,
        title: "Wifi tốc độ cao miễn phí",
        image: "/images/carousel-item7.png",
        icon: "/icons/wifi-icon.svg"
    },
    {
        id: 7,
        title: "Tổ chức sự kiện, giải đấu",
        image: "/images/carousel-item8.png",
        icon: "/icons/cup-icon.svg"
    },
];

export default function CarouselSection() {
    return (
        <section className="lg:py-20 py-10 bg-[#F7FAF9]">
            <div>
                <div className="grid grid-cols-1 gap-10">
                    <div className="grid grid-cols-1 text-center gap-3">
                        <div className="lg:text-md text-sm lg:leading-text-md leading-sm text-secondary-700">TRẢI NGHIỆM THỂ THAO TRỌN VẸN</div>
                        <div className="lg:text-display-md text-display-xs lg:leading-display-md leading-display-xs font-bold">TIỆN ÍCH NỔI BẬT</div>
                    </div>
                    
                    <div className="flex flex-col">
                        <FacilitiesCarousel items={carouselItems} />
                    </div>
                </div>
            </div>
        </section>
    );
}
