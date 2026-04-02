"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingBag, Plus, Minus, Info, Leaf, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductCatalog({ searchTerm = '' }: { searchTerm?: string }) {
    const { addToCart, cartItems, updateQuantity } = useCart();
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('todos');

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/supermarket/products?category=${category}`);
            const data = await res.json();
            setAllProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const products = searchTerm.trim()
        ? allProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : allProducts;

    const categories = [
        { id: 'todos', name: 'Todos' },
        { id: 'ofertas', name: 'Ofertas' },
        { id: 'frutas', name: 'Frutas' },
        { id: 'verduras', name: 'Verduras' },
        { id: 'bebidas', name: 'Bebidas' },
        { id: 'organicos', name: 'Orgánicos' },
        { id: 'snacks', name: 'Snacks' },
    ];

    return (
        <section className="py-20 bg-[#FDFDFD]" id="catalog">
            <div className="container mx-auto px-4">
                {/* Filter Bar */}
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                    {searchTerm.trim() ? (
                        <div className="flex items-center gap-3">
                            <Search size={18} className="text-emerald-600" />
                            <span className="font-bold text-slate-600">
                                Resultados para <span className="text-emerald-600">"{searchTerm}"</span>{' '}
                                <span className="text-slate-400 font-normal">({products.length} encontrados)</span>
                            </span>
                        </div>
                    ) : (
                        <span className="font-extrabold text-xl text-slate-800 uppercase tracking-tight">Catálogo</span>
                    )}

                    <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                                    category === cat.id 
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Catalog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array(10).fill(0).map((_, i) => (
                                <div key={i} className="bg-white rounded-[2rem] p-4 flex flex-col gap-4 animate-pulse border border-slate-100">
                                    <div className="aspect-square bg-slate-100 rounded-2xl w-full" />
                                    <div className="h-6 bg-slate-100 rounded-lg w-3/4" />
                                    <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="h-8 bg-slate-100 rounded-lg w-20" />
                                        <div className="h-10 bg-slate-100 rounded-lg w-10" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {!loading && products.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                            <Search size={40} />
                        </div>
                        <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">No se encontraron productos</p>
                    </div>
                )}
            </div>
        </section>
    );
}

function ProductCard({ product }: { product: any }) {
    const { addToCart, cartItems, updateQuantity } = useCart();
    const cartItem = cartItems.find(item => item.id === product.id && item.storeId === 'supermarket');
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 relative overflow-hidden"
        >
            {/* Tag Orgánico */}
            {product.organic && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full flex items-center gap-1 text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                    <Leaf size={12} fill="currentColor" />
                    <span>Orgánico</span>
                </div>
            )}

            {/* Tag Oferta */}
            {product.oldPrice && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-orange-500 text-white rounded-full flex items-center gap-1 text-[10px] font-black uppercase tracking-widest shadow-lg">
                    <span>Oferta</span>
                </div>
            )}

            {/* Image Section */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-4">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Action Hover Overlay */}
                <div className={`absolute inset-0 bg-emerald-900/10 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-xl hover:scale-110 transition-transform">
                        <Info size={24} />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-emerald-600">{product.category}</span>
                <h3 className="font-extrabold text-slate-800 text-lg leading-tight group-hover:text-emerald-600 transition-colors uppercase line-clamp-1">{product.name}</h3>
                <p className="text-slate-400 text-xs font-semibold line-clamp-1 italic">{product.description}</p>
                
                <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-slate-800">${product.price.toFixed(2)}</span>
                            {product.oldPrice && (
                                <span className="text-xs text-slate-400 line-through font-bold">${product.oldPrice.toFixed(2)}</span>
                            )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">por {product.unit}</span>
                    </div>

                    {cartItem ? (
                        <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1 px-2 border border-slate-100">
                            <button 
                                onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors"
                            >
                                <Minus size={16} strokeWidth={3} />
                            </button>
                            <span className="font-black text-emerald-600 text-sm w-4 text-center">{cartItem.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors"
                            >
                                <Plus size={16} strokeWidth={3} />
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                storeId: 'supermarket'
                            })}
                            className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-110 transition-all active:scale-95"
                        >
                            <ShoppingBag size={20} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
