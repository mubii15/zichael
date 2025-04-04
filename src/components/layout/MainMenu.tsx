
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

interface MainMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const menuElement = menuRef.current;
    const links = linkRefs.current;

    if (menuElement) {
      const tl = gsap.timeline({ paused: true });
      
      tl.to(menuElement, {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
      });
      
      tl.fromTo(links, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out"
        }, 
        "-=0.2"
      );

      if (isOpen) {
        tl.play();
        document.body.style.overflow = 'hidden';
      } else {
        gsap.to(menuElement, {
          x: "100%",
          duration: 0.5,
          ease: "power3.in",
        });
        document.body.style.overflow = '';
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div 
      ref={menuRef}
      className={`fixed top-0 right-0 w-full md:w-1/2 h-full bg-white z-40 transform translate-x-full transition-all duration-500 shadow-xl flex flex-col justify-center`}
    >
      <div className="container mx-auto px-12 py-8">
        <nav className="flex flex-col items-start">
          <ul className="space-y-6 w-full">
            {['Home', 'Men', 'Women', 'Kids', 'About', 'Contact'].map((item, index) => (
              <li 
                key={item} 
                ref={el => linkRefs.current[index] = el}
                className="opacity-0"
              >
                <Link 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="menu-item"
                  onClick={onClose}
                >
                  {item}
                  <span className="menu-item-line"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/account" 
              className="text-sm uppercase tracking-wider"
              onClick={onClose}
            >
              Account
            </Link>
            <Link 
              to="/account/orders" 
              className="text-sm uppercase tracking-wider"
              onClick={onClose}
            >
              Orders
            </Link>
            <Link 
              to="/cart" 
              className="text-sm uppercase tracking-wider"
              onClick={onClose}
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
