
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Users, ShoppingBag, Box, BarChart } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for dashboard
  const dashboardStats = {
    totalUsers: 153,
    totalOrders: 87,
    totalProducts: 42,
    revenue: 15675.45
  };

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 md:mb-0">Admin Dashboard</h1>
            
            <div className="flex space-x-4">
              <Link to="/admin/products/new" className="btn-primary">
                Add New Product
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Users size={24} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{dashboardStats.totalUsers}</h3>
                  <p className="text-sm text-gray-500">Total Users</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-green-50 p-3 rounded-full">
                  <ShoppingBag size={24} className="text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{dashboardStats.totalOrders}</h3>
                  <p className="text-sm text-gray-500">Total Orders</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-50 p-3 rounded-full">
                  <Box size={24} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{dashboardStats.totalProducts}</h3>
                  <p className="text-sm text-gray-500">Total Products</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-50 p-3 rounded-full">
                  <BarChart size={24} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">${dashboardStats.revenue.toLocaleString()}</h3>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 border border-gray-200 rounded-md p-6">
              <h2 className="text-xl font-medium mb-6">Admin Quick Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  to="/admin/users" 
                  className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Users className="mr-3 text-gray-500" size={20} />
                  <div>
                    <h3 className="font-medium">Manage Users</h3>
                    <p className="text-sm text-gray-500">View and manage user accounts</p>
                  </div>
                </Link>
                
                <Link 
                  to="/admin/products" 
                  className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Box className="mr-3 text-gray-500" size={20} />
                  <div>
                    <h3 className="font-medium">Manage Products</h3>
                    <p className="text-sm text-gray-500">Add, edit, or remove products</p>
                  </div>
                </Link>
                
                <Link 
                  to="/admin/orders" 
                  className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <ShoppingBag className="mr-3 text-gray-500" size={20} />
                  <div>
                    <h3 className="font-medium">Manage Orders</h3>
                    <p className="text-sm text-gray-500">View and process customer orders</p>
                  </div>
                </Link>
                
                <Link 
                  to="/admin/analytics" 
                  className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <BarChart className="mr-3 text-gray-500" size={20} />
                  <div>
                    <h3 className="font-medium">Analytics</h3>
                    <p className="text-sm text-gray-500">View sales and performance data</p>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6">
              <h2 className="text-xl font-medium mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-sm">New user registered: <span className="font-medium">Alice Johnson</span></p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-sm">New order placed: <span className="font-medium">#ORD-2023-096</span></p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-sm">Product updated: <span className="font-medium">Designer Evening Gown</span></p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
                
                <div>
                  <p className="text-sm">New review received: <span className="font-medium">Classic Tailored Suit</span></p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
