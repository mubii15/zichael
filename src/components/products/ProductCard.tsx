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
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  image, 
  hoverImage,
  category 
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
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(price);

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
    
    addItem({ id, name, price, image, category });
    toast.success(`${name} added to cart`);
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
          <button 
            className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 text-sm uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
        
        <div className="text-left">
          <p className="text-sm text-gray-500 mb-1">{toSentenceCase(category)}</p>
          <h3 className="font-medium text-lg mb-1">{toSentenceCase(name)}</h3>
          <p className="text-sm">{formattedPrice}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
