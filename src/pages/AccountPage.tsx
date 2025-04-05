
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';

const AccountPage = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });
  
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update success
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your account information has been successfully updated.",
      });
      setIsEditing(false);
    }, 500);
  };

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-12">My Account</h1>
          
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Account Navigation</h2>
                <nav className="space-y-2">
                  <a href="#profile" className="block text-sm font-medium">Profile Information</a>
                  <a href="#orders" className="block text-sm text-gray-600 hover:text-black">Order History</a>
                  <a href="#addresses" className="block text-sm text-gray-600 hover:text-black">Saved Addresses</a>
                  <a href="#password" className="block text-sm text-gray-600 hover:text-black">Change Password</a>
                </nav>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <div id="profile" className="p-6 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Profile Information</h2>
                  <button 
                    className="text-sm underline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-input bg-background"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-input bg-background"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                        <input 
                          type="text" 
                          id="phone" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-input bg-background"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
                        <input 
                          type="text" 
                          id="address" 
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-input bg-background"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
                        <input 
                          type="text" 
                          id="city" 
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-input bg-background"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-2">State/Province</label>
                        <input 
                          type="text" 
                          id="state" 
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-input bg-background"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-2">ZIP/Postal Code</label>
                        <input 
                          type="text" 
                          id="zipCode" 
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-input bg-background"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium mb-2">Country</label>
                        <input 
                          type="text" 
                          id="country" 
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-input bg-background"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Full Name</h3>
                        <p>{formData.name}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Email</h3>
                        <p>{formData.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Phone</h3>
                        <p>{formData.phone}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Address</h3>
                        <p>{formData.address}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">City</h3>
                        <p>{formData.city}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">State/Province</h3>
                        <p>{formData.state}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">ZIP/Postal Code</h3>
                        <p>{formData.zipCode}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Country</h3>
                        <p>{formData.country}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountPage;
