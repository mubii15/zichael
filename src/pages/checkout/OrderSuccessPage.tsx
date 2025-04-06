
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const OrderSuccessPage = () => {
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve order number from session storage
    const storedOrderNumber = sessionStorage.getItem('orderNumber');
    setOrderNumber(storedOrderNumber);

    // Clean up session storage
    sessionStorage.removeItem('checkoutData');
    
    // Animation
    const timeline = gsap.timeline();
    
    timeline.fromTo(
      ".success-icon",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
    
    timeline.fromTo(
      ".success-text",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }
    );
    
    timeline.fromTo(
      ".success-details",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 }
    );
    
    timeline.fromTo(
      ".success-button",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }
    );
    
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-6 pt-32 pb-32">
        <div className="max-w-lg mx-auto text-center">
          <div className="success-icon flex justify-center items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={48} className="text-green-600" />
            </div>
          </div>
          
          <h1 className="success-text text-3xl font-medium mb-4">Thank You for Your Order!</h1>
          
          <p className="success-text text-gray-600 mb-8">
            Your order has been received and will be processed soon. We've sent a confirmation email with all the details.
          </p>
          
          {orderNumber && (
            <div className="success-details bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-sm text-gray-500 mb-2">Order Number</p>
              <p className="text-xl font-medium">{orderNumber}</p>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
            <Button asChild className="success-button">
              <Link to="/products">
                <ShoppingBag size={18} className="mr-2" />
                Continue Shopping
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="success-button">
              <Link to="/account">View My Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccessPage;
