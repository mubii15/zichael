import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';
import SimilarProducts from '../components/products/SimilarProducts';

// Sample product data - in a real app, this would come from an API
const productsData = [
  {
    id: 'product-1',
    name: 'Oversized Cotton Shirt',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80',
    category: 'Men',
    description: 'An oversized cotton shirt with a relaxed fit, perfect for casual occasions. Made from 100% organic cotton for breathability and comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Blue'],
  },
  {
    id: 'product-2',
    name: 'Wool Blend Blazer',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1541346160430-93fcee38d521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    category: 'Men',
    description: 'A sophisticated wool blend blazer that offers warmth and style. Features a tailored fit with a two-button closure and notched lapels.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Charcoal', 'Black'],
  },
  {
    id: 'product-3',
    name: 'Relaxed Linen Dress',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1286&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
    category: 'Women',
    description: 'A relaxed linen dress designed for comfort and style. Features a loose fit with a belted waist and side pockets.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beige', 'White', 'Sage'],
  },
  {
    id: 'product-4',
    name: 'Cotton Blend Midi Skirt',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1329&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603189041023-d9a2dbc1f2ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    category: 'Women',
    description: 'A versatile cotton blend midi skirt with an elastic waistband and flowy design. Perfect for both casual and semi-formal occasions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
  },
];

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productsData.find(p => p.id === productId);
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  const productImageRef = useRef<HTMLDivElement>(null);
  const productDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
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
  }, [productId, product]);

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem(product, quantity);
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
        <Link to="/" className="inline-flex items-center text-sm hover:underline mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Products
        </Link>

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

            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map(size => (
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

            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-wider mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors?.map(color => (
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

            <div className="mt-auto pt-6 border-t border-gray-200">
              <button
                className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        
        <SimilarProducts currentProductId={product.id} category={product.category} />
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
