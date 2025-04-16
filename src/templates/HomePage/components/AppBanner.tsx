import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AppBanner() {
    return (
        <section className="relative lg:rounded-2xl overflow-hidden mb-20">
            {/* Mobile background */}
            <div className="block sm:hidden">
                <Image
                    src="/images/app-banner-phone.png"
                    alt="App banner background"
                    width={640}
                    height={800}
                    className="w-full object-cover object-top"
                    priority
                />
            </div>
            
            {/* Desktop background */}
            <div className="hidden sm:block">
                <Image
                    src="/images/app-banner.png"
                    alt="App banner background"
                    width={1440}
                    height={400}
                    className="w-full"
                    priority
                />
            </div>

            <div className="absolute inset-0">
                <div className="container h-full">
                    <div className="flex h-full">
                        <div className="w-full flex flex-col sm:flex-row items-center">
                            {/* Content container */}
                            <div className="sm:w-1/2 sm:ml-auto pt-8 sm:pt-0">
                                <div className="text-white text-center flex flex-col gap-4 p-6">
                                    <div className="text-display-xs md:text-display-sm lg:text-display-md leading-display-xs md:leading-display-sm lg:leading-display-md font-semibold">
                                        Đặt lịch chơi ngay!
                                    </div>
                                    <div className="text-sm md:text-md lg:text-lg max-w-[280px] mx-auto">
                                        Tải app ngay hôm nay để đặt sân Pickleball chỉ trong vài chạm!
                                    </div>
                                    <div className="flex gap-4 justify-center mt-2">
                                        <Link
                                            href="https://apps.apple.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-transform hover:scale-105"
                                        >
                                            <img
                                                src="/icons/appstore-install.svg"
                                                alt="Download on App Store"
                                                className="h-10 md:h-12"
                                            />
                                        </Link>
                                        <Link
                                            href="https://play.google.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-transform hover:scale-105"
                                        >
                                            <img
                                                src="/icons/playstore-install.svg"
                                                alt="Get it on Google Play"
                                                className="h-10 md:h-12"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
