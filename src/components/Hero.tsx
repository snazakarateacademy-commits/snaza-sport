import React from 'react';

export function Hero() {
  return (
    <div className="bg-white pb-4">
      <div className="container mx-auto px-0 md:px-4 mt-0 md:mt-4">
        <div className="relative w-full h-40 md:h-64 lg:h-80 md:rounded-lg overflow-hidden bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60"
            alt="Perlengkapan Beladiri"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-wide uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Snaza Sport
            </h2>
            <p className="text-white text-sm md:text-lg max-w-lg mb-4 hidden md:block" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              Marketplace perlengkapan beladiri modern & terlengkap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
