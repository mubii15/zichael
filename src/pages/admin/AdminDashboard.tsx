
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Users, ShoppingBag, Package } from 'lucide-react';

const AdminDashboard = () => {
  const adminFeatures = [
    {
      title: 'User Management',
      description: 'View and manage user accounts, roles, and permissions.',
      icon: <Users size={32} className="text-blue-500" />,
      link: '/admin/users'
    },
    {
      title: 'Product Management',
      description: 'Add, edit, and remove products from your catalog.',
      icon: <ShoppingBag size={32} className="text-green-500" />,
      link: '/admin/products'
    },
    {
      title: 'Order Management',
      description: 'Track and update order statuses, view order details.',
      icon: <Package size={32} className="text-purple-500" />,
      link: '/admin/orders'
    }
  ];

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-12">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminFeatures.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="block bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="mb-6">{feature.icon}</div>
                <h2 className="text-xl font-medium mb-3">{feature.title}</h2>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <span className="inline-flex items-center font-medium text-black hover:underline">
                  Manage
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
