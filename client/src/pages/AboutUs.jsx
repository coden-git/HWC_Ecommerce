import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-wellness-200">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-wellness-700 mb-4">About Dr Lathashekhar</h1>
            <p className="text-gray-600 italic text-lg">
              Commitment - A Key to Success
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="bg-wellness-100 border-l-4 border-wellness-500 p-6 rounded-r-lg mb-12">
              <p className="text-wellness-800 font-medium leading-relaxed m-0 text-lg">
                Yoganidhi Dr. Lathashekhar is a renowned wellness expert, author, and holistic healer 
                who has dedicated her life to spreading the transformative power of Yoga, Mudra therapy, 
                and natural healing. With over 15 years of experience and numerous national and 
                international accolades, she continues to touch lives through her unique healing approach.
              </p>
            </div>

            {/* Early Life Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-wellness-700 mb-6 border-b-2 border-wellness-500 pb-2">
                Early Life & Journey
              </h2>
              <div className="bg-wellness-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dr. Lathashekhar has settled in Bangalore, Karnataka, and was fond of Mudra and Yoga from the very early stage of life. 
                  She completed her primary and secondary education with grace and enthusiasm. After completing PUC, she enrolled in Yoga and Bharatanatyam.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The grace and satisfaction of mudra and healing treatment through yoga made her decision firm to choose yoga as a carrier for a lifetime. 
                  Her contribution lends a certain cachet to society. She has proven experience with the technique that 
                  <strong className="text-wellness-600"> "mudra with naturopathy techniques can conquer any disease."</strong>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  She has a strong belief that any critical and delicate health issue related to our loved ones in any age category can be cured 
                  with healing through yoga technique and Crystal therapy (Pranashakthi Jagrathi Chikithsa). With deep knowledge and experience, 
                  she has treated people suffering from BP, Heart problems, back pain, Diabetes, Asthma, cancer, and breathlessness. 
                  Women suffering from PCOD, PCOS, and infertility have got relief from healing through yoga techniques and crystal therapy.
                </p>
              </div>
            </section>

            {/* Education & Qualifications */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-wellness-700 mb-6 border-b-2 border-wellness-500 pb-2">
                Education & Qualifications
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-wellness-50 to-wellness-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-wellness-600 mb-4">Academic Achievements</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-wellness-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Bachelor of Naturopathy & Yogic Sciences (B.Nat)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-wellness-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Bachelor of Ayurvedic Medicine and Surgery (BAMS)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-wellness-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Master of Science in Yoga (MSc. Yoga)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-wellness-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Ph.D. from University of the Americas, Florida, USA</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-wellness-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Certificate in Therapeutic Yoga</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-wellness-600 mb-4">Specialized Training</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Pranic Healing Expert</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Reiki (II Degree)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Color Therapy Specialist</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Touch Therapy Practitioner</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Transcendental Meditation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Mudra Praveene (Master in Mudra Therapy)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-wellness-100 border-l-4 border-wellness-500 p-4 rounded-r-lg">
                <p className="text-wellness-800 text-sm italic">
                  In her 15+ years of career, she has treated kids and the elderly. Challenging problems like BP, diabetes, 
                  back pain, asthma, children's development, and mental health can be cured with yoga. She has a unique skill 
                  set of Alternative Healing through Yoga and Mudra with naturopathy techniques.
                </p>
              </div>
            </section>

            {/* Yoga Champion Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-wellness-700 mb-6 border-b-2 border-wellness-500 pb-2">
                Dedicated Yoga Instructor & Champion
              </h2>
              
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-8 mb-6">
                <div className="text-center mb-6">
                  <div className="inline-block bg-orange-100 rounded-full px-6 py-2 mb-4">
                    <span className="text-orange-700 font-bold text-lg">25+ National & International Championships</span>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4 text-center">
                  Dr. Lathashekhar is known for her aggressive and regular practice of Yoga which made her win several 
                  (more than 25 times) National and International yoga championships. With her growing popularity as a yoga 
                  competitor, she has found a more satisfying expression in teaching and treating people through Yoga.
                </p>
                
                <blockquote className="border-l-4 border-orange-400 pl-4 italic text-gray-600 text-center">
                  "Regular practice of yoga can do miracles to your body and mind. Perseverance, Determination, 
                  Dedication are the prerequisites for perfection. No deviation from this will ever yield results."
                  <footer className="text-wellness-700 font-semibold mt-2">– Yoganidhi Dr. Lathashekhar</footer>
                </blockquote>
              </div>
            </section>

            {/* Renowned Therapist Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-wellness-700 mb-6 border-b-2 border-wellness-500 pb-2">
                Renowned Therapist & Healer
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-wellness-600 mb-4">Treatment Methods</h3>
                  <div className="bg-wellness-50 rounded-lg p-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-wellness-500 rounded-full"></span>
                        <span>Yoga & Pranayama</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-wellness-500 rounded-full"></span>
                        <span>Mudra Therapy</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-wellness-500 rounded-full"></span>
                        <span>Kriyas & Cleansing Techniques</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-wellness-500 rounded-full"></span>
                        <span>Herbal Combinations</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-wellness-500 rounded-full"></span>
                        <span>Yogic Diet Consultation</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-wellness-500 rounded-full"></span>
                        <span>Lifestyle Modification</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-wellness-600 mb-4">Conditions Treated</h3>
                  <div className="bg-green-50 rounded-lg p-6">
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Diabetes & Thyroid Problems</li>
                      <li>• Hypertension & Heart Issues</li>
                      <li>• Asthma & Respiratory Problems</li>
                      <li>• Back Pain & Knee Pain</li>
                      <li>• PCOD, PCOS & Infertility</li>
                      <li>• Depression, Anxiety & Stress</li>
                      <li>• Menstrual Problems</li>
                      <li>• Gastric Problems</li>
                      <li>• Memory & Concentration Issues</li>
                      <li>• Children's Development Issues</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-green-800 font-medium">
                  <strong>Success Stories:</strong> Dr. Lathashekhar's Therapy has gained enormous popularity for its benefits 
                  of high efficacy, no side effects, and low cost. Many diabetic and thyroid patients who came to her 
                  have stopped taking pills for the rest of their life!
                </p>
              </div>
            </section>

            {/* Author Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-wellness-700 mb-6 border-b-2 border-wellness-500 pb-2">
                Published Author
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-4">📖 Mudra Sanjeevini</h3>
                  <p className="text-gray-700 mb-4">
                    A comprehensive treatise on Hand gestures for self-healing, written in both Kannada & English. 
                    The book deals with a great number of hand gestures effective against almost all kinds of diseases.
                  </p>
                  <div className="bg-indigo-100 rounded-lg p-4">
                    <p className="text-indigo-800 text-sm">
                      <strong>Achievement:</strong> Sold more than 10,000 copies across Karnataka! 
                      The book was telecast through Kasturi Kannada channel for 2 consecutive months.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">📚 Yogasanjeevini</h3>
                  <p className="text-gray-700 mb-4">
                    A treatise on Yoga carrying her rich experience and understanding of Yogachikitsa. 
                    It comprises over 100 Asanas, pranayamas, kriyas with detailed descriptions and precautions.
                  </p>
                  <div className="bg-purple-100 rounded-lg p-4">
                    <p className="text-purple-800 text-sm">
                      <strong>Endorsements:</strong> Appreciated by legends like Dr. BM Hegde (renowned heart specialist) 
                      and Dr. Ravi (Cardiac Surgeon) with numerous testimonials.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Awards & Recognition */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-wellness-700 mb-6 border-b-2 border-wellness-500 pb-2">
                Awards & Recognition
              </h2>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-orange-700 mb-4">🏆 Major Awards</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Aryabhata International Award</li>
                      <li>• Suvarna Mahila Sadhaki Award</li>
                      <li>• Antararashtriya Yogasiri Award</li>
                      <li>• Lifetime Achievement Award</li>
                      <li>• Yoganidhi, Yogarathna, Yogavisharade</li>
                      <li>• Yogapraveene, Yogakalaprathibhe</li>
                      <li>• Yogabhushana, Rashtrabandhu</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-orange-700 mb-4">🙏 Honored By</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Shri Shri Ravishankara Guruji (Art of Living)</li>
                      <li>• Shri Shri Siddhaganga Swamiji</li>
                      <li>• Lion's Club Malleshwara</li>
                      <li>• Vipra Samaja of Shringeri</li>
                      <li>• Pontiff of Murusavira Matt</li>
                      <li>• Karnataka Social Development Society</li>
                      <li>• Institute of Ayush</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-wellness-700 mb-6 border-b-2 border-wellness-500 pb-2">
                Contact Information
              </h2>
              
              <div className="bg-wellness-50 border border-wellness-200 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-wellness-700 mb-3">Dr Lathashekhar Holistic Wellness Center</h3>
                    <p className="text-gray-700 text-sm mb-4">
                      8th Main Road, Srividya Nagar, Giri Nagar, II Phase,<br />
                      Banashankari 3rd Stage, Banashankari,<br />
                      Bangalore - 560098
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-wellness-700 mb-3">Get in Touch</h3>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p><strong>Email:</strong> drlathashekharwellnesscenter@gmail.com</p>
                      <p><strong>Phone:</strong> +91 9535660110</p>
                      <p><strong>Alternate:</strong> +91 9740410450</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;