
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category.toLowerCase()}`);
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-serif mb-6">Zichael</h3>
            <p className="text-sm text-gray-300 mb-4">
            House of Zichael is a Top notch bespoke fitting brand, which has a practical experience in posh customary clothing, for fashion enthusiasts all over the world.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleCategoryClick('men')} 
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Men
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('women')} 
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Women
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('kids')} 
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Kids
                </button>
              </li>
              <li><Link to="/products" className="text-sm text-gray-300 hover:text-white">Collections</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase mb-6">Help</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-300 hover:text-white">Shipping</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-300 hover:text-white">Returns</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-300 hover:text-white">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase mb-6">Connect</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white">Our Story</Link></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white">Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white">Pinterest</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Zichael. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
