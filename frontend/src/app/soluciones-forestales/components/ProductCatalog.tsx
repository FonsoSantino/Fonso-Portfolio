'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string; // Changed to string to match global cart pattern
  name: string;
  category: string;
  subCategory: string;
  price: number;
  description: string;
  image: string;
  specs: string[];
}

export default function ProductCatalog({ onOpenQuote }: { onOpenQuote: (product: any) => void }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('heavy-machinery');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/soluciones-forestales/products?category=${activeCategory}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory]);

  return (
    <section id="productos" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-1 bg-[#367C2B]"></div>
              <span className="text-[#367C2B] font-bold uppercase tracking-widest text-sm">NUESTRO CATÁLOGO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">MÁQUINAS QUE <br /> <span className="text-[#367C2B]">CONSTRUYEN FUTURO</span></h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex bg-white p-1 shadow-md border border-gray-100 rounded-sm"
          >
            <button 
              onClick={() => setActiveCategory('heavy-machinery')}
              className={`px-6 py-3 text-sm font-bold transition-all ${activeCategory === 'heavy-machinery' ? 'bg-[#367C2B] text-white' : 'text-gray-500 hover:text-[#367C2B]'}`}
            >
              MAQUINARIA PESADA
            </button>
            <button 
              onClick={() => setActiveCategory('manual-tools')}
              className={`px-6 py-3 text-sm font-bold transition-all ${activeCategory === 'manual-tools' ? 'bg-[#367C2B] text-white' : 'text-gray-500 hover:text-[#367C2B]'}`}
            >
              HERRAMIENTAS MANUALES
            </button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white aspect-[4/5] animate-pulse rounded-sm"></div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#FFDE00] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-900 border border-white/50">
                      {product.subCategory}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="p-3 bg-white text-[#367C2B] hover:bg-[#367C2B] hover:text-white transition-colors"
                      >
                        <Eye size={20} />
                      </button>
                      <button 
                        onClick={() => {
                          if (activeCategory === 'heavy-machinery') {
                            onOpenQuote(product);
                          } else {
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              storeId: 'forestal'
                            });
                          }
                        }}
                        className="p-3 bg-[#FFDE00] text-gray-900 hover:bg-[#eacb00] transition-colors"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">{product.description}</p>
                    
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
                      <span className="text-2xl font-black text-[#367C2B]">US$ {product.price.toLocaleString()}</span>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="text-xs font-bold text-gray-400 hover:text-[#367C2B] tracking-widest uppercase transition-colors"
                      >
                        {activeCategory === 'heavy-machinery' ? 'SOLICITAR COTIZACIÓN' : 'VER DETALLES'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" 
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative" 
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-red-500 hover:text-white transition-colors">
                <span className="text-2xl leading-none">&times;</span>
              </button>
              
              <div className="md:w-1/2 aspect-square md:aspect-auto">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                <span className="text-xs font-bold text-[#367C2B] uppercase tracking-[0.2em] mb-4">{selectedProduct.subCategory}</span>
                <h2 className="text-3xl font-black text-gray-900 mb-6">{selectedProduct.name}</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">{selectedProduct.description}</p>
                
                <div className="mb-10">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">ESPECIFICACIONES</h4>
                  <div className="space-y-3">
                    {selectedProduct.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <Check size={16} className="text-[#367C2B]" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">PRECIO ESTIMADO</span>
                    <span className="text-3xl font-black text-[#367C2B]">US$ {selectedProduct.price.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (activeCategory === 'heavy-machinery') {
                        onOpenQuote(selectedProduct);
                      } else {
                        addToCart({
                          id: selectedProduct.id,
                          name: selectedProduct.name,
                          price: selectedProduct.price,
                          image: selectedProduct.image,
                          storeId: 'forestal'
                        });
                      }
                      setSelectedProduct(null);
                    }}
                    className="w-full py-5 bg-[#367C2B] text-white font-bold text-lg hover:bg-[#2d6624] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#367C2B]/20"
                  >
                    <ShoppingCart size={20} />
                    {activeCategory === 'heavy-machinery' ? 'SOLICITAR COTIZACIÓN' : 'AÑADIR AL CARRITO'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
