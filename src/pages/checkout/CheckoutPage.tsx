
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { useCart } from '../../context/CartContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CheckoutFormValues {
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

const CheckoutPage = () => {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      paymentMethod: 'card',
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    setIsLoading(true);
    
    // In a real app, we'd save the form data to context or storage
    // For now, we'll just simulate a delay and navigate
    setTimeout(() => {
      // Store form data in session storage for the next page
      sessionStorage.setItem('checkoutData', JSON.stringify(data));
      setIsLoading(false);
      navigate('/checkout/confirm');
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 pt-32 pb-16">
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Please add items to your cart before proceeding to checkout.</p>
            <Link 
              to="/products" 
              className="inline-block px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 pt-32 pb-16">
        <Link to="/cart" className="inline-flex items-center text-sm hover:underline mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Cart
        </Link>
        
        <h1 className="text-3xl font-medium mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-medium mb-6">Shipping Details</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      rules={{ required: "First name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      rules={{ required: "Last name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{ 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      rules={{ required: "State is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      rules={{ required: "ZIP code is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="country"
                    rules={{ required: "Country is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-medium mb-6">Payment Method</h2>
                    
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="card">Credit Card</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                              <SelectItem value="applepay">Apple Pay</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {form.watch('paymentMethod') === 'card' && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-500">
                          Payment details will be collected on the next screen.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-6">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Processing..." : "Continue to Review"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-sm">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-300 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
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
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
