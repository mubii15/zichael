
import React, { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroCarousel from '../components/home/HeroCarousel';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoBanner from '../components/home/PromoBanner';
import gsap from 'gsap';

const Index = () => {
  // Page enter animation
  useEffect(() => {
    // Ensure the page is scrolled to top on load
    window.scrollTo(0, 0);
    
    // Fade in the page content
    gsap.fromTo(
      '.page-content',
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.8,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <MainLayout>
      <div className="page-content">
        <HeroCarousel />
        
        <FeaturedProducts />
        
        <PromoBanner />
      </div>
    </MainLayout>
  );
};

export default Index;
