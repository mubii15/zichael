
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Sample carousel data
const carouselData = [
  {
    id: 'men',
    title: 'Men',
    subtitle: 'Enjoy Our New Collection',
    description: 'Effortless elegance for the modern man',
    ctaText: 'Shop Men',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    prev: 'kids',
    next: 'women'
  },
  {
    id: 'women',
    title: 'Women',
    subtitle: 'Enjoy Our New Collection',
    description: 'Bold statements for the contemporary woman',
    ctaText: 'Shop Women',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    prev: 'men',
    next: 'kids'
  },
  {
    id: 'kids',
    title: 'Kids',
    subtitle: 'Enjoy Our New Collection',
    description: 'Playful styles for the little ones',
    ctaText: 'Shop Kids',
    image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    prev: 'women',
    next: 'men'
  }
];

const HeroCarousel = () => {
  const [activeSlide, setActiveSlide] = useState('men');
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const mainTl = useRef(gsap.timeline({ paused: true }));

  const activeSlideData = carouselData.find(slide => slide.id === activeSlide) || carouselData[0];
  
  const goToSlide = (slideId: string) => {
    if (isAnimating || slideId === activeSlide) return;
    
    const currentSlide = carouselData.find(slide => slide.id === activeSlide);
    const nextSlide = carouselData.find(slide => slide.id === slideId);
    
    if (!currentSlide || !nextSlide) return;
    
    setIsAnimating(true);
    
    const direction = slideId === currentSlide.next ? 1 : -1;
    const currentSlideEl = document.querySelector(`[data-slide="${activeSlide}"]`);
    const nextSlideEl = document.querySelector(`[data-slide="${slideId}"]`);
    
    if (!currentSlideEl || !nextSlideEl) {
      setIsAnimating(false);
      return;
    }
    
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveSlide(slideId);
        setIsAnimating(false);
      }
    });
    
    // Hide and position the next slide
    gsap.set(nextSlideEl, { visibility: 'visible', xPercent: direction * 100 });
    
    // Animate out current slide
    tl.to(currentSlideEl, {
      xPercent: -direction * 100,
      duration: 1,
      ease: "power2.inOut"
    });
    
    // Animate in next slide
    tl.to(nextSlideEl, {
      xPercent: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "<");
    
    // Animate content elements with parallax effect
    const currentContent = currentSlideEl.querySelectorAll('.slide-content > *');
    const nextContent = nextSlideEl.querySelectorAll('.slide-content > *');
    
    tl.to(currentContent, {
      y: -30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.05,
      ease: "power2.in"
    }, "<0.1");
    
    tl.fromTo(nextContent, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out"
      },
      "<0.4"
    );
  };

  // Initial animation setup
  useEffect(() => {
    const slideElements = document.querySelectorAll('.carousel-slide');
    
    // Hide all slides except active
    slideElements.forEach(slide => {
      if (slide.getAttribute('data-slide') !== activeSlide) {
        gsap.set(slide, { visibility: 'hidden', xPercent: 100 });
      } else {
        gsap.set(slide, { visibility: 'visible', xPercent: 0 });
      }
    });
    
    // Animate in the initial slide content
    const activeContent = document.querySelectorAll(`[data-slide="${activeSlide}"] .slide-content > *`);
    
    gsap.fromTo(activeContent,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2
      }
    );
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden" ref={carouselRef}>
      {/* Carousel slides */}
      {carouselData.map((slide) => (
        <div 
          key={slide.id}
          data-slide={slide.id}
          className={`carousel-slide absolute inset-0 h-full w-full overflow-hidden`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="relative h-full w-full flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="slide-content max-w-xl text-white">
                <span className="block text-sm uppercase tracking-widest mb-2">{slide.subtitle}</span>
                <h2 className="text-5xl md:text-7xl font-serif mb-4">{slide.title}</h2>
                <p className="text-lg mb-8">{slide.description}</p>
                <button className="btn-primary">{slide.ctaText}</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation buttons */}
      <div className="absolute inset-x-0 bottom-0 flex justify-between px-6 md:px-12 py-8">
        <button
          className="group flex items-center text-white"
          onClick={() => goToSlide(activeSlideData.prev)}
          disabled={isAnimating}
        >
          <ArrowLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="uppercase text-sm tracking-widest">
            {carouselData.find(slide => slide.id === activeSlideData.prev)?.title}
          </span>
        </button>
        
        <button
          className="group flex items-center text-white"
          onClick={() => goToSlide(activeSlideData.next)}
          disabled={isAnimating}
        >
          <span className="uppercase text-sm tracking-widest">
            {carouselData.find(slide => slide.id === activeSlideData.next)?.title}
          </span>
          <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
