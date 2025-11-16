import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InstagramIcon from './InstagramIcon';
import FacebookIcon from './FacebookIcon';
import YouTubeIcon from './YouTubeIcon';
import { preserveCartId, navigateWithScroll } from '../utils/navigation';
import { useCart } from '../hooks/useCart';
import Logo from './Logo';

const Footer = () => {
  const { cartUuid } = useCart();
  const navigate = useNavigate();

  // Helper function to preserve cart ID for internal links
  const getNavUrl = (path) => preserveCartId(path, cartUuid);

  // Handle navigation with scroll to top
  const handleNavigation = (path) => {
    navigateWithScroll(navigate, path, cartUuid);
  };

  return (
    <footer className="bg-gradient-to-r from-green-800 to-emerald-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl"><Logo/></span>
              <span className="text-xl font-bold">Dr Lathshekar Holistic wellness private limited</span>
            </div>
            <p className="text-green-100 mb-4 leading-relaxed">
              Your trusted partner in wellness. We provide premium health products and expert guidance 
              to support your journey to optimal well-being.
            </p>
            <p className="text-green-200 text-sm leading-relaxed italic">
              <strong>Disclaimer:</strong> Products support general wellness and the body's natural healing processes. 
              Not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before use.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-green-200">
              <li><button onClick={() => handleNavigation('/about')} className="hover:text-white transition-colors text-left">About Us</button></li>
              <li><button onClick={() => handleNavigation('/products')} className="hover:text-white transition-colors text-left">Products</button></li>
              {/* <li><a href="https://www.drlathashekhar.com/blog.php" className="hover:text-white transition-colors">Blog</a></li> */}
              <li><button onClick={() => handleNavigation('/contact')} className="hover:text-white transition-colors text-left">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-green-200">
              <li>
                <button onClick={() => handleNavigation('/privacy-policy')} className="hover:text-white transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/terms-of-service')} className="hover:text-white transition-colors text-left">
                  Terms of Service
                </button>
              </li>
              {/* <li>
                <button onClick={() => handleNavigation('/shipping-policy')} className="hover:text-white transition-colors text-left">
                  Shipping Policy
                </button>
              </li> */}
              <li>
                <button onClick={() => handleNavigation('/return-refund-policy')} className="hover:text-white transition-colors text-left">
                  Return Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/drlathashekharofficial/" className="text-green-200 hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/drlathashekhar/" className="text-green-200 hover:text-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://www.youtube.com/channel/UCX-ZpeMSqN5b_oLCuNHMT4g" className="text-green-200 hover:text-white transition-colors">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-600 mt-8 pt-8 text-center text-green-100">
          <p>&copy; 2025 Dr Lathshekar Wellness. All rights reserved. Made with 💚 for your health.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
