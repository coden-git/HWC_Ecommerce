import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-wellness-200">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-wellness-700 mb-4">Terms of Service</h1>
            <p className="text-gray-600 italic border-b-2 border-wellness-200 pb-6">
              Last Updated: November 7, 2025
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-wellness-100 border-l-4 border-wellness-500 p-6 rounded-r-lg mb-8">
              <p className="text-wellness-800 font-medium leading-relaxed m-0">
                By purchasing and using our wellness products and services, you agree to comply with these 
                terms and conditions. If you do not agree with these terms, please do not use our products or services.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By purchasing and using our wellness products, digital services, and health guidance programs, 
                you agree to comply with these terms and conditions. If you do not agree with these terms, 
                please do not use our products or services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                2. Description of Products and Services
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">2.1. Wellness Products:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>We offer a range of wellness products including supplements, health devices, and wellness accessories</li>
                    <li>Each product is priced according to the Manufacturer's Recommended Price (MRP) as specified on our website</li>
                    <li>Products are intended for general wellness support and are not intended to diagnose, treat, cure, or prevent any disease</li>
                  </ul>
                </div>

                {/* <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">2.2. Digital Wellness Services:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>We provide digital wellness consultations, personalized health plans, and wellness guidance</li>
                    <li>Our services may include AI-powered health recommendations and personalized wellness content</li>
                    <li>Digital services are currently offered free of charge with product purchases, but we reserve the right to introduce fees in the future</li>
                  </ul>
                </div> */}

                {/* <div>
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">2.3. Professional Guidance:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Licensed healthcare professionals may provide wellness consultations and guidance</li>
                    <li>Professional advice is for informational purposes and does not replace medical treatment</li>
                    <li>Always consult with your primary healthcare provider before making significant health changes</li>
                  </ul>
                </div> */}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                3. Payment and Pricing
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-semibold">3.1.</span> The pricing for our wellness products is as specified in the MRP on our website. 
                  Payment is required before we ship products or provide premium services.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">3.2.</span> We accept various payment methods including credit cards, debit cards, 
                  and digital payment platforms as displayed during checkout.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">3.3.</span> All prices are inclusive of applicable taxes unless otherwise specified.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">3.4.</span> We reserve the right to modify product prices and service fees with 
                  reasonable notice to customers.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                4. User Responsibilities
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-semibold">4.1.</span> You are responsible for using our wellness products and services 
                  in accordance with their intended purpose and any applicable laws and regulations.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">4.2.</span> You must provide accurate health information and medical history 
                  when using our consultation services to ensure appropriate guidance.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">4.3.</span> You are responsible for any device and connectivity requirements 
                  necessary to access our digital wellness services.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">4.4.</span> You agree to follow product usage instructions and safety guidelines 
                  provided with each wellness product.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">4.5.</span> You acknowledge that wellness products and advice are supplementary 
                  to, not a replacement for, professional medical care.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                5. Privacy and Data
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may collect and use data related to your use of our wellness products and services, 
                including health-related information you voluntarily provide. Please refer to our 
                <a href="/privacy-policy" className="text-wellness-600 hover:text-wellness-700 underline"> Privacy Policy</a> 
                for detailed information on how we handle your personal and health data.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                6. Product Returns and Refunds
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-semibold">6.1.</span> We offer returns for unopened wellness products within 30 days 
                  of purchase, subject to our return policy.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">6.2.</span> Personalized wellness products and opened supplements may not 
                  be eligible for return due to health and safety regulations.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">6.3.</span> Digital services and consultations are generally non-refundable 
                  once delivered, except in cases of technical failure on our part.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                7. Changes to Terms and Services
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-semibold">7.1.</span> We reserve the right to modify these terms and conditions at any time. 
                  Any changes will be effective upon posting the updated terms on our website or notifying you via email.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">7.2.</span> We also reserve the right to modify, suspend, or discontinue 
                  any wellness service, with or without notice, while ensuring minimal disruption to ongoing customer care.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">7.3.</span> Continued use of our products and services after changes 
                  constitutes acceptance of the updated terms.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                8. Health and Safety Disclaimers
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-semibold">8.1.</span> Our wellness products and services are intended for general 
                  health support and are not intended to diagnose, treat, cure, or prevent any disease.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">8.2.</span> Always consult with a qualified healthcare professional before 
                  starting any new wellness regimen, especially if you have existing health conditions.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">8.3.</span> Individual results may vary, and we do not guarantee specific 
                  health outcomes from using our products or services.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">8.4.</span> Discontinue use of any product and consult a healthcare provider 
                  if you experience adverse reactions.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                9. Disclaimer of Warranties
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We provide our wellness products and services on an "as-is" and "as available" basis. 
                We do not make any warranties or representations regarding the accuracy, completeness, 
                or reliability of health recommendations, product effectiveness, or service availability. 
                All wellness advice is provided for informational purposes only.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                10. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To the extent permitted by law, we shall not be liable for any direct, indirect, incidental, 
                consequential, or special damages arising out of or in connection with the use of our wellness 
                products or services. This includes, but is not limited to, health complications, allergic 
                reactions, or unsatisfactory results from wellness programs.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                11. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These terms and conditions shall be governed by and construed in accordance with the laws 
                of India. Any disputes arising from these terms or the use of our wellness products and 
                services shall be subject to the jurisdiction of Indian courts.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                12. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about these terms and conditions, please contact us at:
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
                    8th Main Road, Srividya Nagar, Giri Nagar, II Phase, Banashankari 3rd Stage,<br />
                    Banashankari, Bangalore - 560098
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-wellness-700 mb-4 border-b-2 border-wellness-500 pb-2">
                13. Acknowledgment
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By using our wellness products and services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service. If you do not agree with these terms, 
                please discontinue use of our products and services immediately.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;