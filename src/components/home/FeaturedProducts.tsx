import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ProductCard from '../products/ProductCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const API_URL = 'https://zichael.com/api/products.php';

interface Product {
  id: string;
  name: string;
  price: number | string;
  category: string;
  type: string;
  images: string[] | { url: string }[];
  inventory: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (featuredProducts.length > 0) {
      initAnimations();
    }
  }, [featuredProducts]);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}?action=list`);
      
      if (res.data && res.data.success) {
        // Parse the products and take the first 4 as featured
        const products = (res.data.products || []).map((p: any) => {
          // Parse images from JSON string to array of URLs
          let images: string[] = [];
          try {
            if (typeof p.images === 'string') {
              images = JSON.parse(p.images);
            } else if (Array.isArray(p.images)) {
              images = p.images;
            }
          } catch (e) {
            console.error("Error parsing images:", e);
          }
          
          // Ensure price is a number
          const price = typeof p.price === 'string' ? parseFloat(p.price) : p.price;
          
          return {
            ...p,
            price,
            images
          };
        });
        
        // Get first 4 products as featured
        setFeaturedProducts(products.slice(0, 4));
      } else {
        setError(res.data?.error || res.data?.message || "Failed to load products");
      }
    } catch (err: any) {
      console.error("fetchFeaturedProducts error:", err);
      setError(err?.response?.data?.error || err?.message || 'Failed to load products');
    } finally {
      setLoading(false);
      console.log(featuredProducts);
    }
  };

  const initAnimations = () => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const products = productsRef.current;
    
    if (section && heading && products) {
      // Heading animation
      gsap.fromTo(heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: heading,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Products animation
      const productElements = products.querySelectorAll('.product-item');
      
      gsap.fromTo(productElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: products,
            start: "top bottom-=50",
            toggleActions: "play none none none"
          }
        }
      );
    }
  };

  // Helper function to get image URLs
  const getImageUrls = (product: Product): { image: string, hoverImage: string } => {
    let image = '';
    let hoverImage = '';
    
    if (Array.isArray(product.images)) {
      if (product.images.length > 0) {
        // Handle both string arrays and object arrays
        const firstImage = product.images[0];
        image = typeof firstImage === 'string' 
          ? firstImage 
          : (firstImage as any).url || '';
        
        // Check if image is a blob URL and replace if necessary
        if (image.startsWith('blob:')) {
          image = '';
        }
      }
      
      if (product.images.length > 1) {
        // Use second image as hover image if available
        const secondImage = product.images[1];
        hoverImage = typeof secondImage === 'string' 
          ? secondImage 
          : (secondImage as any).url || '';
        
        // Check if hoverImage is a blob URL and replace if necessary
        if (hoverImage.startsWith('blob:')) {
          hoverImage = '';
        }
      } else if (product.images.length > 0) {
        // Fallback to first image if no second image
        hoverImage = image;
      }
    }
    
    // Fallback placeholder images
    if (!image) {
      image = 'https://placehold.co/600x400';
    }
    
    if (!hoverImage) {
      hoverImage = 'https://placehold.co/600x400';
    }
    
    return { image, hoverImage };
  };

  if (loading) {
    return (
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">Featured Collection</h2>
          <div className="flex justify-center">
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">Featured Collection</h2>
          <div className="flex justify-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-serif mb-12 text-center">Featured Collection</h2>
        
        {featuredProducts.length > 0 ? (
          <>
            <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => {
                const { image, hoverImage } = getImageUrls(product);
                
                return (
                  <div key={product.id} className="product-item">
                    <ProductCard 
                      id={product.id}
                      name={product.name}
                      type={product.type}
                      price={product.price as number}
                      image={`https://zichael.com${image}`}
                      hoverImage={`https://zichael.com${hoverImage}`}
                      category={product.category}
                    />
                  </div>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/products" className="btn-primary">View All Products</Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p>No featured products available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;