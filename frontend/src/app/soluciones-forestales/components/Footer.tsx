'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#367C2B] flex items-center justify-center rounded-sm">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-tight text-[#367C2B]">SOLUCIONES</span>
              <span className="font-medium text-[10px] tracking-widest text-gray-400 uppercase">Forestales</span>
            </div>
          </div>
          
          <div className="flex gap-8 text-xs font-bold text-gray-400 tracking-widest uppercase">
            <Link href="#" className="hover:text-[#367C2B] transition-colors">Términos</Link>
            <Link href="#" className="hover:text-[#367C2B] transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-[#367C2B] transition-colors">Cookies</Link>
          </div>
          
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            © {new Date().getFullYear()} Soluciones Forestales S.A.
          </div>
        </div>
      </div>
    </footer>
  );
}
