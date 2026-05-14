import React from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export function Header({ cartItemCount, onOpenCart, searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-blue-800 text-white shadow-md border-b-4 border-red-600">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1">
              <Menu size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">🥋 Snaza Sport</h1>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
            <input 
              type="text" 
              placeholder="Cari perlengkapan beladiri (Karate, Taekwondo, dll)..." 
              className="w-full px-4 py-2.5 text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-1 top-1 bottom-1 px-4 bg-red-600 text-white rounded-sm hover:bg-red-700 transition-colors">
              <Search size={18} />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2" 
              onClick={onOpenCart}
              aria-label="Keranjang"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 border-2 border-blue-800 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Search - shown on second row */}
        <div className="pb-3 md:hidden relative">
          <input 
            type="text" 
            placeholder="Cari perlengkapan..." 
            className="w-full px-3 py-2 text-gray-900 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-1 top-1 bottom-4 px-3 bg-red-600 text-white rounded-sm mt-0.5 mb-2.5 hover:bg-red-700 transition-colors">
            <Search size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
