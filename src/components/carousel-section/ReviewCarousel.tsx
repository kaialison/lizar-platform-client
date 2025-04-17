"use client";
import React, { useRef, useEffect } from "react";
import CustomCarousel from "@/components/slider/CustomCarousel";
import ReviewCard from "@/components/cards/ReviewCard";
import { Review } from "@/types/review";
import Slider from "react-slick";

interface ReviewCarouselProps {
    reviews: Review[];
}

export default function ReviewCarousel({ reviews }: ReviewCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<Slider>(null);

    useEffect(() => {
        const equalizeCardHeights = () => {
            if (!containerRef.current) return;

            // Reset heights first
            const cards = containerRef.current.querySelectorAll('.review-card');
            cards.forEach(card => {
                (card as HTMLElement).style.height = 'auto';
            });

            // Find the tallest card among all cards
            let maxHeight = 0;
            cards.forEach(card => {
                // Temporarily make the card visible if it's hidden
                const wasHidden = (card as HTMLElement).style.display === 'none';
                if (wasHidden) {
                    (card as HTMLElement).style.display = 'flex';
                }
                
                const height = (card as HTMLElement).offsetHeight;
                maxHeight = Math.max(maxHeight, height);
                
                // Restore the original display state
                if (wasHidden) {
                    (card as HTMLElement).style.display = 'none';
                }
            });

            // Set all cards to the height of the tallest card
            cards.forEach(card => {
                (card as HTMLElement).style.height = `${maxHeight}px`;
            });
        };

        // Initial equalization
        equalizeCardHeights();

        // Re-equalize on window resize and slide change
        window.addEventListener('resize', equalizeCardHeights);
        const slider = sliderRef.current?.innerSlider?.list;
        if (slider) {
            slider.addEventListener('transitionend', equalizeCardHeights);
        }

        return () => {
            window.removeEventListener('resize', equalizeCardHeights);
            if (slider) {
                slider.removeEventListener('transitionend', equalizeCardHeights);
            }
        };
    }, [reviews]);

    const carouselSettings = {
        slidesToShow: 3,
        gap: 24,
        autoplaySpeed: 5000,
        arrows: false,
        speed: 500,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                    gap: 20,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    gap: 16,
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
        <div ref={containerRef}>
            <CustomCarousel 
                ref={sliderRef}
                items={reviews}
                settings={carouselSettings}
                isPaging={false}
                isControlAbsolute={false}
                renderItem={renderReviewCard}
            />
        </div>
    );
} 