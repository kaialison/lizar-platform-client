"use client";
import React, { useRef, useState, forwardRef } from "react";
import Slider from "react-slick";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@nextui-org/react";

type SliderSettings = {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    arrows?: boolean;
    gap?: number;
    beforeChange?: (oldIndex: number, newIndex: number) => void;
    responsive?: {
        breakpoint: number;
        settings: {
            slidesToShow: number;
        };
    }[];
};

const DEFAULT_SETTINGS = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 4,
            },
        },
    ],
};

interface CustomCarouselProps {
    items: any[];
    renderItem: (item: any) => React.ReactNode;
    settings?: SliderSettings;
    isPaging?: boolean;
    isControlAbsolute?: boolean;
    onPrevClick?: () => void;
    onNextClick?: () => void;
}

const CustomCarousel = forwardRef<Slider, CustomCarouselProps>(({
    items,
    renderItem,
    settings,
    isPaging = false,
    isControlAbsolute = false,
    onPrevClick,
    onNextClick
}, ref) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [rtl, setRtl] = useState(false);

    const sliderSettings = {
        ...DEFAULT_SETTINGS,
        ...settings,
        beforeChange: (oldIndex: number, newIndex: number) => {
            setCurrentSlide(newIndex);
            settings?.beforeChange?.(oldIndex, newIndex);
        },
    };

    const isInfinite = settings?.infinite ?? DEFAULT_SETTINGS.infinite;
    const totalSlides = items.length;
    const slidesToShow = settings?.slidesToShow || DEFAULT_SETTINGS.slidesToShow;
    const isNextDisabled = !isInfinite && currentSlide >= totalSlides - slidesToShow;
    const isPrevDisabled = !isInfinite && currentSlide === 0;

    const next = () => {
        setRtl(false);
        if (onNextClick) {
            onNextClick();
        } else {
            (ref as React.MutableRefObject<Slider>)?.current?.slickNext();
        }
    };

    const previous = () => {
        setRtl(true);
        if (onPrevClick) {
            onPrevClick();
        } else {
            (ref as React.MutableRefObject<Slider>)?.current?.slickPrev();
        }
    };

    const containerControl = isControlAbsolute
        ? 'absolute top-0 start-0 w-full h-full flex justify-between items-center pointer-events-none'
        : 'flex justify-center lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:w-full lg:justify-between gap-5 mt-10 lg:mt-0 lg:px-4';

    const renderPaging = () => {
        return (
            <div className="flex justify-center gap-3 mt-10">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`lg:w-20 md:w-10 w-6 h-1 rounded-full transition-colors duration-300 
                            ${index === currentSlide ? 'bg-[#4A80D9]' : 'bg-gray-300'}`}
                        onClick={() => (ref as React.MutableRefObject<Slider>)?.current?.slickGoTo(index)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="slider-container relative">
            <Slider ref={ref} {...sliderSettings}>
                {items.map((item) => renderItem(item))}
            </Slider>

            {!isControlAbsolute && (
                <div className={containerControl}>
                    <Button
                        isIconOnly
                        onClick={previous}
                        isDisabled={isPrevDisabled}
                        className={`w-10 h-10 rounded-full bg-white shadow-md transition-opacity border border-gray-200 ${
                            isPrevDisabled ? 'opacity-50' : 'hover:bg-gray-50'
                        }`}
                    >
                        <CaretLeft size={20} weight="bold" />
                    </Button>
                    <Button
                        isIconOnly
                        onClick={next}
                        isDisabled={isNextDisabled}
                        className={`w-10 h-10 rounded-full bg-white shadow-md transition-opacity border border-gray-200 ${
                            isNextDisabled ? 'opacity-50' : 'hover:bg-gray-50'
                        }`}
                    >
                        <CaretRight size={20} weight="bold" />
                    </Button>
                </div>
            )}

            {isPaging && renderPaging()}
        </div>
    );
});

export default CustomCarousel; 