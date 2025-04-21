import React from 'react';
import { Button } from "@nextui-org/react";
import { Play } from "@phosphor-icons/react/dist/ssr";

export default function IntroductionSection() {
    return (
        <section className="lg:py-0 py-20">
            <div className="container">
                <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-col lg:gap-14 gap-0">
                    <div className="lg:col-span-1">
                        <div className="lg:text-display-md text-display-xs lg:leading-display-md leading-display-xs font-bold mb-10 flex flex-col">
                            <div className="text-black/70 lg:inline hidden">GIỚI THIỆU VỀ</div>
                            <div className="text-black/70 lg:hidden inline">GIỚI THIỆU VỀ <span className="bg-primary-gradient bg-clip-text text-transparent">HAPPYLAND PICKLEBALL</span></div>
                            <div className="bg-primary-gradient bg-clip-text text-transparent lg:inline hidden">HAPPYLAND PICKLEBALL</div>
                        </div>
                        <div className="space-y-4 lg:mb-0 mb-14">
                            <p className="text-md leading-text-md text-secondary-700">
                                Happyland Pickleball hướng đến việc trở thành hệ thống sân chơi Pickleball hàng đầu Việt Nam, mang đến trải nghiệm thể thao đạt tiêu chuẩn quốc tế.
                            </p>
                            <p className="text-md leading-text-md  text-secondary-700">
                                Chúng tôi không chỉ xây dựng một sân chơi chất lượng mà còn muốn phát triển cộng đồng Pickleball sôi động, chuyên nghiệp, giúp bộ môn này ngày càng phổ biến tại Việt Nam.
                            </p>
                        </div>
                    </div>

                    {/* Video Column - Takes 2/3 width */}
                    <div className="col-span-2">
                        <div className="relative aspect-[839/470]">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src="https://drive.google.com/file/d/1mWn_Updd76jyx7dGX6SstXUP311VLRbg/preview"
                                title="Video player" 
                                frameBorder="0" 
                                allow="autoplay"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
