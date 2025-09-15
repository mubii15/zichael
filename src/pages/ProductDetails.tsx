import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';
import SimilarProducts from '../components/products/SimilarProducts';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const API_URL = 'https://zichael.com/api/products.php';
const WHATSAPP_NUMBER = '2348123456789'; // Replace with your actual WhatsApp number

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const productImageRef = useRef<HTMLDivElement>(null);
  const productDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}?action=get&id=${productId}`);
        if (res.data && res.data.success) {
          const productData = res.data.product;
          
          // Parse JSON strings from database
          productData.images = Array.isArray(productData.images) ? 
            productData.images : 
            JSON.parse(productData.images || '[]');
          
          productData.sizes = Array.isArray(productData.sizes) ? 
            productData.sizes : 
            JSON.parse(productData.sizes || '[]');
          
          productData.colors = Array.isArray(productData.colors) ? 
            productData.colors : 
            JSON.parse(productData.colors || '[]');
          
          setProduct(productData);
          
          if (productData.sizes && productData.sizes.length > 0) {
            setSelectedSize(productData.sizes[0]);
          }
          if (productData.colors && productData.colors.length > 0) {
            setSelectedColor(productData.colors[0]);
          }
        } else {
          toast.error(res.data?.error || "Failed to load product");
        }
      } catch (err) {
        console.error("fetchProduct error:", err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }

    // Animation for product page elements
    if (productImageRef.current && productDetailsRef.current) {
      gsap.fromTo(
        productImageRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        productDetailsRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }

    // Reset scroll position when visiting a new product
    window.scrollTo(0, 0);
  }, [productId]);

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({ ...product, image: product.images[0] }, quantity);
    toast.success(`${product.name} added to cart`);
  };

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="inline-block px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors">
            Return to Home
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 pt-32 pb-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight size={16} className="text-gray-400" />
          <Link to="/products" className="hover:underline">Products</Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div ref={productImageRef} className="aspect-[3/4] overflow-hidden bg-gray-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div ref={productDetailsRef} className="flex flex-col">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <h1 className="text-3xl font-medium mb-3">{product.name}</h1>
              <p className="text-xl">${product.price.toFixed(2)}</p>
            </div>

            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`px-4 py-2 border text-sm font-medium ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-wider mb-3">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`px-4 py-2 border text-sm font-medium ${
                        selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.type === 'ready-to-wear' && (
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-wider mb-3">Quantity</h3>
                <div className="flex items-center border border-gray-300 w-32">
                  <button 
                    className="px-3 py-2 flex items-center justify-center" 
                    onClick={decreaseQuantity}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-1 text-center font-medium">{quantity}</div>
                  <button 
                    className="px-3 py-2 flex items-center justify-center" 
                    onClick={increaseQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-gray-200">
              {product.type === 'ready-to-wear' ? (
                <button
                  className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Add to Cart
                </button>
              ) : (
                <button
                  className="w-full py-4 bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center justify-center"
                  onClick={handleWhatsAppContact}
                >
                  <MessageCircle size={18} className="mr-2" />
                  Contact on WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
        
        <SimilarProducts 
          currentProductId={product.id} 
          category={product.category} 
        />
      </div>
    </MainLayout>
  );
};

export default ProductDetails;