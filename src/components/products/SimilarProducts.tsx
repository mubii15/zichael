import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const API_URL = 'https://zichael.com/api/products.php';

interface SimilarProductsProps {
  currentProductId: string;
  category?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description?: string;
  sizes?: string[];
  colors?: string[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ currentProductId, category }) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!category) {
          setLoading(false);
          return;
        }
        
        const res = await axios.get(
          `${API_URL}?action=by_category&category=${category}&exclude_id=${currentProductId}`
        );
        
        if (res.data && res.data.success) {
          // Parse JSON strings from database
          const products = res.data.products.map((product: any) => ({
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
          
          setSimilarProducts(products);
        } else {
          setError(res.data?.error || "Failed to load similar products");
        }
      } catch (err: any) {
        console.error("fetchSimilarProducts error:", err);
        setError(err.message || "Failed to load similar products");
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [category, currentProductId]);

  useEffect(() => {
    // Animation for the section title and swiper
    if (titleRef.current && swiperRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 }
      );
      
      gsap.fromTo(
        swiperRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
    }
  }, [similarProducts]);

  // Function to get full image URL
  const getImageUrl = (url: string) => {
    if (!url) return 'https://via.placeholder.com/300x400?text=No+Image';
    
    // If it's already a full URL, use it as-is
    if (url.startsWith('http')) return url;
    
    // If it's a relative path, prepend the domain
    return `https://zichael.com${url}`;
  };

  if (loading) {
    return (
      <div className="py-16 border-t border-gray-100">
        <h2 ref={titleRef} className="text-2xl font-medium mb-8 text-center">You May Also Like</h2>
        <div className="text-center">Loading similar products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 border-t border-gray-100">
        <h2 ref={titleRef} className="text-2xl font-medium mb-8 text-center">You May Also Like</h2>
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div className="py-16 border-t border-gray-100">
      <h2 ref={titleRef} className="text-2xl font-medium mb-8 text-center">You May Also Like</h2>
      
      <div ref={swiperRef} className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="similar-products-swiper"
        >
          {similarProducts.map(product => (
            <SwiperSlide key={product.id}>
              <Link to={`/product/${product.id}`} className="block group">
                <div className="aspect-[3/4] mb-4 overflow-hidden bg-gray-50">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={getImageUrl(product.images[0])} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300x400?text=Image+Error';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-1 capitalize">{product.category}</p>
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-sm">₦{Number(product.price).toFixed(2)}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SimilarProducts;