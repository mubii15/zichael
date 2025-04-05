
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <MainLayout>
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="mb-8 text-gray-700">
                We'd love to hear from you. Whether you have a question about our products, custom orders, or anything else, our team is ready to assist you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 text-black" size={24} />
                  <div>
                    <h3 className="text-lg font-medium mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Fashion Street<br />
                      Design District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-4 text-black" size={24} />
                  <div>
                    <h3 className="text-lg font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Mon - Fri, 9am - 6pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mr-4 text-black" size={24} />
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <p className="text-gray-600">info@zichael.com</p>
                    <p className="text-sm text-gray-500 mt-1">We aim to respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 border border-input bg-background"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 border border-input bg-background"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 border border-input bg-background"
                    placeholder="What is this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full px-4 py-3 border border-input bg-background"
                    placeholder="Tell us what you need..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full btn-primary"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
