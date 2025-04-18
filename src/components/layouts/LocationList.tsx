"use client";

import React, { useState } from 'react';
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
    const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
    const { setIsLoading, setSelectedMapUrl } = useLocationStore();

    const handleLocationClick = (location: Location) => {
        setSelectedLocationId(location.id);
        
        // Show this specific location on the map
        setIsLoading(true);
        
        // Create a map URL for this specific location
        let mapUrl;
        if (location.googleMapsLink.includes('maps.google.com/?q=')) {
            // Extract address from q parameter
            const qMatch = location.googleMapsLink.match(/\?q=([^&]+)/);
            if (qMatch) {
                const address = decodeURIComponent(qMatch[1]);
                mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}&zoom=15`;
            } else {
                mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.address)}&zoom=15`;
            }
        } else {
            // For standard format URLs
            mapUrl = location.googleMapsLink.replace('maps/place', 'maps/embed') + '&output=embed';
        }
        
        setSelectedMapUrl(mapUrl);
        
        // No longer scroll to location section when clicking in footer
        // Just update the map URL for when user navigates to the location section manually
    };

    return (
        <div className="flex flex-col gap-2">
            {locations?.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleLocationClick(item)}
                    className={`text-sm text-left transition-colors ${selectedLocationId === item.id ? 'text-primary-600 font-medium' : 'text-secondary-600 hover:text-primary-600'}`}
                >
                    Cơ sở {item.id}: {item.address}{item.city ? `, ${item.city}` : ''}
                </button>
            ))}
        </div>
    );
};

export default LocationList;
