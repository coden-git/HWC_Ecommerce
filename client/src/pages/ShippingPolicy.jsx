import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-wellness-200">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-wellness-700 mb-4">Shipping Policy</h1>
            <p className="text-gray-600 italic border-b-2 border-wellness-200 pb-6">
              Last Updated: November 16, 2025
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-wellness-100 border-l-4 border-wellness-500 p-6 rounded-r-lg mb-8">
              <p className="text-wellness-800 font-medium leading-relaxed m-0">
                At Dr Lathashekhar Holistic Wellness Center, we are committed to delivering your wellness products 
                safely and efficiently. This Shipping Policy outlines our shipping procedures, delivery timelines, 
                and important information regarding the shipment of your orders.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                1. Shipping Areas
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">1.1. Domestic Shipping:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>We currently ship to all major cities and towns across India</li>
                    <li>Coverage includes metro cities, tier-2 cities, and most tier-3 locations</li>
                    <li>Rural areas may have extended delivery times (subject to courier availability)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">1.2. International Shipping:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Currently, we do not offer international shipping</li>
                    <li>We are working to expand our reach globally in the future</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                2. Delivery Timeframes
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">2.1. Metro Cities:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Standard Delivery: 2-4 business days</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">2.2. Other Cities:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Standard Delivery: 4-7 business days</li>
                    <li>Remote locations: 7-10 business days</li>
                  </ul>
                </div>

                <div className="bg-wellness-50 border border-wellness-200 p-4 rounded-lg mt-4">
                  <p className="text-wellness-800 text-sm">
                    <strong>Note:</strong> Delivery times are estimates and may vary due to unforeseen circumstances, 
                    weather conditions, or courier delays. Orders placed on weekends or public holidays will be 
                    processed on the next business day.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                3. Shipping Charges
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">3.1. Standard Shipping:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Free shipping on orders above ₹999</li>
                    <li>₹50 flat shipping rate for orders below ₹999</li>
                    <li>Special wellness product bundles include free shipping</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">3.2. Express Shipping:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>₹150 additional charge for express delivery</li>
                    <li>Available in select metro cities</li>
                    <li>Same-day delivery: ₹250 (Bangalore only, for orders placed before 12 PM)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                4. Order Processing
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>Processing Time:</strong> All orders are processed within 1-2 business days from the time of order confirmation.
                </p>
                <p className="text-gray-700">
                  <strong>Order Confirmation:</strong> You will receive an order confirmation email immediately after placing your order.
                </p>
                <p className="text-gray-700">
                  <strong>Shipping Notification:</strong> Once your order is shipped, you will receive a shipping confirmation email with tracking details.
                </p>
                <div className="bg-wellness-50 border border-wellness-200 p-4 rounded-lg">
                  <p className="text-wellness-800 text-sm">
                    <strong>Quality Check:</strong> Each wellness product undergoes a thorough quality check before packaging to ensure you receive products in perfect condition.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                5. Package Tracking
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Track your wellness products shipment using the tracking number provided in your shipping confirmation email.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Real-time tracking updates via SMS and email</li>
                  <li>Track your order on our website using order ID</li>
                  <li>Customer service support for tracking queries</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                6. Special Product Handling
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">6.1. Temperature-Sensitive Products:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Herbal medicines and supplements are shipped with appropriate temperature control</li>
                    <li>Special insulated packaging for heat-sensitive items</li>
                    <li>Expedited shipping recommended for certain products</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">6.2. Fragile Items:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Glass containers and ceramic items receive extra padding</li>
                    <li>"Fragile" markings on all delicate wellness products</li>
                    <li>Insurance coverage for high-value fragile items</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                7. Delivery Instructions
              </h2>
              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Please ensure someone is available to receive the package during delivery hours (9 AM - 7 PM)</li>
                  <li>Valid government-issued photo ID may be required for verification</li>
                  <li>If no one is available, our delivery partner will attempt redelivery</li>
                  <li>After 3 failed delivery attempts, the package will be returned to our facility</li>
                  <li>Additional charges may apply for redelivery or address changes after dispatch</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                8. Damaged or Lost Packages
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  If your wellness products arrive damaged or if a package is lost during transit:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Report the issue within 24 hours of delivery</li>
                  <li>Provide photos of damaged items and packaging</li>
                  <li>We will arrange for replacement or full refund</li>
                  <li>No additional charges for replacement shipments due to transit damage</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                9. Address Changes
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Address modifications are subject to the following conditions:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Changes must be requested within 2 hours of order placement</li>
                  <li>Once shipped, address changes may not be possible</li>
                  <li>Additional shipping charges may apply for address changes</li>
                  <li>Contact customer service immediately for address change requests</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                10. Holiday and Weather Delays
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Shipping may be delayed during:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>National and regional holidays</li>
                  <li>Severe weather conditions</li>
                  <li>Natural disasters or unforeseen circumstances</li>
                  <li>Peak festival seasons</li>
                </ul>
                <p className="text-gray-700 text-sm mt-4">
                  We will notify customers of any expected delays via email or SMS.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                11. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                For any shipping-related queries, please contact us:
              </p>
              <div className="bg-wellness-50 border border-wellness-200 p-6 rounded-lg">
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold text-wellness-700">Email:</span> drlathashekharwellnesscenter@gmail.com
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-wellness-700">Phone:</span> +91 9535660110
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-wellness-700">Address:</span> Dr Lathashekhar Holistic Wellness Center<br />
                    8th Main Road, Srividya Nagar, Giri Nagar, II Phase,<br />
                    Banashankari 3rd Stage, Banashankari, Bangalore - 560098
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-wellness-700">Customer Service Hours:</span> Monday - Saturday, 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                12. Policy Updates
              </h2>
              <p className="text-gray-700 leading-relaxed">
                This Shipping Policy may be updated from time to time to reflect changes in our shipping 
                procedures, delivery partners, or service areas. Any changes will be posted on this page 
                with the updated effective date. We encourage you to review this policy periodically.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;