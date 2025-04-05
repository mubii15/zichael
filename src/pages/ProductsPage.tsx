
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Classic Tailored Suit',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1555069519-127aadedf1ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    category: 'men',
    type: 'bespoke'
  },
  {
    id: '2',
    name: 'Designer Evening Gown',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80',
    category: 'women',
    type: 'bespoke'
  },
  {
    id: '3',
    name: 'Cotton Oxford Shirt',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    category: 'men',
    type: 'ready-to-wear'
  },
  {
    id: '4',
    name: 'Silk Blouse',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    category: 'women',
    type: 'ready-to-wear'
  },
  {
    id: '5',
    name: 'Kids Dress Set',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1543370566-12bdf5fac361?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    category: 'kids',
    type: 'ready-to-wear'
  },
  {
    id: '6',
    name: 'Kids Custom Suit',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1519238359922-989348752efb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    category: 'kids',
    type: 'bespoke'
  }
];

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const typeFilter = searchParams.get('type');
  
  const [filters, setFilters] = useState({
    category: categoryFilter || 'all',
    type: typeFilter || 'all',
  });
  
  const handleFilterChange = (filterType: 'category' | 'type', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Filter products based on selected filters
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = filters.category === 'all' || product.category === filters.category;
    const matchesType = filters.type === 'all' || product.type === filters.type;
    return matchesCategory && matchesType;
  });

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-12">Our Collection</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-serif">Category</h2>
                  <div className="space-y-2">
                    {['all', 'men', 'women', 'kids'].map(category => (
                      <div key={category} className="flex items-center">
                        <button
                          className={`text-sm ${filters.category === category ? 'font-semibold' : 'text-gray-600'}`}
                          onClick={() => handleFilterChange('category', category)}
                        >
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl font-serif">Product Type</h2>
                  <div className="space-y-2">
                    {['all', 'ready-to-wear', 'bespoke'].map(type => (
                      <div key={type} className="flex items-center">
                        <button
                          className={`text-sm ${filters.type === type ? 'font-semibold' : 'text-gray-600'}`}
                          onClick={() => handleFilterChange('type', type)}
                        >
                          {type === 'all' ? 'All Types' : type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No products found matching your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
