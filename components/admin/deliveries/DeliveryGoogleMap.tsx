"use client";

import React, { useRef, useState, useEffect } from 'react';
import { 
  RefreshCw, 
  AlertTriangle, 
  Plus, 
  Minus, 
  Navigation, 
  ChevronDown,
  Zap
} from "lucide-react";
import {
  PACINOS_CENTER,
  LatLng,
  MapRoute
} from "./mapData";

// Charcoal-obsidian dark mode style settings matching premium dark parameters
const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0c0c0e" }] },
  { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4b4b4d" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#141416" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1e1e20" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#3c3c3e" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#070708" }] }
];

export default function DeliveryGoogleMap() {
  // Geolocation and map states
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);
  
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const driverMarkersRef = useRef<any[]>([]);

  // Fetch actual browser GPS coordinates on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocation permission denied, using default center.", error);
          setUserLocation(PACINOS_CENTER);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setUserLocation(PACINOS_CENTER);
    }
  }, []);

  // Asynchronously load Google Maps JavaScript API
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && window.google.maps) {
        setIsLoaded(true);
      } else {
        setLoadError(true);
      }
    };
    script.onerror = () => setLoadError(true);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Generate dynamic physical delivery routes relative to the User's location coordinates
  const generateRelativeRoutes = (center: LatLng): MapRoute[] => {
    return [
      {
        id: "route-1",
        driverId: 1,
        timeLabel: "12 min",
        distanceLabel: "3.2 km",
        color: "#3b82f6",
        status: "on-time",
        nodes: [
          center,
          { lat: center.lat + 0.003, lng: center.lng - 0.002 },
          { lat: center.lat + 0.007, lng: center.lng - 0.004 },
          { lat: center.lat + 0.010, lng: center.lng - 0.007 },
          { lat: center.lat + 0.012, lng: center.lng - 0.010 }
        ],
        destinationName: "ELTHAM NORTH"
      },
      {
        id: "route-2",
        driverId: 2,
        timeLabel: "18 min",
        distanceLabel: "5.6 km",
        color: "#10b981",
        status: "on-time",
        nodes: [
          center,
          { lat: center.lat + 0.001, lng: center.lng + 0.004 },
          { lat: center.lat + 0.003, lng: center.lng + 0.008 },
          { lat: center.lat + 0.005, lng: center.lng + 0.012 }
        ],
        destinationName: "BUNDOORA"
      },
      {
        id: "route-3",
        driverId: 3,
        timeLabel: "16 min",
        distanceLabel: "4.1 km",
        color: "#a855f7",
        status: "at-risk",
        nodes: [
          center,
          { lat: center.lat - 0.002, lng: center.lng - 0.003 },
          { lat: center.lat - 0.005, lng: center.lng - 0.006 },
          { lat: center.lat - 0.008, lng: center.lng - 0.008 }
        ],
        destinationName: "GREENSBOROUGH"
      },
      {
        id: "route-4",
        driverId: 4,
        timeLabel: "2 min",
        distanceLabel: "Overdue",
        color: "#ef4444",
        status: "late",
        nodes: [
          center,
          { lat: center.lat - 0.003, lng: center.lng + 0.002 },
          { lat: center.lat - 0.006, lng: center.lng + 0.005 },
          { lat: center.lat - 0.009, lng: center.lng + 0.008 }
        ],
        destinationName: "RESERVOIR"
      },
      {
        id: "route-5",
        driverId: 5,
        timeLabel: "14 min",
        distanceLabel: "3.8 km",
        color: "#f97316",
        status: "on-time",
        nodes: [
          center,
          { lat: center.lat - 0.001, lng: center.lng + 0.003 },
          { lat: center.lat - 0.003, lng: center.lng + 0.006 },
          { lat: center.lat - 0.005, lng: center.lng + 0.009 }
        ],
        destinationName: "MILL PARK"
      }
    ];
  };

  // Initialize Map and render layers dynamically
  useEffect(() => {
    if (!isLoaded || !userLocation || !mapContainerRef.current || !window.google) return;

    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: userLocation,
      zoom: 14,
      styles: darkMapStyles,
      disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });
    mapRef.current = map;

    // Premium glowing restaurant pin design
    const centerIconSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="130" height="75" viewBox="0 0 130 75">
        <circle cx="65" cy="22" r="21" fill="#f97316" fill-opacity="0.12"/>
        <circle cx="65" cy="22" r="12" fill="#f97316" fill-opacity="0.25"/>
        <path d="M 65 8 C 58.5 8 53 13.5 53 20.2 C 53 29.2 65 38.2 65 38.2 C 65 38.2 77 29.2 77 20.2 C 77 13.5 71.5 8 65 8 Z" fill="#f97316" stroke="white" stroke-width="1.8"/>
        <circle cx="65" cy="20.2" r="3.5" fill="white"/>
        <rect x="15" y="44" width="100" height="23" rx="6" fill="#121214" stroke="#f97316" stroke-width="1.5"/>
        <text x="65" y="54" font-family="system-ui, sans-serif" font-weight="900" font-size="8" fill="white" text-anchor="middle" letter-spacing="0.5">Pacinos Eltham</text>
        <text x="65" y="62" font-family="system-ui, sans-serif" font-weight="900" font-size="6" fill="#f97316" text-anchor="middle" letter-spacing="0.5">Your Location</text>
      </svg>
    `;

    new window.google.maps.Marker({
      position: userLocation,
      map: map,
      icon: {
        url: "data:image/svg+xml;utf-8," + encodeURIComponent(centerIconSvg),
        anchor: new window.google.maps.Point(65, 22)
      },
      title: "Pacinos Eltham"
    });

    const relativeRoutes = generateRelativeRoutes(userLocation);
    const driverMarkers: any[] = [];

    relativeRoutes.forEach((route) => {
      // Trace polyline paths
      new window.google.maps.Polyline({
        path: route.nodes,
        geodesic: true,
        strokeColor: route.color,
        strokeOpacity: 0.85,
        strokeWeight: 4.5,
        map: map
      });

      // Unified single SVG template containing data badge blocks
      const markerSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="30" viewBox="0 0 140 30">
          <circle cx="15" cy="15" r="12" fill="${route.color}" stroke="white" stroke-width="2"/>
          <text x="15" y="19" font-family="system-ui, sans-serif" font-weight="900" font-size="11" fill="white" text-anchor="middle">${route.driverId}</text>
          <rect x="32" y="5" width="100" height="20" rx="6" fill="#0d0d0e" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <text x="82" y="18" font-family="system-ui, sans-serif" font-weight="900" font-size="8" fill="white" text-anchor="middle">
            <tspan fill="${route.status === 'late' ? '#ef4444' : '#f97316'}">${route.timeLabel}</tspan>
            <tspan fill="#6b7280"> | </tspan>
            <tspan fill="#9ca3af">${route.distanceLabel}</tspan>
          </text>
        </svg>
      `;

      const driverMarker = new window.google.maps.Marker({
        position: route.nodes[1],
        map: map,
        icon: {
          url: "data:image/svg+xml;utf-8," + encodeURIComponent(markerSvg),
          anchor: new window.google.maps.Point(15, 15)
        },
        title: `Driver ${route.driverId} - ${route.destinationName}`
      });

      driverMarkers.push({
        route,
        marker: driverMarker,
        currentNodeIndex: 1,
        movingForward: true
      });
    });
    driverMarkersRef.current = driverMarkers;

    // Simulate real-time transit telemetry coordinate tracking updates
    const interval = setInterval(() => {
      driverMarkersRef.current.forEach((dm) => {
        const nodes = dm.route.nodes;
        let nextIndex = dm.currentNodeIndex;

        if (dm.movingForward) {
          if (nextIndex < nodes.length - 1) {
            nextIndex++;
          } else {
            dm.movingForward = false;
            nextIndex--;
          }
        } else {
          if (nextIndex > 0) {
            nextIndex--;
          } else {
            dm.movingForward = true;
            nextIndex++;
          }
        }

        dm.currentNodeIndex = nextIndex;
        const targetPos = nodes[nextIndex];
        
        if (dm.marker && typeof dm.marker.setPosition === "function") {
          dm.marker.setPosition(targetPos);
        }
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      driverMarkersRef.current.forEach((dm) => {
        if (dm.marker) dm.marker.setMap(null);
      });
    };
  }, [isLoaded, userLocation]);

  // Map Controls Zoom/Pan API binds
  const zoomIn = () => mapRef.current?.setZoom(mapRef.current.getZoom() + 1);
  const zoomOut = () => mapRef.current?.setZoom(mapRef.current.getZoom() - 1);
  const centerOnUser = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.panTo(userLocation);
      mapRef.current.setZoom(14);
    }
  };

    const [activeTab, setActiveTab] = useState("LIVE");

  const tabs = [
    { label: "LIVE", count: 12, color: "text-green-400" },
    { label: "Preparing", count: 5 },
    { label: "Ready", count: null },
    { label: "Out for Delivery", count: 12 },
    { label: "Delivered", count: 54 },
    { label: "Late", count: 8, color: "text-red-400" },
  ];

  return (
    <section className="space-y-3">
     {/* Tab bar */}
    <div className="flex items-center gap-1 flex-wrap">
            {tabs.map((t) => (
              <button
                key={t.label}
                onClick={() => setActiveTab(t.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === t.label
                    ? "bg-[#f9671a]/10 text-[#f9671a] border border-[#f9671a]/50"
                    : "bg-[#1a1a1c] text-zinc-400 hover:text-white border border-[#2e2e30]"
                }`}
              >
                {t.label}
                {t.count !== null && (
                  <span className={`text-[10px] font-bold ${t.color ?? (activeTab === t.label ? "text-[#f9671a]" : "text-zinc-500")}`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1c] border border-[#2e2e30] text-zinc-400 text-xs hover:text-white">
                Today, 10 AM <ChevronDown size={11} />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f9671a] text-white text-xs font-medium hover:bg-[#e05a15] transition-colors">
                <Zap size={11} /> Delivery Auto Allot
              </button>
            </div>
    </div>

     {/* Map */}
    <div className="lg:col-span-8 bg-[#121214] border border-zinc-800 rounded-3xl overflow-hidden relative min-h-[580px] shadow-2xl flex flex-col justify-between">
      
      {/* Map Content Holder Container View */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0 bg-[#0d0d0e]">
        {!isLoaded && !loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d0e] z-10 space-y-3">
            <RefreshCw className="h-6 w-6 text-orange-500 animate-spin" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Initializing Map Context Layer...
            </span>
          </div>
        )}

        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d0e] z-10 p-6 text-center space-y-3">
            <AlertTriangle className="h-8 w-8 text-rose-500" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Maps Instance Alert</h4>
              <p className="text-[11px] text-zinc-500 font-medium max-w-xs mt-1">
                Verify target environmental sandbox token strings to sync custom geographical tracking charts smoothly.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Top Floating Legends Row Overlay */}
      <div className="relative z-10 p-5 flex justify-between items-start pointer-events-none w-full">
        <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 space-y-2.5 pointer-events-auto shadow-xl max-w-[170px]">
          <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
            Fulfillment Legend
          </span>
          <div className="space-y-1.5 text-[10px] font-bold text-zinc-300 uppercase tracking-wide">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>On Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>At Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Overdue</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs">📍</span>
              <span>Hub Node</span>
            </div>
          </div>
        </div>

        {/* Traffic Telemetry Overlay Block */}
        <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 space-y-2.5 pointer-events-auto shadow-xl max-w-[170px]">
          <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
            Traffic Latency
          </span>
          <div className="space-y-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
            <div className="flex items-center justify-between space-x-4">
              <span>Low</span>
              <span className="h-1.5 w-12 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span>Medium</span>
              <span className="h-1.5 w-12 rounded-full bg-amber-500" />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span>High</span>
              <span className="h-1.5 w-12 rounded-full bg-rose-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Map Navigation Utility Bars Controls */}
      <div className="relative z-10 p-5 flex justify-between items-end pointer-events-none w-full">
        <div className="bg-black/80 backdrop-blur-md border border-zinc-800 rounded-xl px-3.5 py-2 pointer-events-auto text-[10px] font-bold text-zinc-200 tracking-wide flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span>User GPS Active Location</span>
        </div>

        <div className="flex flex-col space-y-1.5 pointer-events-auto">
          <button
            onClick={zoomIn}
            className="h-9 w-9 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition shadow-lg outline-none"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={zoomOut}
            className="h-9 w-9 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition shadow-lg outline-none"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={centerOnUser}
            className="h-9 w-9 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg transition outline-none"
          >
            <Navigation className="h-4 w-4 rotate-45 stroke-[2.5]" />
          </button>
        </div>
      </div>

    </div>
    </section>
  );
}