import { Button } from "@nextui-org/react";
import Image from "next/image";

export default function HeroSection() {
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
                    <div className="lg:space-y-4 space-y-0 flex lg:block flex-col">
                        <span className="inline-block font-display text-sm lg:text-display-xs leading-display-xs font-medium text-white/90">
                            <span className="lg:inline hidden">Khám phá đam mê Pickleball tại</span>
                            <span className="lg:hidden inline">Ứng dụng Đặt sân Pickleball</span>
                        </span>
                        <span className="font-display text-2xl lg:text-display-xl leading-tight lg:leading-display-xl font-bold tracking-[-0.02em]">
                            HAPPYLAND PICKLEBALL
                        </span>
                    </div>
                    <p className="text-sm lg:text-md leading-relaxed lg:leading-text-md text-white font-normal">
                        HappyLand Pickleball hướng đến trở thành hệ thống sân chơi hàng đầu tại Việt Nam,
                        mang đến trải nghiệm thể thao chuẩn quốc tế và góp phần phát triển phong trào Pickleball trên toàn quốc.
                    </p>
                    <div className="flex gap-4">
                        <Button
                            className="bg-white text-black font-medium px-4"
                            size="lg"
                            radius="md"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex items-center gap-2">
                                    <Image src="/google-play-logo.svg" alt="Google Play" width={20} height={20} />
                                    <Image src="/apple-logo.svg" alt="App Store" width={20} height={20} />
                                </div>
                                <span className="text-secondary-600 font-semibold text-sm border-l-2 border-l-app-border-success ps-2 lg:inline hidden">Đặt lịch ngay</span>
                                <span className="text-secondary-600 font-semibold text-sm border-l-2 border-l-app-border-success ps-2 lg:hidden inline">Tải ứng dụng ngay</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
} 