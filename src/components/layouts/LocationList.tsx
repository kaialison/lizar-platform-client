"use client";

import React from 'react';
import { useLocationStore } from '@/templates/HomePage/section/LocationSection';

interface Location {
    id: number;
    address: string;
    city: string;
    googleMapsLink: string;
}

interface LocationListProps {
    locations: Location[];
}

const LocationList = ({ locations }: LocationListProps) => {
    const { setSelectedMapUrl, setIsLoading } = useLocationStore();

    const handleLocationClick = async (location: Location) => {
        setIsLoading(true);
        const mapUrl = location.googleMapsLink.replace('maps/place', 'maps/embed') + '&output=embed';
        setSelectedMapUrl(mapUrl);

        const element = document.getElementById("location-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            // Set loading to false after map loads
            setTimeout(() => setIsLoading(false), 1000);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {locations?.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleLocationClick(item)}
                    className="text-sm text-secondary-600 text-left hover:text-primary-600 transition-colors"
                >
                    Cơ sở {item.id}: {item.address}{item.city ? `, ${item.city}` : ''}
                </button>
            ))}
        </div>
    );
};

export default LocationList;
