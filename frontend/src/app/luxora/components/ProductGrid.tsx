"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Plus, Check } from 'lucide-react';

export default function ProductGrid({ onSelectProduct }: { onSelectProduct: (product: any) => void }) {
    const { addToCart, cartItems } = useCart();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/luxora/products');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching luxury products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const isInCart = (id: string) => cartItems.some(item => item.id === id);

    return (
        <section className="py-32 bg-black" id="products">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 pb-12 border-b border-white/5">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold/60">Featured Pieces</span>
                        <h2 className="font-lx-serif text-5xl md:text-7xl font-light text-white uppercase tracking-wider">The Collection</h2>
                    </div>
                    <p className="text-white/20 font-light max-w-sm tracking-[0.1em] text-sm uppercase leading-loose">
                        Only the most exceptional creations earn a place in our permanent collection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {loading ? (
                        Array(8).fill(0).map((_, i) => (
                            <div key={i} className="flex flex-col gap-6 animate-pulse">
                                <div className="aspect-[4/5] bg-white/5 rounded-sm" />
                                <div className="h-4 bg-white/5 w-2/3" />
                                <div className="h-4 bg-white/5 w-1/3" />
                            </div>
                        ))
                    ) : (
                        products.map((product, i) => (
                            <motion.div 
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="group flex flex-col gap-8 cursor-pointer"
                                onClick={() => onSelectProduct(product)}
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.02]">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover lux-img-hover opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    
                                    {/* Action Reveal */}
                                    <div className="absolute bottom-6 right-6 flex flex-col gap-3 items-end overflow-hidden">
                                        <div 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    image: product.image,
                                                    storeId: 'luxora'
                                                });
                                            }}
                                            className="flex items-center gap-3 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out font-bold uppercase text-[9px] tracking-[0.4em] text-white hover:text-gold"
                                        >
                                            <span>{isInCart(product.id) ? 'In Cart' : 'Add to Cart'}</span>
                                            <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center ${isInCart(product.id) ? 'bg-gold border-gold' : ''}`}>
                                                {isInCart(product.id) ? <Check size={14} className="text-black" /> : <Plus size={14} strokeWidth={1} />}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700 delay-75 ease-out font-bold uppercase text-[9px] tracking-[0.4em] text-white/60">
                                            <span>View Details</span>
                                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                                                <Plus size={14} strokeWidth={1} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 text-center md:text-left">
                                    <span className="text-[9px] uppercase font-bold tracking-[0.4em] text-gold/60">{product.category}</span>
                                    <h3 className="font-lx-serif text-2xl font-light text-white group-hover:text-gold transition-colors duration-500 uppercase tracking-widest leading-none">
                                        {product.name}
                                    </h3>
                                    <span className="text-sm font-light text-white/30 tracking-widest mt-1">
                                        ${product.price.toLocaleString()}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
