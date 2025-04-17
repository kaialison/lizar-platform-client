"use client";
import React from "react";
import { Star } from "@phosphor-icons/react";

interface ReviewCardProps {
    item: {
        id: number;
        name: string;
        avatar: string;
        rating: number;
        comment: string;
    };
}

export default function ReviewCard({ item }: ReviewCardProps) {
    const renderStars = (rating: number) => (
        <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    size={16}
                    weight={index < rating ? "fill" : "regular"}
                    className={index < rating ? "text-yellow-400" : "text-neutral-300"}
                />
            ))}
        </div>
    );

    return (
        <div className="bg-[#F7FAF9] lg:p-6 p-4 rounded-2xl h-full flex flex-col radius-2xl review-card">
            <div className="flex-1 flex flex-col lg:gap-6 gap-4 min-h-[180px]">
                <div className="lg:mb-0 mb-2 flex-shrink-0">
                    <img
                        src="/icons/quote-icon.svg"
                        alt="Quote icon"
                        className="lg:w-auto w-8"
                    />
                </div>
                <div className="text-md leading-text-md text-secondary-700 lg:text-base text-sm flex-1 line-clamp-5">{item.comment}</div>
            </div>
            <div className="flex gap-4 items-center lg:pt-6 pt-4 border-t border-gray-100 mt-4 flex-shrink-0">
                <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col gap-1">
                    <div className="font-semibold">{item.name}</div>
                    {renderStars(item.rating)}
                </div>
            </div>
        </div>
    );
}