"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    storeId: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: (storeId?: string) => number;
    getCartCount: (storeId?: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Simple persistence (per session or localStorage)
    useEffect(() => {
        const savedCart = localStorage.getItem('fonso_dev_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to load cart", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('fonso_dev_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === newItem.id);
            if (existing) {
                return prev.map(item => 
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(itemId);
            return;
        }
        setCartItems(prev => prev.map(item => 
            item.id === itemId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = (storeId?: string) => {
        const items = storeId ? cartItems.filter(i => i.storeId === storeId) : cartItems;
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = (storeId?: string) => {
        const items = storeId ? cartItems.filter(i => i.storeId === storeId) : cartItems;
        return items.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
