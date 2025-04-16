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
        <div className="bg-[#F7FAF9] p-6 rounded-2xl h-full flex flex-col radius-2xl">
            <div className="flex-1 flex flex-col gap-6">
                <div>
                    <img
                        src="/icons/quote-icon.svg"
                        alt="Quote icon"
                    />
                </div>
                <div className="text-md leading-text-md text-secondary-700">{item.comment}</div>
            </div>
            <div className="flex gap-4 items-center pt-6">
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