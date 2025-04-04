
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash, ArrowLeft, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const cartHeaderRef = useRef<HTMLDivElement>(null);
  const cartItemsRef = useRef<HTMLDivElement>(null);
  const cartSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animations
    if (cartHeaderRef.current && cartItemsRef.current && cartSummaryRef.current) {
      const timeline = gsap.timeline();
      
      timeline.fromTo(
        cartHeaderRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
      
      if (items.length > 0) {
        timeline.fromTo(
          cartItemsRef.current.querySelectorAll('.cart-item'),
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4, 
            stagger: 0.1,
            ease: "power3.out" 
          },
          "-=0.2"
        );
      }
      
      timeline.fromTo(
        cartSummaryRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
    }
  }, [items.length]);

  return (
    <MainLayout>
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div ref={cartHeaderRef}>
          <Link to="/" className="inline-flex items-center text-sm hover:underline mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
          
          <h1 className="text-3xl font-medium mb-8">Your Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6 flex justify-center">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-medium mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/" 
              className="inline-block px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div ref={cartItemsRef} className="border-t border-gray-200">
                {items.map(item => (
                  <div 
                    key={item.id} 
                    className="cart-item py-6 border-b border-gray-200 flex flex-col sm:flex-row gap-6"
                  >
                    <div className="w-full sm:w-24 h-32 bg-gray-50 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between mb-2">
                        <Link to={`/products/${item.id}`} className="text-lg font-medium hover:underline">
                          {item.name}
                        </Link>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <div className="text-sm mb-4">${item.price.toFixed(2)}</div>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center border border-gray-300 w-24">
                          <button 
                            className="px-2 py-1" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <div className="flex-1 text-center">{item.quantity}</div>
                          <button 
                            className="px-2 py-1" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div 
                ref={cartSummaryRef} 
                className="bg-gray-50 p-6 sticky top-24"
              >
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
