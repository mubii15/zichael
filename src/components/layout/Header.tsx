
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainMenu from './MainMenu';
import { useCart } from '../../context/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <Link to="/" className="text-xl font-serif uppercase tracking-widest">Zichael</Link>
      
      <div className="flex items-center space-x-6">
        <Link to="/account" className="text-sm hidden md:block hover:opacity-70 transition-opacity duration-300">
          <User size={20} />
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm hover:opacity-70 transition-opacity duration-300">
            <Instagram size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-lg border z-50">
            <DropdownMenuItem>
              <Link to="/men" className="w-full">Men</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/women" className="w-full">Women</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/kids" className="w-full">Children</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Link to="/cart" className="text-sm relative hover:opacity-70 transition-opacity duration-300">
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        
        <button 
          className="text-sm flex items-center focus:outline-none z-[60]"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <MainMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Header;
