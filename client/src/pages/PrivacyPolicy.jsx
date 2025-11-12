import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-wellness-200">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-wellness-700 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 italic border-b-2 border-wellness-200 pb-6">
              Last Updated: November 7, 2025
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-wellness-100 border-l-4 border-wellness-500 p-6 rounded-r-lg mb-8">
              <p className="text-wellness-800 font-medium leading-relaxed m-0">
                Your privacy is important to us. This Privacy Policy outlines how we collect, use, disclose, 
                and protect the personal information you provide to us when purchasing our wellness products 
                and using our services.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">We may collect the following types of personal information when you use our services:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">1.1. Personal Identification Information:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Shipping and billing address</li>
                  </ul>
                </div>

                {/* <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">1.2. Health and Wellness Information:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Health conditions or concerns (voluntarily provided)</li>
                    <li>Wellness goals and preferences</li>
                    <li>Product usage information and feedback</li>
                    <li>Dietary restrictions or allergies (if applicable)</li>
                  </ul>
                </div> */}

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">1.2. Payment Information:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Billing and payment information necessary for processing transactions</li>
                    <li>Note: We do not store payment card information; it is securely processed by our payment service provider</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">1.3. Usage Information:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Information about how you interact with our website and services</li>
                    <li>Product preferences and purchase history</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">We may use the personal information collected for the following purposes:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">2.1. Product Delivery and Service:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>To process and fulfill your wellness product orders</li>
                    <li>To provide personalized wellness recommendations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">2.2. Customer Support:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>To respond to your inquiries and provide customer support</li>
                    <li>To assist with product usage and wellness guidance</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">2.3. Personalization:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>To customize your wellness experience based on your preferences</li>
                    <li>To recommend suitable products for your wellness journey</li>
                    <li>To provide tailored health and wellness content</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">2.4. Communication:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>To send order confirmations and shipping updates</li>
                    <li>To share wellness tips, product information, and health-related content</li>
                    <li>To notify you about new products and services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">2.5. Legal Compliance:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>To comply with legal obligations and health product regulations</li>
                    <li>For tax reporting and fraud prevention</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                3. Sharing Your Information
              </h2>
              <p className="text-gray-700 mb-4">We may share your personal information with third parties in the following circumstances:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">3.1. Service Providers:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Shipping and logistics partners for product delivery</li>
                    <li>Payment processors for secure transaction handling</li>
                    <li>Healthcare professionals or wellness experts (with your consent)</li>
                    <li>Third-party service providers who assist in delivering our services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">3.2. Legal Compliance:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>When required by law or regulatory authorities</li>
                    <li>To protect our rights, privacy, safety, or property, or that of others</li>
                    <li>To comply with health product regulations and safety requirements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">3.3. Business Transfers:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>In connection with any merger, sale, or transfer of our business assets</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                4. Health Information Protection
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We take special care with any health-related information you provide. This information 
                is used solely to enhance your wellness experience and provide appropriate product 
                recommendations. We do not share your health information without your explicit consent, 
                except as required by law.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                5. Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal 
                information from unauthorized access, use, disclosure, alteration, or destruction. 
                However, please be aware that no method of transmitting data over the internet or 
                electronic storage is entirely secure.
              </p>
            </section>

            {/* <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                6. Your Rights and Choices
              </h2>
              <p className="text-gray-700 mb-4">You have certain rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Access: Request access to your personal information</li>
                <li>Correction: Request correction of inaccurate information</li>
                <li>Deletion: Request deletion of your personal information (subject to legal requirements)</li>
                <li>Portability: Request a copy of your data in a portable format</li>
                <li>Opt-out: Unsubscribe from marketing communications</li>
                <li>Restrict processing: Request restriction of processing in certain circumstances</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                7. Cookies and Tracking
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our website uses cookies and similar technologies to enhance your browsing experience, 
                analyze website traffic, and personalize content. You can control cookie settings 
                through your browser preferences.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                8. Children's Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our wellness products and services are intended for adults. We do not knowingly collect 
                personal information from children under 18 years of age without parental consent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                9. International Data Transfers
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you are located outside our primary jurisdiction, your information may be transferred 
                to and processed in countries with different privacy laws. We ensure appropriate 
                safeguards are in place for such transfers.
              </p>
            </section> */}

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                6. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, 
                legal requirements, or for other operational reasons. We will notify you of any material 
                changes by posting a notice on our website or through other communication channels.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                7. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about this Privacy Policy or the handling of your 
                personal information, please contact us at:
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
                    <span className="font-semibold text-wellness-700">Address:</span> Dr Lathashekhar Holistic Wellness Center
8th Main Road, Srividya Nagar, Giri Nagar, II Phase, Banashankari 3rd Stage, Banashankari, Bangalore - 560098
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                12. Consent
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By using our wellness products and services, you consent to the practices described in 
                this Privacy Policy. If you do not agree with this policy, please do not use our 
                products or services.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;