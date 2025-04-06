
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
}

const ConfirmOrderPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Retrieve checkout data from session storage
    const storedData = sessionStorage.getItem('checkoutData');
    
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    } else {
      // If no data, redirect back to checkout
      navigate('/checkout');
    }
  }, [navigate]);

  const handlePlaceOrder = () => {
    setIsLoading(true);
    
    // In a real app, we'd submit the order to a backend
    // For now, we'll just simulate a delay and navigate
    setTimeout(() => {
      // Generate a random order number
      const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      sessionStorage.setItem('orderNumber', orderNumber);
      
      // Clear cart and checkout data
      clearCart();
      setIsLoading(false);
      navigate('/checkout/success');
    }, 1500);
  };

  if (!checkoutData) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 pt-32 pb-16">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading order details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 pt-32 pb-16">
        <Link to="/checkout" className="inline-flex items-center text-sm hover:underline mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Shipping Details
        </Link>
        
        <h1 className="text-3xl font-medium mb-8">Review Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p>{checkoutData.firstName} {checkoutData.lastName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p>{checkoutData.email}</p>
                  <p>{checkoutData.phone}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">Address</p>
                <p>{checkoutData.address}</p>
                <p>{checkoutData.city}, {checkoutData.state} {checkoutData.zipCode}</p>
                <p>{checkoutData.country === 'US' ? 'United States' : 
                   checkoutData.country === 'CA' ? 'Canada' :
                   checkoutData.country === 'UK' ? 'United Kingdom' : 'Australia'}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Payment Method</h2>
              
              <div>
                <p>
                  {checkoutData.paymentMethod === 'card' ? 'Credit Card' : 
                   checkoutData.paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}
                </p>
                
                {checkoutData.paymentMethod === 'card' && (
                  <p className="text-sm text-gray-500 mt-2">
                    You'll be prompted to enter your card details after placing the order.
                  </p>
                )}
              </div>
            </div>
            
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Items in Your Order</h2>
              
              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Items ({items.reduce((acc, item) => acc + item.quantity, 0)})</span>
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
              
              <Button 
                className="w-full" 
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Place Order"}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConfirmOrderPage;
