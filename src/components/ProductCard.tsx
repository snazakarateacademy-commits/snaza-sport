import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../lib/utils';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white group rounded-sm border border-gray-200 shadow-sm hover:border-red-500 hover:shadow-md transition-all flex flex-col h-full overflow-hidden relative">
      <div className="absolute top-2 left-2 z-10">
        <span className="bg-red-600 text-white text-[10px] md:text-xs px-2 py-1 rounded-sm font-semibold uppercase tracking-wider">
          {product.category}
        </span>
      </div>
      
      <div className="aspect-square w-full relative overflow-hidden bg-gray-100">
        <img 
          src={product.image || "https://images.unsplash.com/photo-1590509650487-7389c922dfb4?w=500&auto=format&fit=crop"} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-2 md:p-3 flex flex-col flex-grow">
        <h3 className="text-xs md:text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] md:min-h-[40px] mb-1">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <div className="text-red-600 font-bold text-sm md:text-base mb-1 md:mb-2">
            {formatRupiah(product.price)}
          </div>
          
          <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-500 mb-2 md:mb-3">
            <div className="flex items-center text-yellow-500">
              <Star size={10} className="fill-current" />
              <span className="ml-1 text-gray-600">{product.rating}</span>
            </div>
            <span>{product.sold.toLocaleString()} Terjual</span>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full py-1.5 md:py-2 bg-blue-800 text-white hover:bg-blue-900 text-xs md:text-sm font-medium rounded-sm flex items-center justify-center transition-colors shadow-sm"
          >
            <ShoppingCart size={14} className="mr-1.5" />
            Beli
          </button>
        </div>
      </div>
    </div>
  );
}
