
import React from 'react';
import MainLayout from '../layouts/MainLayout';

const ShippingPage = () => {
  return (
    <MainLayout>
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-12">Shipping & Returns</h1>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6 md:col-span-2">
              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">Shipping Policy</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    At Zichael, we strive to deliver your orders promptly and efficiently. We ship worldwide and offer various shipping options to meet your needs.
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-md">
                    <h3 className="text-lg font-medium mb-3">Delivery Timeframes</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li><span className="font-medium">Standard Shipping:</span> 5-7 business days</li>
                      <li><span className="font-medium">Express Shipping:</span> 2-3 business days</li>
                      <li><span className="font-medium">International Shipping:</span> 7-14 business days</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700">
                    Please note that bespoke items have different shipping timelines based on production schedules. You will receive a specific timeframe for your custom order after consultation.
                  </p>
                </div>
              </section>
              
              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">Returns & Exchanges</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We want you to be completely satisfied with your purchase. If for any reason you're not, we offer a hassle-free return and exchange policy.
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-md">
                    <h3 className="text-lg font-medium mb-3">Return Conditions</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>Items must be returned within 30 days of receipt</li>
                      <li>Products must be unworn, unwashed, and with all original tags attached</li>
                      <li>Include the original packaging and receipt or proof of purchase</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700">
                    Please note that bespoke and custom-made items cannot be returned unless there is a defect in materials or workmanship.
                  </p>
                </div>
              </section>
            </div>
            
            <div>
              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">Size Guide</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Finding the perfect fit is essential. Use our size guide to help you select the right size for your purchases.
                  </p>
                  
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Chest (in)</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Waist (in)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm">S</td>
                          <td className="px-4 py-3 text-sm">36-38</td>
                          <td className="px-4 py-3 text-sm">30-32</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">M</td>
                          <td className="px-4 py-3 text-sm">39-41</td>
                          <td className="px-4 py-3 text-sm">33-35</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">L</td>
                          <td className="px-4 py-3 text-sm">42-44</td>
                          <td className="px-4 py-3 text-sm">36-38</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">XL</td>
                          <td className="px-4 py-3 text-sm">45-47</td>
                          <td className="px-4 py-3 text-sm">39-41</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <p className="text-gray-700">
                    For bespoke orders, we'll take your exact measurements during the consultation process to ensure a perfect fit.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShippingPage;
