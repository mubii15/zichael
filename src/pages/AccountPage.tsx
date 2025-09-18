import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://zichael.com/api/users.php';

const AccountPage = () => {
  const { currentUser, login, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    username: ''
  });
  
  // Initialize form data with current user info
  useEffect(() => {
    if (currentUser) {
      setFormData({
        full_name: currentUser.full_name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        city: currentUser.city || '',
        state: currentUser.state || '',
        country: currentUser.country || '',
        username: currentUser.username || ''
      });
    }
  }, [currentUser]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}?action=update`, {
        user_id: currentUser.id,
        ...formData
      });
      
      if (response.data && response.data.success) {
        toast({
          title: "Profile Updated",
          description: "Your account information has been successfully updated.",
        });
        
        // Update the user context with new data
        login({
          ...currentUser,
          ...formData
        });
        
        setIsEditing(false);
      } else {
        toast({
          title: "Error",
          description: response.data?.error || "Failed to update profile",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Update profile error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Call your API to clear the server session if needed
      // For PHP sessions, this might not be necessary as the session
      // will naturally expire, but you can add a logout endpoint if desired
      
      // Clear client-side authentication
      logout();
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!currentUser) {
    return (
      <MainLayout>
        <div className="pt-28 pb-16 px-6">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-8">My Account</h1>
            <p className="text-lg mb-6">Please log in to view your account information.</p>
            <a href="/login" className="btn-primary inline-block">
              Login
            </a>
          </div>
        </div>
      </MainLayout>
    );
  }

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
                  <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="block text-sm text-gray-600 hover:text-black disabled:opacity-50"
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
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
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="full_name" className="block text-sm font-medium mb-2">Full Name</label>
                        <input 
                          type="text" 
                          id="full_name" 
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-input bg-background"
                          required
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
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
                        <input 
                          type="text" 
                          id="username" 
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-input bg-background"
                          required
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
                      <button 
                        type="submit" 
                        className="btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving Changes...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Full Name</h3>
                        <p>{formData.full_name || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Email</h3>
                        <p>{formData.email || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Username</h3>
                        <p>{formData.username || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Phone</h3>
                        <p>{formData.phone || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Address</h3>
                        <p>{formData.address || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">City</h3>
                        <p>{formData.city || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">State/Province</h3>
                        <p>{formData.state || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Country</h3>
                        <p>{formData.country || 'Not provided'}</p>
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