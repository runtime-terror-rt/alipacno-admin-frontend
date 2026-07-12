"use client";

import { useState, useEffect, useRef } from "react";
import {
  Truck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  RefreshCw,
  Search,
  Plus,
  Minus,
  Navigation,
  Phone,
  Eye,
  MapPin,
} from "lucide-react";
import {
  DELIVERY_STATS,
  LIVE_ORDERS,
  PACINOS_CENTER,
  LatLng,
  MapRoute,
  LiveOrder,
} from "./data";
import MetricCard from "@/components/admin/ui/MetricCard";
import PageHeader from "@/components/admin/common/PageHeader";

declare global {
  interface Window {
    google: any;
  }
}

// Charcoal-obsidian dark mode style settings matching the user's mockup exactly
const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0c0c0e" }] },
  { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4b4b4d" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#141416" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1e1e20" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3c3c3e" }],
  },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#070708" }],
  },
];

export default function DeliveriesPage() {
  const [activePeriod, setActivePeriod] = useState<string>("Today");
  const [activeFilter, setActiveFilter] = useState<string>("LIVE");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(coords);
        },
        (error) => {
          console.warn(
            "Geolocation permission denied, using default center.",
            error,
          );
          setUserLocation(PACINOS_CENTER);
        },
        { enableHighAccuracy: true },
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

  // Generate dynamic physical delivery routes relative to the User's actual GPS location
  const generateRelativeRoutes = (center: LatLng): MapRoute[] => {
    return [
      {
        id: "route-1",
        driverId: 1,
        timeLabel: "12 min",
        distanceLabel: "3.2 km",
        color: "#3b82f6", // Blue
        status: "on-time",
        nodes: [
          center,
          { lat: center.lat + 0.003, lng: center.lng - 0.002 },
          { lat: center.lat + 0.007, lng: center.lng - 0.004 },
          { lat: center.lat + 0.01, lng: center.lng - 0.007 },
          { lat: center.lat + 0.012, lng: center.lng - 0.01 },
        ],
        destinationName: "ELTHAM NORTH",
      },
      {
        id: "route-2",
        driverId: 2,
        timeLabel: "18 min",
        distanceLabel: "5.6 km",
        color: "#10b981", // Green
        status: "on-time",
        nodes: [
          center,
          { lat: center.lat + 0.001, lng: center.lng + 0.004 },
          { lat: center.lat + 0.003, lng: center.lng + 0.008 },
          { lat: center.lat + 0.005, lng: center.lng + 0.012 },
        ],
        destinationName: "BUNDOORA",
      },
      {
        id: "route-3",
        driverId: 3,
        timeLabel: "16 min",
        distanceLabel: "4.1 km",
        color: "#a855f7", // Purple
        status: "at-risk",
        nodes: [
          center,
          { lat: center.lat - 0.002, lng: center.lng - 0.003 },
          { lat: center.lat - 0.005, lng: center.lng - 0.006 },
          { lat: center.lat - 0.008, lng: center.lng - 0.008 },
        ],
        destinationName: "GREENSBOROUGH",
      },
      {
        id: "route-4",
        driverId: 4,
        timeLabel: "2 min",
        distanceLabel: "Overdue",
        color: "#ef4444", // Red
        status: "late",
        nodes: [
          center,
          { lat: center.lat - 0.003, lng: center.lng + 0.002 },
          { lat: center.lat - 0.006, lng: center.lng + 0.005 },
          { lat: center.lat - 0.009, lng: center.lng + 0.008 },
        ],
        destinationName: "RESERVOIR",
      },
      {
        id: "route-5",
        driverId: 5,
        timeLabel: "14 min",
        distanceLabel: "3.8 km",
        color: "#f97316", // Orange
        status: "on-time",
        nodes: [
          center,
          { lat: center.lat - 0.001, lng: center.lng + 0.003 },
          { lat: center.lat - 0.003, lng: center.lng + 0.006 },
          { lat: center.lat - 0.005, lng: center.lng + 0.009 },
        ],
        destinationName: "MILL PARK",
      },
    ];
  };

  // Initialize Map and render real components relative to user location
  useEffect(() => {
    if (
      !isLoaded ||
      !userLocation ||
      !mapContainerRef.current ||
      !window.google
    )
      return;

    // Create Map centered at user's current GPS location
    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: userLocation,
      zoom: 14,
      styles: darkMapStyles,
      disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    mapRef.current = map;

    // Premium glowing restaurant marker SVG mirroring figma exactly
    const centerIconSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="130" height="75" viewBox="0 0 130 75">
        <!-- Radial Expanding Pulse rings -->
        <circle cx="65" cy="22" r="21" fill="#f97316" fill-opacity="0.12"/>
        <circle cx="65" cy="22" r="12" fill="#f97316" fill-opacity="0.25"/>
        
        <!-- Pin Marker symbol -->
        <path d="M 65 8 C 58.5 8 53 13.5 53 20.2 C 53 29.2 65 38.2 65 38.2 C 65 38.2 77 29.2 77 20.2 C 77 13.5 71.5 8 65 8 Z" fill="#f97316" stroke="white" stroke-width="1.8"/>
        <circle cx="65" cy="20.2" r="3.5" fill="white"/>
        
        <!-- Styled orange-border dark badge below -->
        <rect x="15" y="44" width="100" height="23" rx="6" fill="#121214" stroke="#f97316" stroke-width="1.5"/>
        <text x="65" y="54" font-family="system-ui, sans-serif" font-weight="900" font-size="8" fill="white" text-anchor="middle" letter-spacing="0.5">Pacinos Eltham</text>
        <text x="65" y="62" font-family="system-ui, sans-serif" font-weight="900" font-size="6" fill="#f97316" text-anchor="middle" letter-spacing="0.5">Your Location</text>
      </svg>
    `;

    const restaurantMarker = new window.google.maps.Marker({
      position: userLocation,
      map: map,
      icon: {
        url: "data:image/svg+xml;utf-8," + encodeURIComponent(centerIconSvg),
        anchor: new window.google.maps.Point(65, 22),
      },
      title: "Pacinos Eltham",
    });

    // Generate dynamic routes around user location
    const relativeRoutes = generateRelativeRoutes(userLocation);

    const driverMarkers: any[] = [];
    relativeRoutes.forEach((route) => {
      // Draw road route vector polyline
      new window.google.maps.Polyline({
        path: route.nodes,
        geodesic: true,
        strokeColor: route.color,
        strokeOpacity: 0.85,
        strokeWeight: 4.5,
        map: map,
      });

      // High-Fidelity Numerated Driver Badge + Floating detail tag inside a single native SVG
      const markerSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="30" viewBox="0 0 140 30">
          <circle cx="15" cy="15" r="12" fill="${route.color}" stroke="white" stroke-width="2"/>
          <text x="15" y="19" font-family="system-ui, sans-serif" font-weight="900" font-size="11" fill="white" text-anchor="middle">${route.driverId}</text>
          <rect x="32" y="5" width="100" height="20" rx="6" fill="#0d0d0e" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <text x="82" y="18" font-family="system-ui, sans-serif" font-weight="900" font-size="8" fill="white" text-anchor="middle">
            <tspan fill="${route.status === "late" ? "#ef4444" : "#f97316"}">${route.timeLabel}</tspan>
            <tspan fill="#6b7280"> | </tspan>
            <tspan fill="#9ca3af">${route.distanceLabel}</tspan>
          </text>
        </svg>
      `;

      // Place driver marker
      const driverMarker = new window.google.maps.Marker({
        position: route.nodes[1],
        map: map,
        icon: {
          url: "data:image/svg+xml;utf-8," + encodeURIComponent(markerSvg),
          anchor: new window.google.maps.Point(15, 15),
        },
        title: `Driver ${route.driverId} - ${route.destinationName}`,
      });

      driverMarkers.push({
        route,
        marker: driverMarker,
        currentNodeIndex: 1,
        movingForward: true,
      });
    });
    driverMarkersRef.current = driverMarkers;

    // Live smooth panning GPS coordinate movement simulator
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

  // Map Navigation Functions
  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() + 1);
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() - 1);
    }
  };

  const centerOnUser = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.panTo(userLocation);
      mapRef.current.setZoom(14);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Deliveries Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Deliveries Management"
          subtitle="Track and manage your deliveries in real-time"
        />

        {/* Quick Period filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-2 ">
            {["Today", "Week", "Month", "Year"].map((period) => {
              const isActive = activePeriod === period;
              return (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`
                    px-4 py-2 rounded-lg text-sm tracking-wider transition cursor-pointer
                    ${
                      isActive
                        ? "bg-[#F9671A] text-white"
                        : "text-[#9CA3AF] bg-[#252527] hover:text-zinc-200"
                    }
                  `}
                >
                  {period}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => alert("Deliveries logs exported successfully.")}
            className="px-4 py-2.5 bg-[#F9671A] hover:bg-[#F9671A]/80 rounded-xl text-xs font-black uppercase tracking-wider text-white flex items-center justify-center space-x-1.5 transition shadow-md shadow-orange-500/10 cursor-pointer"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {DELIVERY_STATS.map((stat, idx) => {
          let Icon = Truck;

          if (stat.label.includes("Late")) {
            Icon = AlertTriangle;
          } else if (
            stat.label.includes("Time") ||
            stat.label.includes("Today")
          ) {
            Icon = Clock;
          } else if (stat.label.includes("Completed")) {
            Icon = CheckCircle2;
          }

          return (
            <MetricCard
              key={idx}
              card={{
                label: stat.label,
                value: stat.value,
                change: stat.change,
                positive: stat.isPositive,
                note: "vs last period",
                icon: <Icon size={18} />,
              }}
            />
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <Search className="h-4 w-4 text-zinc-550" />
        </span>
        <input
          type="text"
          placeholder="Search live order or driver by customer name, address, ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#252527] border border-zinc-800 rounded-2xl py-3.5 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-zinc-555 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Filter pills bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "LIVE", label: "LIVE (12)" },
            { id: "Preparing", label: "Preparing (5)" },
            { id: "Ready", label: "Ready (2)" },
            { id: "Out for Delivery", label: "Out for Delivery (12)" },
            { id: "Delivered", label: "Delivered (34)" },
            { id: "Late", label: "Late (3)" },
          ].map((pill) => {
            const isActive = activeFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id)}
                className={`
                  px-4.5 py-2 rounded-lg text-xs sm:text-base tracking-wider transition-all cursor-pointer border
                  ${
                    isActive
                      ? "bg-orange-500 border-orange-600 text-white"
                      : " border-[#626262] text-[#626262] hover:text-white"
                  }
                `}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Sync panel */}
        <div className="flex items-center gap-2.5 shrink-0 tracking-wider">
          <div className="flex items-center space-x-1.5 px-3 py-2 border border-[#626262] rounded-xl text-[#626262]">
            <Calendar className="h-3.5 w-3.5 text-[#626262]" />
            <span>Today, 15 Apr</span>
          </div>

          <button
            onClick={() => alert("Re-fetching live updates...")}
            className="flex items-center text-base space-x-1.5 px-3 py-2 bg-[#3B2012] hover:border-zinc-700 rounded-xl text-[#F9671A] transition cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            <span>Refresh Auto 10s</span>
          </button>
        </div>
      </div>

      {/* Main Map tracking split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Google Map Section */}
        <div className="lg:col-span-9 bg-[#121214] border border-[#343435] rounded-3xl overflow-hidden relative min-h-[580px] shadow-2xl flex flex-col justify-between">
          <div
            ref={mapContainerRef}
            className="absolute inset-0 z-0 bg-[#0d0d0e]"
          >
            {!isLoaded && !loadError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d0e] z-10 space-y-3">
                <RefreshCw className="h-8 w-8 text-orange-500 animate-spin" />
                <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">
                  Initializing Google Map to your location...
                </span>
              </div>
            )}

            {loadError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d0e] z-10 p-6 text-center space-y-3.5">
                <AlertTriangle className="h-10 w-10 text-rose-500" />
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">
                    Maps API Load Notice
                  </h4>
                  <p className="text-xs text-zinc-500 font-semibold max-w-xs mt-1.5">
                    Google Maps is active. Tracing coordinate overlays smoothly
                    next to your exact geographical browser location!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Map Legend */}
          <div className="relative z-10 p-5 flex justify-between items-start pointer-events-none w-full">
            <div className="bg-zinc-950/85 backdrop-blur-md border border-zinc-850 rounded-2xl p-4 space-y-2.5 pointer-events-auto shadow-xl max-w-[170px]">
              <span className="block text-[8px] font-black text-zinc-550 uppercase tracking-widest">
                Legend
              </span>
              <div className="space-y-1.5 text-[9px] font-black text-zinc-300 uppercase">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>On Time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span>At Risk (5-10 min)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Late / Overdue</span>
                </div>
                <div className="flex items-center space-x-2 flex-row leading-none">
                  <span className="text-orange-500 font-bold text-xs mr-1">
                    📍
                  </span>
                  <span>Restaurant</span>
                </div>
              </div>
            </div>

            {/* Traffic status overlay */}
            <div className="bg-zinc-950/85 backdrop-blur-md border border-zinc-850 rounded-2xl p-4 space-y-2.5 pointer-events-auto shadow-xl max-w-[170px]">
              <span className="block text-[8px] font-black text-zinc-550 uppercase tracking-widest">
                Traffic Condition
              </span>
              <div className="space-y-2 text-[9px] font-black text-zinc-300 uppercase">
                <div className="flex items-center justify-between space-x-4">
                  <span className="text-zinc-400">Low</span>
                  <span className="h-1.5 w-10 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <span className="text-zinc-400">Medium</span>
                  <span className="h-1.5 w-10 rounded-full bg-amber-500" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <span className="text-zinc-400">High</span>
                  <span className="h-1.5 w-10 rounded-full bg-rose-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="relative z-10 p-5 flex justify-between items-end pointer-events-none w-full">
            <div className="bg-black/85 backdrop-blur-md border border-zinc-850 rounded-xl px-4 py-2 pointer-events-auto text-[9px] font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>User GPS Active Location</span>
            </div>

            <div className="flex flex-col space-y-2 pointer-events-auto">
              <button
                onClick={zoomIn}
                className="h-9 w-9 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-850 transition cursor-pointer shadow-lg"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={zoomOut}
                className="h-9 w-9 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-850 transition cursor-pointer shadow-lg"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={centerOnUser}
                className="h-9 w-9 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/10 transition cursor-pointer"
              >
                <Navigation className="h-4 w-4 rotate-45" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Order Roster */}
        <div className="lg:col-span-3 border border-[#343435] rounded-3xl p-5 space-y-4 shadow-2xl min-h-[580px]">
          <div className="flex justify-between items-center pb-2 border-b border-[#343435]">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Live Order (12)
            </h3>

            <select className="bg-zinc-900 border border-[#343435] rounded-lg px-2 py-1 text-[9px] font-black text-zinc-400 uppercase tracking-widest outline-none">
              <option>Time Remaining</option>
              <option>Distance</option>
              <option>Late First</option>
            </select>
          </div>

          {/* Roster Cards list mapping screenshot perfectly */}
          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {LIVE_ORDERS.filter(
              (o) =>
                o.customerName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) || searchQuery === "",
            ).map((order) => {
              // Style caps by overdue state
              let capColor =
                "border-emerald-500/30 text-emerald-450 bg-emerald-500/5";
              if (order.timerState === "overdue") {
                capColor = "border-rose-500/30 text-rose-500 bg-rose-500/5";
              } else if (order.timerState === "warning") {
                capColor = "border-amber-500/30 text-amber-500 bg-amber-500/5";
              }

              return (
                <div
                  key={order.id}
                  className=" border border-[#343435] rounded-2xl p-5 space-y-4 hover:border-zinc-700/80 transition-all duration-300"
                >
                  {/* Header Row */}
                  <div className="flex justify-between items-center">
                    <span className="text-[#F9671A] text-base tracking-wider">
                      {order.id}
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          alert(`Calling ${order.customerName}...`)
                        }
                        className="flex items-center space-x-1 bg-[#3B2012] p-2 rounded-full text-[#F9671A] hover:text-[#ff7f3b] text-sm tracking-wider transition cursor-pointer"
                      >
                        <Phone className="h-3 w-3" />
                        <span>Call</span>
                      </button>

                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-black border ${capColor}`}
                      >
                        {order.timeLabel}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-white text-sm">
                        {order.customerName}
                      </h4>
                      <div className="flex items-center space-x-1 text-zinc-500 text-xs font-semibold mt-1">
                        <MapPin className="h-3.5 w-3.5 text-[#F9671A]/70 shrink-0" />
                        <span className="truncate max-w-37">
                          {order.address}
                        </span>
                      </div>
                    </div>
                    <span className="text-zinc-400 text-xs">
                      {order.price}
                    </span>
                  </div>

                  {/* Status & View Order */}
                  <div className="flex justify-between items-center pt-3 border-t border-zinc-900/60">
                    <span
                      className={`px-3 py-1 rounded-full text-xs tracking-wider border ${
                        order.status === "Out for Delivery"
                          ? "border-[#0E8013] text-[#0E8013] bg-[#0E80131A]"
                          : order.status === "Ready for Dispatch"
                            ? "border-[#D01616] text-[#D01616] bg-[#D016161A]"
                            : "border-[#D01616] text-[#D01616] bg-[#D016161A]"
                      }`}
                    >
                      {order.status === "Out for Delivery"
                        ? "OUT for Delivery"
                        : order.status === "Ready"
                          ? "Driver Assigned"
                          : "Ready for Dispatch"}
                    </span>

                    <button
                      onClick={() => alert(`Opening order ${order.id}...`)}
                      className="text-[#626262] hover:text-white text-xs border border-[#626262] rounded-full p-2 transition cursor-pointer"
                    >
                      View Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
