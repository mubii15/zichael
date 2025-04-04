
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = () => {
  return (
    <MainLayout>
      <div className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <Link to="/" className="inline-block mb-12 text-sm uppercase tracking-wider hover:underline">
            &larr; Back to home
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="hidden md:block">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1020&q=80" 
                  alt="Fashion model"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignupPage;
