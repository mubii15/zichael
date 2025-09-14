import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Minus, Plus, ShoppingBag, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';
import SimilarProducts from '../components/products/SimilarProducts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Sample product data - in a real app, this would come from an API
const productsData = [
  {
    id: 'product-1',
    name: 'Oversized Cotton Shirt',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80',
      'https://images.unsplash.com/photo-1527010154944-a31ea40faa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80',
      'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    category: 'Men',
    type: 'ready-to-wear',
    description: 'An oversized cotton shirt with a relaxed fit, perfect for casual occasions. Made from 100% organic cotton for breathability and comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Blue'],
  },
  {
    id: 'product-2',
    name: 'Wool Blend Blazer',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1541346160430-93fcee38d521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80'
    ],
    category: 'Men',
    type: 'bespoke',
    description: 'A sophisticated wool blend blazer that offers warmth and style. Features a tailored fit with a two-button closure and notched lapels.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Charcoal', 'Black'],
  },
  {
    id: 'product-3',
    name: 'Relaxed Linen Dress',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1286&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=1364&q=80'
    ],
    category: 'Women',
    type: 'ready-to-wear',
    description: 'A relaxed linen dress designed for comfort and style. Features a loose fit with a belted waist and side pockets.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beige', 'White', 'Sage'],
  },
  {
    id: 'product-4',
    name: 'Cotton Blend Midi Skirt',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1329&q=80',
      'https://images.unsplash.com/photo-1603189041023-d9a2dbc1f2ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80'
    ],
    category: 'Women',
    type: 'ready-to-wear',
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
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
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category
    }, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: `Check out this ${product?.name} from House of Zichael`,
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy link');
      }
    }
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
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/products?category=${product.category.toLowerCase()}`}>{product.category}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div ref={productImageRef} className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/5] overflow-hidden bg-gray-50 rounded-lg">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-black' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div ref={productDetailsRef} className="flex flex-col">
            {/* Title and Share Button */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-light mb-3">{product.name}</h1>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.category} • {product.type.replace('-', ' ')}</p>
                <p className="text-2xl font-medium">₦{product.price.toFixed(2)}</p>
              </div>
              <button
                onClick={handleShare}
                className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                title="Share this product"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection - Only for Ready to Wear */}
            {product.type === 'ready-to-wear' && product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`px-4 py-2 border text-sm font-medium transition-colors ${
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

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-wider mb-3">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`px-4 py-2 border text-sm font-medium transition-colors ${
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

            {/* Quantity - Only for Ready to Wear */}
            {product.type === 'ready-to-wear' && (
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-wider mb-3">Quantity</h3>
                <div className="flex items-center border border-gray-300 w-32">
                  <button 
                    className="px-3 py-2 flex items-center justify-center hover:bg-gray-50 transition-colors" 
                    onClick={decreaseQuantity}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-1 text-center font-medium">{quantity}</div>
                  <button 
                    className="px-3 py-2 flex items-center justify-center hover:bg-gray-50 transition-colors" 
                    onClick={increaseQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              {product.type === 'bespoke' ? (
                <Link
                  to="/contact"
                  className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center text-center"
                >
                  <span>Contact Us for Bespoke</span>
                </Link>
              ) : (
                <button
                  className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
        
        <SimilarProducts currentProductId={product.id} category={product.category} />
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
