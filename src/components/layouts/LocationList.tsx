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
    const { setIsLoading, setSelectedMapUrl, setSelectedLocationId } = useLocationStore();

    const handleLocationClick = (location: Location) => {
        setSelectedLocationId(location.id);
        setIsLoading(true);
        
        // Add smooth scroll to location section
        const locationSection = document.getElementById('location-section');
        if (locationSection) {
            locationSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        try {
            let mapUrl;
            
            // Convert Google Maps link to embed format
            if (location.googleMapsLink.includes('maps.google.com/?q=')) {
                // Extract address from q parameter
                const qMatch = location.googleMapsLink.match(/\?q=([^&]+)/);
                if (qMatch) {
                    const address = decodeURIComponent(qMatch[1]);
                    mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}&zoom=15`;
                } else {
                    mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.address)}&zoom=15`;
                }
            } else if (location.googleMapsLink.includes('maps/place')) {
                // Convert standard Google Maps URL to embed format
                mapUrl = location.googleMapsLink.replace('maps/place', 'maps/embed/v1/place') + '&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';
            } else {
                // Use address as fallback
                mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.address)}&zoom=15`;
            }
            
            setSelectedMapUrl(mapUrl);
        } catch (error) {
            setSelectedMapUrl(`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=16.0,106.0&zoom=6`);
        } finally {
            setIsLoading(false);
        }
    };

    // Update the button to use selectedLocationId from the store
    return (
        <div className="flex flex-col gap-2">
            {locations?.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleLocationClick(item)}
                    className={`text-sm text-left transition-colors ${
                        useLocationStore.getState().selectedLocationId === item.id 
                        ? 'text-primary-600 font-medium' 
                        : 'text-secondary-600 hover:text-primary-600'
                    }`}
                >
                    Cơ sở {item.id}: {item.address}{item.city ? `, ${item.city}` : ''}
                </button>
            ))}
        </div>
    );
};

export default LocationList;
