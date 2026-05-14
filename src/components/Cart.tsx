import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah, generateWhatsAppLink } from '../lib/utils';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export function Cart({ isOpen, onClose, items, updateQuantity, removeItem, clearCart }: CartProps) {
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', payment: 'Transfer Bank BCA' });

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    // Fallback number in case env var isn't set
    const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890';
    const checkoutUrl = generateWhatsAppLink(waNumber, items, customer);
    
    window.open(checkoutUrl, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Cart Drawer */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-gray-50 z-50 shadow-xl flex flex-col transform transition-transform duration-300 translate-x-0">
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <h2 className="text-lg font-bold flex items-center text-gray-800">
            <ShoppingBag className="mr-2 text-blue-800" /> Keranjang Belanja
          </h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
              <ShoppingBag size={64} className="text-gray-300" />
              <p>Keranjang kamu masih kosong.</p>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-sm text-sm"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Product List */}
              <div className="bg-white rounded-sm border p-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-sm border" />
                    <div className="flex-1 flex flex-col">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{item.name}</h4>
                      <div className="text-red-600 font-bold text-sm mb-2">{formatRupiah(item.price)}</div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Form */}
              <div className="bg-white rounded-sm border p-4 space-y-3">
                <h3 className="font-bold text-gray-800 text-sm border-b pb-2">Informasi Pengiriman</h3>
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input 
                      required
                      type="text" 
                      value={customer.name}
                      onChange={e => setCustomer({...customer, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                      placeholder="Contoh: Budi Santoso"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                    <input 
                      required
                      type="tel" 
                      value={customer.phone}
                      onChange={e => setCustomer({...customer, phone: e.target.value})}
                      className="w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                      placeholder="Contoh: 081234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Alamat Lengkap (Beserta Kodepos)</label>
                    <textarea 
                      required
                      value={customer.address}
                      onChange={e => setCustomer({...customer, address: e.target.value})}
                      className="w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[60px]" 
                      placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota, Kodepos"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Pilihan Pembayaran</label>
                    <select 
                      value={customer.payment}
                      onChange={e => setCustomer({...customer, payment: e.target.value})}
                      className="w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                      <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                      <option value="QRIS">QRIS</option>
                      <option value="COD (Bayar di Tempat)">COD (Bayar di Tempat)</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-gray-600 text-sm">Total Belanja:</span>
              <span className="text-lg font-bold text-red-600">{formatRupiah(total)}</span>
            </div>
            <button 
              type="submit"
              form="checkout-form"
              className="w-full bg-blue-800 text-white font-bold py-3 rounded-sm hover:bg-blue-900 transition-colors"
            >
              Checkout via WhatsApp
            </button>
            <p className="text-[10px] text-gray-500 text-center">Pesanan akan diteruskan ke WhatsApp Admin</p>
          </div>
        )}
      </div>
    </>
  );
}
