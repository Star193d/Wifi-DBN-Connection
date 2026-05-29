import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

const COVERAGE_ZONES = [
  { id: 1, center: [-29.8587, 31.0218], radius: 3000, name: "Durban Central & Morningside" }, // Durban center
  { id: 2, center: [-29.7345, 31.0664], radius: 4000, name: "Umhlanga & La Lucia" },
  { id: 3, center: [-29.8249, 30.9318], radius: 3500, name: "Westville" },
];

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface CoverageMapProps {
  variants?: any;
}

export default function CoverageMap({ variants }: CoverageMapProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([-29.8587, 31.0218]); // Durban default
  const [zoom, setZoom] = useState(11);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, integrate with Google Geocoding API or Nominatim here.
    alert(`Searching for coverage at: ${searchQuery}. (Geocoding implementation needed)`);
  };

  return (
    <motion.section 
      id="coverage" 
      variants={variants}
      className="col-span-1 md:col-span-12 lg:col-span-4 bg-[var(--color-accent)] bento-item-dark p-6 lg:p-8 text-white relative overflow-hidden flex flex-col min-h-[500px]"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold">Coverage Map</h3>
        <span className="text-xs bg-green-500 px-2 py-1 rounded text-white font-bold tracking-widest">ACTIVE</span>
      </div>
      
      <p className="text-sm text-slate-300 mb-6 font-medium">
        We are rapidly expanding our high-speed network across Durban. Search your address or explore the map to see if you're in our live zones.
      </p>

      <form onSubmit={handleSearch} className="mb-6 relative z-20">
        <div className="relative flex items-center">
          <input
            type="text"
            id="address-search"
            placeholder="e.g. 10 Florida Rd"
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white/20 outline-none transition-colors text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-2 p-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-red-700 transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>
      
      <div className="flex-1 w-full rounded-xl overflow-hidden shadow-lg border border-white/10 relative">
        {typeof window !== 'undefined' && (
          <MapContainer 
            center={mapCenter} 
            zoom={zoom} 
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", zIndex: 1 }}
          >
            <ChangeView center={mapCenter} zoom={zoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {COVERAGE_ZONES.map((zone) => (
              <Circle 
                key={zone.id}
                center={zone.center as [number, number]} 
                pathOptions={{ color: 'var(--color-primary)', fillColor: 'var(--color-primary)', fillOpacity: 0.2 }} 
                radius={zone.radius}
                stroke={true}
                weight={2}
              >
                <Popup>
                  <div className="font-bold text-[var(--color-accent)]">{zone.name}</div>
                  <div className="text-sm text-gray-600">Great coverage available.</div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Signal Strength</span>
          <span className="font-mono text-white">98% Optimal</span>
        </div>
        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div className="bg-[var(--color-primary)] h-full w-[98%] rounded-full shadow-[0_0_10px_#D32F2F]"></div>
        </div>
      </div>
    </motion.section>
  );
}
