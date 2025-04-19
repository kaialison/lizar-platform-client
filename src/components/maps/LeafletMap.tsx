"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the Location type
interface Location {
  id: number;
  address: string;
  city: string;
  googleMapsLink: string;
  latitude?: number;
  longitude?: number;
  name?: string;
}

interface LeafletMapProps {
  locations: Location[];
  selectedLocationId: number | null;
  onMarkerClick?: (locationId: number) => void;
}

// Component to handle map view changes
const ChangeView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const LeafletMap: React.FC<LeafletMapProps> = ({
  locations,
  selectedLocationId,
  onMarkerClick
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([10.8231, 106.6297]); // Default: Ho Chi Minh City
  const [mapZoom, setMapZoom] = useState(12);
  const [isClient, setIsClient] = useState(false);
  
  // Fix Leaflet icon issue in Next.js
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Fix for default Leaflet icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/icons/map-pin.svg',
        iconUrl: '/icons/map-pin.svg',
        shadowUrl: '',
        iconSize: [64, 64],
        iconAnchor: [16, 32],
        tooltipAnchor: [0, -20],
      });
      
      // No direct CSS manipulation to avoid SSR issues
    }
  }, []);

  // Only render the map on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  // Update map center and zoom when selected location changes
  useEffect(() => {
    if (locations.length === 0) {
      return;
    }

    // If a location is selected, center on it
    if (selectedLocationId !== null) {
      const selectedLocation = locations.find(loc => loc.id === selectedLocationId);
      
      if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude) {
        setMapCenter([selectedLocation.latitude, selectedLocation.longitude]);
        setMapZoom(15);
        return;
      }
    }

    // Otherwise, calculate center to show all locations
    const validLocations = locations.filter(loc => 
      loc.latitude !== undefined && 
      loc.longitude !== undefined && 
      !isNaN(Number(loc.latitude)) && 
      !isNaN(Number(loc.longitude))
    );
    
    
    if (validLocations.length === 0) {
      return;
    }

    if (validLocations.length === 1) {
      const loc = validLocations[0];
      setMapCenter([Number(loc.latitude), Number(loc.longitude)]);
      setMapZoom(15);
    } else {
      // Calculate average lat/lng as center
      let totalLat = 0;
      let totalLng = 0;
      
      validLocations.forEach(loc => {
        totalLat += Number(loc.latitude);
        totalLng += Number(loc.longitude);
      });
      
      const avgLat = totalLat / validLocations.length;
      const avgLng = totalLng / validLocations.length;
      
      setMapCenter([avgLat, avgLng]);
      setMapZoom(11); // Zoom out a bit to show multiple locations
    }
  }, [locations, selectedLocationId]);

  // Don't render the map on the server
  if (!isClient) {
    return <div className="w-full h-full bg-gray-100 animate-pulse"></div>;
  }

  // Filter locations with valid coordinates
  const validLocations = locations.filter(loc => 
    loc.latitude !== undefined && 
    loc.longitude !== undefined && 
    !isNaN(Number(loc.latitude)) && 
    !isNaN(Number(loc.longitude))
  );

  
  // Get the selected location if it exists
  const selectedLocation = selectedLocationId !== null
    ? validLocations.find(loc => loc.id === selectedLocationId)
    : null;

  
  // If no valid locations at all, show message
  if (validLocations.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Không có vị trí nào để hiển thị</p>
      </div>
    );
  }
  
  // Always display all valid locations on the map
  // But use selectedLocation for centering if available
  const locationsToDisplay = validLocations;

  
  return (
    <MapContainer 
      style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
      zoomControl={true}
      center={[mapCenter[0], mapCenter[1]]} 
      zoom={mapZoom}
      key={`map-${validLocations.length}-${mapCenter[0]}-${mapCenter[1]}`}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'}
        maxZoom={19}
      />
      <ChangeView center={mapCenter} zoom={mapZoom} />
      
      {locationsToDisplay.map((location) => (
        <Marker 
          key={location.id}
          position={[Number(location.latitude), Number(location.longitude)]}
          eventHandlers={{
            click: () => {
              if (onMarkerClick) {
                onMarkerClick(location.id);
              }
            }
          }}
        >
          <Tooltip permanent={false} direction="top" className="rounded-xl border-none bg-white shadow-lg">
            <div className="lg:text-sm text-xs">
              <p className="font-semibold">{location.name || `Cơ sở ${location.id}`}</p>
              <p>{location.address}</p>
              {location.city && <p>{location.city}</p>}
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
