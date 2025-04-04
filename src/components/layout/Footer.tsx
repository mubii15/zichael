
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-serif mb-6">VOGUE FLOW</h3>
            <p className="text-sm text-gray-300 mb-4">
              Premium fashion for the modern individual. Discover curated collections that blend timeless elegance with contemporary style.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase mb-6">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/men" className="text-sm text-gray-300 hover:text-white">Men</Link></li>
              <li><Link to="/women" className="text-sm text-gray-300 hover:text-white">Women</Link></li>
              <li><Link to="/kids" className="text-sm text-gray-300 hover:text-white">Kids</Link></li>
              <li><Link to="/collections" className="text-sm text-gray-300 hover:text-white">Collections</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase mb-6">Help</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-300 hover:text-white">Shipping</Link></li>
              <li><Link to="/returns" className="text-sm text-gray-300 hover:text-white">Returns</Link></li>
              <li><Link to="/size-guide" className="text-sm text-gray-300 hover:text-white">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase mb-6">Connect</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white">Our Story</Link></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Pinterest</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Vogue Flow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
