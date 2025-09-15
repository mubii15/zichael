import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import axios from 'axios';

const API_URL = 'https://zichael.com/api/products.php';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const typeFilter = searchParams.get('type');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    category: categoryFilter || 'all',
    type: typeFilter || 'all',
  });
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}?action=list`);
        
        if (res.data && res.data.success) {
          // Parse JSON strings from database
          const productsData = res.data.products.map(product => ({
            ...product,
            images: Array.isArray(product.images) ? 
              product.images : 
              JSON.parse(product.images || '[]'),
            sizes: Array.isArray(product.sizes) ? 
              product.sizes : 
              JSON.parse(product.sizes || '[]'),
            colors: Array.isArray(product.colors) ? 
              product.colors : 
              JSON.parse(product.colors || '[]'),
          }));
          
          setProducts(productsData);
        } else {
          setError(res.data?.error || "Failed to load products");
        }
      } catch (err) {
        console.error("fetchProducts error:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filterType: 'category' | 'type', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const matchesCategory = filters.category === 'all' || product.category === filters.category;
    const matchesType = filters.type === 'all' || product.type === filters.type;
    return matchesCategory && matchesType;
  });

  // Function to get full image URL
  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300x400?text=No+Image';
    
    // If it's already a full URL, use it as-is
    if (url.startsWith('http')) return url;
    
    // If it's a relative path, prepend the domain
    return `https://zichael.com${url}`;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="pt-28 pb-16 px-6">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif mb-12">Our Collection</h1>
            <div className="text-center py-12">
              <p>Loading products...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="pt-28 pb-16 px-6">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif mb-12">Our Collection</h1>
            <div className="text-center py-12 text-red-500">
              <p>Error: {error}</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

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
                    <ProductCard 
                      key={product.id} 
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={getImageUrl(product.images && product.images.length > 0 ? product.images[0] : '')}
                      category={product.category}
                      type={product.type}
                    />
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