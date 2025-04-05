
import React from 'react';
import MainLayout from '../layouts/MainLayout';

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-8">About Zichael</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif mb-4">Our Story</h2>
              <p className="mb-6 text-gray-700">
                House of Zichael was founded in 2010 with a vision to create bespoke clothing that combines traditional craftsmanship with contemporary design. Our journey began with a small team of dedicated artisans committed to quality and precision.
              </p>
              <p className="mb-6 text-gray-700">
                Over the years, we've grown to become a recognized name in the fashion industry, known for our attention to detail and commitment to sustainability.
              </p>
              <p className="text-gray-700">
                Today, Zichael continues to push boundaries while staying true to our founding principles of excellence, integrity, and innovation.
              </p>
            </div>
            
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1289&q=80" 
                alt="Fashion workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-serif mb-6 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-3">Craftsmanship</h3>
                <p className="text-gray-600">We believe in the power of skilled hands. Every stitch, every cut is executed with precision and care.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium mb-3">Sustainability</h3>
                <p className="text-gray-600">Our commitment to the environment guides our material sourcing and production processes.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium mb-3">Innovation</h3>
                <p className="text-gray-600">While respecting tradition, we constantly explore new techniques and technologies to enhance our craft.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
