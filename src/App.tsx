import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import { Product, CartItem } from './types';
import { mockProducts } from './data/mockProducts';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Filter } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  
  // Load products (Mock or Google Sheets)
  useEffect(() => {
    const fetchProducts = async () => {
      const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL;
      
      if (!sheetUrl) {
        setProducts(mockProducts);
        setIsLoading(false);
        return;
      }
      
      try {
        Papa.parse(sheetUrl, {
          download: true,
          header: true,
          complete: (results) => {
            const parsedProducts: Product[] = results.data
              .filter((row: any) => row.id && row.name) // Filter empty rows
              .map((row: any) => ({
                id: row.id,
                name: row.name,
                price: parseInt(row.price || '0', 10),
                category: row.category || 'Lainnya',
                image: row.image || '',
                sold: parseInt(row.sold || '0', 10),
                rating: parseFloat(row.rating || '0'),
                description: row.description || ''
              }));
            setProducts(parsedProducts.length > 0 ? parsedProducts : mockProducts);
            setIsLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setProducts(mockProducts);
            setIsLoading(false);
          }
        });
      } catch (e) {
        console.error("Failed to fetch Google Sheet:", e);
        setProducts(mockProducts);
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Cart operations
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };
  
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const clearCart = () => setCartItems([]);

  // Categories extraction and filtering
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['Semua', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header 
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="container mx-auto px-4 py-6 md:py-8">
          
          {/* Categories / Filter */}
          <div className="bg-white p-3 md:p-4 rounded-sm shadow-sm border mb-6 flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex items-center text-gray-700 font-medium">
              <Filter size={18} className="mr-2" />
              <span>Kategori:</span>
            </div>
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 hide-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-blue-800 text-white border-blue-800' 
                      : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-sm border">
              <p className="text-gray-500 text-lg">Tidak ada perlengkapan yang sesuai dengan pencarian Anda.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('Semua')}}
                className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-sm hover:bg-blue-900"
              >
                Tampilkan Semua Produk
              </button>
            </div>
          )}
          
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-lg font-bold text-blue-900 mb-4">🥋 Snaza Sport</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Platform marketplace perlengkapan beladiri terbaik. 
                Penyedia perlengkapan Karate, Taekwondo, Pencak Silat, dan lainnya dengan harga terjangkau.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Pembayaran Aman</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-sm">BCA</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-sm">Mandiri</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-sm">QRIS</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-800 text-xs font-semibold rounded-sm">COD</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Pengiriman</h3>
              <p className="text-sm text-gray-500 mb-2">Seluruh platform kurir major di Indonesia didukung melalui koordinasi Admin WhatsApp kami.</p>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Snaza Sport. All rights reserved.
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
      />
    </div>
  );
}
