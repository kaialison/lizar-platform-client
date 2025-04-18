"use client";

import React, { useEffect, useState } from "react";
import CustomSlider from "@/components/carousel-section/LocationSlider";
import dynamic from 'next/dynamic';
import { create } from "zustand";

// Dynamically import the LeafletMap component with no SSR
const LeafletMap = dynamic(
  () => import('@/components/maps/LeafletMap'),
  { ssr: false } // This ensures the component only loads on the client side
);

interface Location {
    id: number;
    address: string;
    city: string;
    googleMapsLink: string;
    latitude?: number;
    longitude?: number;
}

const locationItems = [
    {
        id: 0,
        image: "/images/court.png",
    },
    {
        id: 1,
        image: "/images/carousel-item3.png",
    },
    {
        id: 2,
        image: "/images/carousel-item2.png",
    },
];

interface LocationStore {
    selectedMapUrl: string;
    setSelectedMapUrl: (url: string) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    locations: Location[];
    setLocations: (locations: Location[]) => void;
    selectedLocationId: number | null;
    setSelectedLocationId: (id: number | null) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
    selectedMapUrl: "",
    setSelectedMapUrl: (url: string) => set({ selectedMapUrl: url }),
    isLoading: false,
    setIsLoading: (loading: boolean) => set({ isLoading: loading }),
    locations: [],
    setLocations: (locations: Location[]) => set({ locations }),
    selectedLocationId: null,
    setSelectedLocationId: (id: number | null) => set({ selectedLocationId: id }),
}));

// No need for coordinate extraction function as API provides latitude and longitude directly

interface LocationSectionProps {
    location: any;
}

export default function LocationSection({ location }: LocationSectionProps) {
    const { 
        selectedMapUrl, 
        isLoading, 
        locations, 
        setLocations, 
        setSelectedMapUrl, 
        setIsLoading,
        selectedLocationId,
        setSelectedLocationId
    } = useLocationStore();
    
    // Process location data from props
    useEffect(() => {
        if (location) {
            try {
                setIsLoading(true);
                
                // Sort locations by ID
                let locationData = Array.isArray(location) ? 
                    [...location].sort((a, b) => a.id - b.id) : [];
                
                // Filter locations with valid coordinates
                const locationsWithCoords = locationData.filter(loc => 
                    loc.latitude !== undefined && 
                    loc.longitude !== undefined && 
                    !isNaN(loc.latitude) && 
                    !isNaN(loc.longitude)
                );
                
                // Set all locations in the store
                setLocations(locationData || []);
                
                // Display all locations but center on a random one
                if (locationsWithCoords.length > 0) {
                    // Select a random location for centering
                    const randomIndex = Math.floor(Math.random() * locationsWithCoords.length);
                    const randomLocation = locationsWithCoords[randomIndex];
                    
                    // Set as selected for centering purposes, but still show all locations
                    setSelectedLocationId(randomLocation.id);
                } else {
                    setSelectedLocationId(null);
                }
                
                // Set default map URL using the first valid location
                setDefaultMapUrl(locationData);
                
                setIsLoading(false);
            } catch (error) {
                console.error("Error processing locations:", error);
                setIsLoading(false);
            }
        }
    }, [location, setLocations, setSelectedMapUrl, setIsLoading, setSelectedLocationId]);
    
    // Function to set default map URL using the first valid location
    const setDefaultMapUrl = (locations: Location[]) => {
        try {            
            // Filter out locations with invalid or missing googleMapsLink
            const validLocations = locations.filter(loc => loc.googleMapsLink && loc.googleMapsLink.trim() !== '');
            
            if (validLocations.length === 0) {
                // Fallback to default map of Vietnam
                setSelectedMapUrl(`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=16.0,106.0&zoom=6`);
                return;
            }
            
            // Get the first valid location
            const firstLocation = validLocations[0];
            let mapUrl;
            
            // Convert Google Maps link to embed format
            if (firstLocation.googleMapsLink.includes('maps.google.com/?q=')) {
                // Extract address from q parameter
                const qMatch = firstLocation.googleMapsLink.match(/\?q=([^&]+)/);
                if (qMatch) {
                    const address = decodeURIComponent(qMatch[1]);
                    mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}&zoom=15`;
                } else {
                    mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(firstLocation.address)}&zoom=15`;
                }
            } else if (firstLocation.googleMapsLink.includes('maps/place')) {
                // Convert standard Google Maps URL to embed format
                mapUrl = firstLocation.googleMapsLink.replace('maps/place', 'maps/embed/v1/place') + '&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';
            } else {
                // Use address as fallback
                mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(firstLocation.address)}&zoom=15`;
            }
            
            setSelectedMapUrl(mapUrl);
            
        } catch (error) {
            // Fallback to default map URL
            setSelectedMapUrl(`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=16.0,106.0&zoom=6`);
        }
    };
    
    return (
        <section id="location-section" className="lg:py-20 md:py-16 py-10 bg-[#F7FAF9] overflow-hidden">
            <div className="container px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:gap-10">
                    <div className="grid grid-cols-1 text-center gap-2 md:gap-3">
                        <div className="text-sm md:text-base lg:text-md leading-relaxed md:leading-text-md text-secondary-700">TẬN HƯỞNG NIỀM VUI THỂ THAO MỖI NGÀY</div>
                        <div className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">KHÔNG GIAN LÝ TƯỞNG</div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        <CustomSlider items={locationItems} />
                        <div className="relative aspect-[4/3] md:aspect-[594/453] rounded-2xl overflow-hidden shadow-lg">
                            <div className="absolute inset-0 bg-gray-50"></div>
                            <div className="relative w-full h-full">
                                {isLoading && (
                                    <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-10">
                                        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                                <div className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
                                    <LeafletMap
                                        locations={locations}
                                        selectedLocationId={selectedLocationId}
                                        onMarkerClick={(locationId) => {
                                            setSelectedLocationId(locationId);
                                            setIsLoading(false);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
