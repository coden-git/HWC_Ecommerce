import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add API call here to send the form data
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-wellness-700 mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg italic">Your Daily Dose of Life</p>
          <p className="text-wellness-600 mt-2">Get in touch with us for personalized wellness guidance</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          {/* <div className="bg-white rounded-2xl shadow-xl p-8 border border-wellness-200">
            <h2 className="text-2xl font-bold text-wellness-700 mb-6">Enquire Now</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-wellness-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-wellness-500 transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-wellness-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-wellness-500 transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="yoga-classes">Yoga Classes</option>
                  <option value="therapy-consultation">Therapy Consultation</option>
                  <option value="mudra-workshop">Mudra Workshop</option>
                  <option value="teacher-training">Teacher Training</option>
                  <option value="online-classes">Online Classes</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-wellness-500 transition-colors"
                  placeholder="Tell us about your wellness goals or any specific questions you have..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-wellness-600 to-wellness-700 hover:from-wellness-700 hover:to-wellness-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
              >
                Submit Inquiry
              </button>
            </form>
          </div> */}

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Our Branches */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-wellness-200">
              <h2 className="text-2xl font-bold text-wellness-700 mb-6">Our Branches</h2>
              
              <div className="space-y-8">
                {/* Main Center */}
                <div className="border-l-4 border-wellness-500 pl-6">
                  <h3 className="text-lg font-semibold text-wellness-600 mb-3">
                    Dr Lathashekhar Holistic Wellness Center
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="text-wellness-500 mt-1">📍</span>
                      <p className="text-gray-700">
                        8th Main Road, Srividya Nagar, Giri Nagar, II Phase,<br />
                        Banashankari 3rd Stage, Banashankari,<br />
                        Bangalore - 560098
                      </p>
                    </div>
                  </div>
                </div>

                {/* Second Branch */}
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-lg font-semibold text-green-600 mb-3">
                    Nithya Sanjeevini Yoga Prathishtana
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1">📍</span>
                      <p className="text-gray-700">
                        No 63, LIC Housing Layout,<br />
                        Behind Century Indus Apartments,<br />
                        Pattanagere, RR Nagar, Bangalore - 560085
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-wellness-200">
              <h2 className="text-2xl font-bold text-wellness-700 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-wellness-100 rounded-full flex items-center justify-center">
                    <span className="text-wellness-600 text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Call Us</h3>
                    <p className="text-gray-600">+91 9535660110</p>
                    <p className="text-gray-600">+91 9740410450</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-wellness-100 rounded-full flex items-center justify-center">
                    <span className="text-wellness-600 text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Us</h3>
                    <p className="text-gray-600 text-sm">drlathashekharwellnesscenter@gmail.com</p>
                    <p className="text-gray-600 text-sm">support@drlathashekhar.com</p>
                    <p className="text-gray-600 text-sm">helpdesk@drlathashekhar.com</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                    <a 
                      href="https://api.whatsapp.com/send?phone=919535660110" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">🕐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Quick Links */}
            <div className="bg-gradient-to-br from-wellness-50 to-wellness-100 rounded-2xl shadow-xl p-8 border border-wellness-200">
              <h2 className="text-2xl font-bold text-wellness-700 mb-6">Our Services</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-wellness-500 rounded-full"></span>
                    <span className="text-gray-700 text-sm">Yoga Classes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-wellness-500 rounded-full"></span>
                    <span className="text-gray-700 text-sm">Mudra Therapy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-wellness-500 rounded-full"></span>
                    <span className="text-gray-700 text-sm">Teacher Training</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-wellness-500 rounded-full"></span>
                    <span className="text-gray-700 text-sm">Therapy Consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-wellness-500 rounded-full"></span>
                    <span className="text-gray-700 text-sm">Online Classes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-wellness-500 rounded-full"></span>
                    <span className="text-gray-700 text-sm">Wellness Products</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-wellness-200 rounded-lg">
                <p className="text-wellness-800 text-sm">
                  <strong>Note:</strong> Dr. Lathashekhar started her yoga career at the age of 29 and with an 
                  average of 4 hours per day of rigorous and continuous Yoga practice, she mastered the art of Yoga.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-wellness-600 to-wellness-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Begin Your Wellness Journey?</h2>
          <p className="text-wellness-100 mb-6">
            Join thousands of people who have transformed their lives through our holistic wellness approach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919535660110"
              className="bg-white text-wellness-700 font-semibold py-3 px-6 rounded-lg hover:bg-wellness-50 transition-colors cursor-pointer"
            >
              Call Now: +91 9535660110
            </a>
            <a 
              href="https://api.whatsapp.com/send?phone=919535660110" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;