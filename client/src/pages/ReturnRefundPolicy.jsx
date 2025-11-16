import React from 'react';

const ReturnRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-wellness-200">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-wellness-700 mb-4">Return & Refund Policy</h1>
            <p className="text-gray-600 italic border-b-2 border-wellness-200 pb-6">
              Last Updated: November 7, 2025
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-wellness-100 border-l-4 border-wellness-500 p-6 rounded-r-lg mb-8">
              <p className="text-wellness-800 font-medium leading-relaxed m-0">
                We value your satisfaction with our wellness products. This policy outlines our return and 
                refund procedures to ensure clarity and transparency in our customer service approach.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                1. Refund Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We value your satisfaction with our wellness products. However, please note that we do not 
                accept returns or offer refunds for products unless there is a manufacturer's defect in the item. 
                If you believe that you have received a product with a manufacturing defect, please contact us immediately.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-yellow-800 font-medium mb-2">
                  <strong>Important Note:</strong>
                </p>
                <p className="text-yellow-700 text-sm">
                  Due to the nature of wellness and health products, returns are only accepted for 
                  manufacturing defects to ensure product safety and hygiene standards.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                2. Return Process for Defective Products
              </h2>
              <p className="text-gray-700 mb-4">
                To initiate a return for a defective wellness product, please follow these steps:
              </p>
              
              <div className="space-y-6">
                <div className="bg-wellness-50 border border-wellness-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">Step 1: Contact Customer Support</h3>
                  <p className="text-gray-700">
                    Contact our customer support team within <strong>three (3) business days</strong> of 
                    receiving the product to report the manufacturing defect. Early reporting helps us 
                    address quality issues promptly.
                  </p>
                </div>

                <div className="bg-wellness-50 border border-wellness-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">Step 2: Provide Documentation</h3>
                  <p className="text-gray-700">
                    Our team will guide you through the return process, which may include providing 
                    photographic evidence of the defect or other information as requested. This helps us 
                    understand the issue and improve our quality control.
                  </p>
                </div>

                <div className="bg-wellness-50 border border-wellness-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">Step 3: Return Authorization</h3>
                  <p className="text-gray-700">
                    If we determine that the product has a manufacturing defect, we will provide you with 
                    detailed instructions on how to return the item safely and securely.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                3. Return Conditions
              </h2>
              <p className="text-gray-700 mb-4">
                Please note that the following conditions apply to return requests for defective products:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-wellness-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    ✓
                  </div>
                  <p className="text-gray-700">
                    The item must be <strong>unused and in the same condition</strong> as when you received it
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-wellness-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    ✓
                  </div>
                  <p className="text-gray-700">
                    The item must be in its <strong>original packaging</strong> with all seals intact
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-wellness-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    ✓
                  </div>
                  <p className="text-gray-700">
                    A <strong>receipt or proof of purchase</strong> is required to complete your return
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                4. Refund Processing
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Once we receive and inspect the returned item, we will notify you of the approval or rejection 
                of your refund. If approved, your refund will be processed within 5-7 business days, and a 
                credit will automatically be applied to your original method of payment. Please note that 
                depending on your bank or payment provider, it may take additional time for the refund to 
                appear in your account.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                5. Non-Returnable Items
              </h2>
              <p className="text-gray-700 mb-4">
                Please be aware that we do not accept returns or offer refunds for the following items:
              </p>
              
              <div className="space-y-6">
                {/* <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-600 mb-3">Digital Products & Services</h3>
                  <p className="text-red-700">
                    Any software solutions, digital wellness programs, online consultations, or services 
                    related to our products are considered non-returnable and non-refundable once delivered or accessed.
                  </p>
                </div> */}

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-600 mb-3">Sale Items</h3>
                  <p className="text-red-700">
                    Products purchased during sales, clearance events, or with special discounts are final sale. 
                    Only regular-priced items are eligible for refunds in case of manufacturing defects.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-600 mb-3">Personalized Products</h3>
                  <p className="text-red-700">
                    Custom-formulated supplements, personalized wellness plans, or products specifically 
                    created based on your health profile cannot be returned for hygiene and safety reasons.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-600 mb-3">Opened Health Products</h3>
                  <p className="text-red-700">
                    Once opened, supplements, health products, or consumable wellness items cannot be returned 
                    unless there is a verified manufacturing defect reported within the specified timeframe.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                6. Cancellation Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We understand that circumstances may change, and you may need to cancel an order. If you wish 
                to cancel an order, please contact our customer support team as soon as possible.
              </p>
              
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-600 mb-2">✓ Orders Can Be Cancelled If:</h3>
                  <ul className="list-disc list-inside space-y-1 text-green-700 ml-4">
                    <li>The order has not yet been shipped from our facility</li>
                    <li>The cancellation request is received during business hours</li>
                    <li>Custom or personalized products have not entered production</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-600 mb-2">⚠️ Orders Cannot Be Cancelled If:</h3>
                  <ul className="list-disc list-inside space-y-1 text-orange-700 ml-4">
                    <li>The order has already been shipped from our warehouse</li>
                    <li>Custom or personalized products have entered production phase</li>
                    <li>Digital products or services have been delivered or accessed</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                7. Shipping Damage
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If your wellness product arrives damaged due to shipping, please contact us immediately with 
                photos of the damaged packaging and product. We will work with our shipping partners to 
                resolve the issue and ensure you receive a replacement product promptly.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                8. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                For any questions about returns, refunds, or cancellations, please contact our customer 
                support team:
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
                    <span className="font-semibold text-wellness-700">Business Hours:</span> Monday - Saturday, 9:00 AM - 6:00 PM IST
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-wellness-700">Address:</span> Dr Lathashekhar Holistic Wellness Center<br />
                    8th Main Road, Srividya Nagar, Giri Nagar, II Phase, Banashankari 3rd Stage,<br />
                    Banashankari, Bangalore - 560098
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                9. Replacement and Exchange Policy
              </h2>
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold mt-1">
                    !
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-red-700 mb-2">Important Notice</h3>
                    <p className="text-red-700 font-medium">
                      Replacement and exchange services are not applicable for our wellness products.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">9.1. No Product Exchanges:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>We do not offer product exchanges for different sizes, flavors, or formulations</li>
                    <li>Customers cannot exchange one wellness product for another</li>
                    <li>Special requests for product substitutions are not accommodated</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">9.3. Reason for This Policy:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Maintains the highest hygiene and safety standards for health products</li>
                    <li>Ensures product integrity and authenticity</li>
                    <li>Complies with health and safety regulations for consumable wellness products</li>
                    <li>Prevents contamination and maintains quality control</li>
                  </ul>
                </div>
              </div>

              <div className="bg-wellness-100 border-l-4 border-wellness-500 p-4 rounded-r-lg mt-6">
                <p className="text-wellness-800 text-sm">
                  <strong>Alternative Solutions:</strong> While we cannot offer exchanges or replacements except for manufacturing defects, 
                  our customer service team is available to help address any concerns about product selection, 
                  usage guidance, or finding the most suitable wellness products for your needs before purchase.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                10. Shipping Policy
              </h2>
              <p className="text-gray-700 mb-4">
                For detailed information about our shipping procedures, delivery timelines, and shipping charges, 
                please refer to our comprehensive shipping policy outlined below:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">10.1. Shipping Areas:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>We ship to all major cities and towns across India</li>
                    <li>Coverage includes metro cities, tier-2 cities, and most tier-3 locations</li>
                    <li>Rural areas may have extended delivery times</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">10.2. Delivery Timeframes:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Metro Cities: 2-4 business days (standard delivery)</li>
                    <li>Other Cities: 4-7 business days</li>
                    <li>Remote locations: 7-10 business days</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">10.3. Shipping Charges:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Free shipping on orders above ₹999</li>
                    <li>₹50 flat shipping rate for orders below ₹999</li>
                    <li>Express delivery: ₹150 additional charge (select metro cities)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">10.4. Order Processing:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>All orders processed within 1-2 business days</li>
                    <li>Quality check performed before packaging</li>
                    <li>Tracking information provided via email and SMS</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">10.5. Special Handling:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Temperature-sensitive products shipped with appropriate controls</li>
                    <li>Fragile items receive extra padding and insurance</li>
                    <li>Special insulated packaging for heat-sensitive wellness products</li>
                  </ul>
                </div>
              </div>

              <div className="bg-wellness-100 border-l-4 border-wellness-500 p-4 rounded-r-lg mt-6">
                <p className="text-wellness-800 text-sm">
                  <strong>Note:</strong> Delivery times may vary due to weather conditions, holidays, or unforeseen circumstances. 
                  For complete shipping policy details, please visit our dedicated Shipping Policy page.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                11. Policy Updates
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to update this Return and Refund Policy at any time. Any changes will 
                be posted on this page with an updated "Last Updated" date. We encourage you to review this 
                policy periodically to stay informed about our return and refund procedures.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;