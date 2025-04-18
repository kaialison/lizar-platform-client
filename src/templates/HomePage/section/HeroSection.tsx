import { Link } from "@nextui-org/react";
import Image from "next/image";

import { useEffect, useState } from 'react';

export default function HeroSection() {
    const [storeUrl, setStoreUrl] = useState('https://play.google.com/store/apps/details?id=asia.eduto.happylandpickleball&pcampaignid=web_share');
    
    // Only run navigator code on client side
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
            const userAgent = navigator.userAgent.toLowerCase();
            const platform = navigator.platform.toLowerCase();
            
            // Check for iOS devices
            const isIOS = /iphone|ipad|ipod/.test(userAgent);
            // Check for macOS
            const isMacOS = /mac/.test(platform);
            // If either iOS or macOS, return App Store link
            const isAppleDevice = isIOS || isMacOS;
            
            setStoreUrl(isAppleDevice
                ? 'https://apps.apple.com/vn/app/happyland-pickleball/id6742907373'
                : 'https://play.google.com/store/apps/details?id=asia.eduto.happylandpickleball&pcampaignid=web_share');
        }
    }, []);
    
    const getStoreUrl = () => storeUrl;

    return (
        <section className="relative h-screen">
            <div className="absolute inset-0">
                <Image
                    src="/images/hero-image.jpeg"
                    alt="Pickleball Court"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-30" />
            </div>

            <div className="container relative h-full flex flex-col justify-end sm:justify-center sm:pb-0 pb-16">
                <div className="text-white/90 lg:w-2/3 w-full flex flex-col lg:gap-6 gap-4 ">
                    <div className="lg:space-y-4 space-y-0 flex flex-col">
                        <span className="inline-block font-display text-sm lg:text-display-xs leading-display-xs font-medium text-white/90">
                            <span className="lg:inline hidden">Khám phá đam mê Pickleball tại</span>
                            <span className="lg:hidden inline">Ứng dụng Đặt sân Pickleball</span>
                        </span>
                        <span className="font-display text-2xl lg:text-display-xl leading-tight lg:leading-display-xl font-bold tracking-[-0.02em]">
                            HAPPYLAND PICKLEBALL
                        </span>
                    </div>
                    <p className="text-md leading-relaxed lg:leading-text-md text-white font-normal">
                        HappyLand Pickleball hướng đến trở thành hệ thống sân chơi hàng đầu tại Việt Nam,
                        mang đến trải nghiệm thể thao chuẩn quốc tế và góp phần phát triển phong trào Pickleball trên toàn quốc.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            className="bg-white text-black font-medium px-4 py-2 rounded-md inline-flex items-center justify-center"
                            href={getStoreUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex items-center gap-2">
                                    <Image src="/google-play-logo.svg" alt="Google Play" width={20} height={20} />
                                    <Image src="/apple-logo.svg" alt="App Store" width={20} height={20} />
                                </div>
                                <span className="text-secondary-600 font-semibold text-sm border-l-2 border-l-app-border-success ps-2 lg:inline hidden">Đặt lịch ngay</span>
                                <span className="text-secondary-600 font-semibold text-sm border-l-2 border-l-app-border-success ps-2 lg:hidden inline">Tải ứng dụng ngay</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 