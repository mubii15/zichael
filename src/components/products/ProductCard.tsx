import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../../context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  category: string;
  type?: string; // Add type to props
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  image, 
  hoverImage,
  category,
  type = 'ready-to-wear' // Default to ready-to-wear
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(image);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  // 👉 sentence case helper
  const toSentenceCase = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // 👉 format price with commas
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(price).replace('NGN', '₦');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hoverImage && !imageError) setCurrentImage(hoverImage);
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: -10, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImage(image);
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setCurrentImage('https://placehold.co/600x800?text=No+Image');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only add to cart if it's a ready-to-wear product
    if (type === 'ready-to-wear') {
      addItem({ id, name, price, image, category, quantity: 1 });
      toast.success(`${name} added to cart`);
    } else {
      // For bespoke products, just link to the product page
      // The actual navigation is handled by the parent Link
    }
  };

  return (
    <div 
      ref={cardRef}
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/products/${id}`} className="block">
        <div className="relative overflow-hidden mb-4 aspect-[3/4]">
          <img 
            src={currentImage}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
          
          {/* Show different button based on product type */}
          {type === 'ready-to-wear' ? (
            <button 
              className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 text-sm uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          ) : (
            <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white py-3 text-sm uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-center">
              Bespoke
            </div>
          )}
        </div>
        
        <div className="text-left">
          <div className="flex justify-between items-start mb-1">
            <p className="text-sm text-gray-500">{toSentenceCase(category)}</p>
            {type === 'bespoke' && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Bespoke
              </span>
            )}
          </div>
          <h3 className="font-medium text-lg mb-1">{toSentenceCase(name)}</h3>
          
          {/* Show price only for ready-to-wear products */}
          {type === 'ready-to-wear' ? (
            <p className="text-sm">{formatPrice(price)}</p>
          ) : (
            <p className="text-sm text-gray-600">Price on request</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;