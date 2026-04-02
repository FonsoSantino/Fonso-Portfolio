'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Trash2, X, ArrowRight } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose,
  onCheckout
}: { 
  isOpen: boolean, 
  onClose: () => void,
  onCheckout: () => void
}) {
  const { cartItems, removeFromCart, getCartTotal, getCartCount } = useCart();
  
  const storeItems = cartItems.filter(item => item.storeId === 'forestal');
  const count = getCartCount('forestal');
  const total = getCartTotal('forestal');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] overflow-hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-screen max-w-md flex flex-col bg-white shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Mi Presupuesto</h2>
              <span className="px-2 py-0.5 bg-[#367C2B] text-white text-[10px] font-bold rounded-full">{count}</span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            {storeItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Trash2 size={32} />
                </div>
                <p className="font-bold uppercase tracking-widest text-sm">Su lista está vacía</p>
                <p className="text-xs mt-2">Añada productos para solicitar una cotización.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {storeItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-xs text-[#367C2B] font-bold mt-1">US$ {item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-500 font-medium">Cant: {item.quantity}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Estimado</span>
              <span className="text-2xl font-black text-[#367C2B]">US$ {total.toLocaleString()}</span>
            </div>
            
            <button 
              disabled={storeItems.length === 0}
              onClick={onCheckout}
              className="w-full py-5 bg-[#367C2B] text-white font-bold text-lg hover:bg-[#2d6624] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-[#367C2B]/20"
            >
              FINALIZAR COMPRA
              <ArrowRight size={20} />
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-4 uppercase font-bold tracking-widest">
              Un asesor se contactará en menos de 24hs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
