
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Sample product data (in a real app, we would filter by category or tags)
const productsData = [
  {
    id: 'product-1',
    name: 'Oversized Cotton Shirt',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    category: 'Men',
  },
  {
    id: 'product-3',
    name: 'Relaxed Linen Dress',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1286&q=80',
    category: 'Women',
  },
  {
    id: 'product-4',
    name: 'Cotton Blend Midi Skirt',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1329&q=80',
    category: 'Women',
  },
  {
    id: 'product-2',
    name: 'Wool Blend Blazer',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    category: 'Men',
  },
];

interface SimilarProductsProps {
  currentProductId: string;
  category?: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ currentProductId, category }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  
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
  }, []);

  // Filter out the current product and optionally filter by category
  const similarProducts = productsData.filter(product => {
    if (product.id === currentProductId) return false;
    if (category && product.category !== category) return false;
    return true;
  });

  if (similarProducts.length === 0) return null;

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
              <Link to={`/products/${product.id}`} className="block group">
                <div className="aspect-[3/4] mb-4 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-sm">${product.price.toFixed(2)}</p>
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
