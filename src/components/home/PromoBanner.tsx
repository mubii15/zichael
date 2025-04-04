
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PromoBanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    
    if (banner && text && image) {
      // Create parallax effect
      gsap.to(image, {
        y: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      
      // Animate text elements
      const textElements = text.querySelectorAll('.animate-item');
      
      gsap.fromTo(textElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <div ref={bannerRef} className="relative h-[70vh] overflow-hidden bg-black">
      <div ref={imageRef} className="absolute inset-0 h-[120%] w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <div ref={textRef} className="max-w-lg text-white">
            <span className="animate-item block text-sm uppercase tracking-widest mb-4">New Season</span>
            <h2 className="animate-item text-4xl md:text-5xl font-serif mb-6">Summer Collection 2025</h2>
            <p className="animate-item text-lg mb-8">Discover the perfect pieces for warm days and balmy nights. Our summer collection brings effortless style to your seasonal wardrobe.</p>
            <Link to="/collections/summer" className="animate-item inline-block btn-primary">
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
