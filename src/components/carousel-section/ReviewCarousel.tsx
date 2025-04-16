"use client";
import React, { useRef, useEffect } from "react";
import CustomCarousel from "@/components/slider/CustomCarousel";
import ReviewCard from "@/components/cards/ReviewCard";
import { Review } from "@/types/review";

interface ReviewCarouselProps {
    reviews: Review[];
}

export default function ReviewCarousel({ reviews }: ReviewCarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const equalizeCardHeights = () => {
            if (!carouselRef.current) return;

            // Reset heights first
            const cards = carouselRef.current.querySelectorAll('.review-card');
            cards.forEach(card => {
                (card as HTMLElement).style.height = 'auto';
            });

            // Find the tallest card
            let maxHeight = 0;
            cards.forEach(card => {
                const height = (card as HTMLElement).offsetHeight;
                maxHeight = Math.max(maxHeight, height);
            });

            // Set all cards to the height of the tallest card
            cards.forEach(card => {
                (card as HTMLElement).style.height = `${maxHeight}px`;
            });
        };

        // Initial equalization
        equalizeCardHeights();

        // Re-equalize on window resize
        window.addEventListener('resize', equalizeCardHeights);

        return () => {
            window.removeEventListener('resize', equalizeCardHeights);
        };
    }, [reviews]);

    const carouselSettings = {
        slidesToShow: 3,
        gap: 24,
        autoplaySpeed: 5000,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    const renderReviewCard = (item: Review) => (
        <div className="px-3">
            <div className="review-card">
                <ReviewCard 
                    item={{
                        id: item.id,
                        name: item.name,
                        avatar: item.avatar,
                        rating: item.rating,
                        comment: item.content
                    }}
                />
            </div>
        </div>
    );

    return (
        <div ref={carouselRef}>
            <CustomCarousel 
                items={reviews}
                settings={carouselSettings}
                isPaging={false}
                isControlAbsolute={false}
                renderItem={renderReviewCard}
            />
        </div>
    );
} 