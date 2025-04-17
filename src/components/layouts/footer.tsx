import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { makeSrsRequest } from '@/app/makeSrsRequest';
import { API_PATHS } from '@/constants/apis';
import { PAGINATION_PARAMS } from '@/constants';
import LocationList from './LocationList';

interface Location {
    id: number;
    address: string;
    city: string;
    googleMapsLink: string;
}

interface FooterItem {
    title: string;
    items: React.ReactNode[];
}

const Footer = async (): Promise<JSX.Element> => {
    // Fetch locations from API
    const params = {
        ...PAGINATION_PARAMS,
        orderBy: "id",
        order: "asc",
    };
    const response = await makeSrsRequest({
        path: API_PATHS.LOCATION.GET_LOCATION,
        method: "GET",
        params: params,
    });
    const location = (response.result.data as Location[]).sort((a, b) => a.id - b.id);

    // Define footer items with proper typing
    const FOOTER_ITEMS: FooterItem[] = [
        {
            title: "",
            items: [
                // Logo and Brand
                <div key="logo-brand" className="space-y-5">
                    <div className="flex items-center gap-3">
                        <div>
                            <Image
                                src="/Logo-dark.svg"
                                alt="Happyland Pickleball"
                                className="object-contain"
                                height={220}
                                width={220}
                            />
                        </div>
                    </div>

                    <div>
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

                    {/* Social Links */}
                    <div className="space-y-2">
                        <div className="font-bold text-md">Kết nối với chúng tôi</div>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="w-8 h-8">
                                <Image
                                    src="/icons/facebook.svg"
                                    alt="Facebook"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                            <Link href="#" className="w-8 h-8">
                                <Image
                                    src="/icons/tiktok.svg"
                                    alt="TikTok"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                            <Link href="#" className="w-8 h-8">
                                <Image
                                    src="/icons/instagram.svg"
                                    alt="Instagram"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                            <Link href="#" className="w-8 h-8">
                                <Image
                                    src="/icons/youtube.svg"
                                    alt="Youtube"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            ]
        },
        {
            title: "Về chúng tôi",
            items: [
                <Link href="#" key="news" className="block text-sm text-secondary-600">
                    Tin tức
                </Link>,
                <Link href="#" key="reviews" className="block text-sm text-secondary-600">
                    Đánh giá
                </Link>,
                <Link href="#" key="events" className="block text-sm text-secondary-600">
                    Sự kiện
                </Link>
            ]
        },
        {
            title: "Thông tin liên hệ",
            items: [
                <div key="opening-hours" className="flex items-center gap-3">
                    <img src='/icons/clock-icon.svg' />
                    <span className="text-sm">Giờ mở cửa: 5h00 - 23h00</span>
                </div>,
                <div key="email" className="flex items-center gap-3">
                    <img src='/icons/mail-icon.svg' />
                    <span className="text-sm">Email: customersupport@theenglishcoach.vn</span>
                </div>,
                <div key="phone" className="flex items-center gap-3">
                    <img src='/icons/phone-icon.svg' />
                    <span className="text-sm">Hotline: 0839618386</span>
                </div>
            ]
        },
        {
            title: "Cơ sở",
            items: [<LocationList key="location-list" locations={location || []} />]
        },
        {
            title: "",
            items: [
                <p key="copyright" className="text-sm font-semibold">
                    Copyright © 2025 - Bản quyền thuộc về HappyLand
                </p>
            ]
        }
    ];

    return (
        <footer className="bg-[#F5F5F5] lg:py-12  py-10 lg:px-14 md:px-7 px-5 pb-6">
            <div className="max-w-[1230px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {FOOTER_ITEMS.slice(0, -1).map((footerItem: any, index: number) => (
                        <div key={index}>
                            <div className="flex flex-col gap-4">
                                {footerItem?.title && (
                                    <div className="font-bold text-md">{footerItem?.title}</div>
                                )}
                                <div className="flex flex-col gap-2">
                                    {footerItem?.items?.map((item: any, itemIndex: number) => (
                                        <div key={itemIndex}>
                                            <div className="text-secondary-600 hover:text-secondary-700">
                                                {item}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div className="border-t border-[#DCDCDC] pt-4">
                    {FOOTER_ITEMS[FOOTER_ITEMS.length - 1].items[0]}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
