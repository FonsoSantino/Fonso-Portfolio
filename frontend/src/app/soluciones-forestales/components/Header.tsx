'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { getCartCount } = useCart();
  const count = getCartCount('forestal');

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/soluciones-forestales" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#367C2B] flex items-center justify-center rounded-sm group-hover:bg-[#2d6624] transition-colors">
            <span className="text-white font-bold text-xl">SF</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-tight text-[#367C2B]">SOLUCIONES</span>
            <span className="font-medium text-xs tracking-widest text-gray-500 -mt-1 uppercase">Forestales</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-semibold text-gray-700 hover:text-[#367C2B] transition-colors uppercase">PRODUCTOS</button>
          <button onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-semibold text-gray-700 hover:text-[#367C2B] transition-colors uppercase">SERVICIOS</button>
          <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-semibold text-gray-700 hover:text-[#367C2B] transition-colors uppercase">CONTACTO</button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden sm:flex items-center gap-2 px-4 py-2 border-2 border-[#367C2B] text-[#367C2B] font-bold text-sm hover:bg-[#367C2B] hover:text-white transition-all"
          >
            <Phone size={16} />
            SOLICITAR ASESOR
          </button>
          
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-gray-700 hover:text-[#367C2B] transition-colors"
          >
            <ShoppingCart size={24} />
            {count > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#FFDE00] text-gray-900 text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                {count}
              </span>
            )}
          </button>
          
          <button className="md:hidden p-2 text-gray-700">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
