import React from 'react';
import { Link } from 'react-router-dom';
import InstagramIcon from './InstagramIcon';
import FacebookIcon from './FacebookIcon';
import YouTubeIcon from './YouTubeIcon';
import { preserveCartId } from '../utils/navigation';
import { useCart } from '../hooks/useCart';

const Footer = () => {
  const { cartUuid } = useCart();

  // Helper function to preserve cart ID for internal links
  const getNavUrl = (path) => preserveCartId(path, cartUuid);

  return (
    <footer className="bg-gradient-to-r from-green-800 to-emerald-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold">Wellness Co.</span>
            </div>
            <p className="text-green-100 mb-4 leading-relaxed">
              Your trusted partner in wellness. We provide premium health products and expert guidance 
              to support your journey to optimal well-being.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-green-200">
              <li><a href="https://www.drlathashekhar.com/profile.php" className="hover:text-white transition-colors">About Us</a></li>
              <li><Link to={getNavUrl('/products')} className="hover:text-white transition-colors">Products</Link></li>
              <li><a href="https://www.drlathashekhar.com/blog.php" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="https://www.drlathashekhar.com/contact.php" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-green-200">
              <li>
                <Link to={getNavUrl('/privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={getNavUrl('/terms-of-service')} className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              {/* <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li> */}
              <li>
                <Link to={getNavUrl('/return-refund-policy')} className="hover:text-white transition-colors">
                  Return Policy
                </Link>
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
          <p>&copy; 2025 Wellness Co. All rights reserved. Made with 💚 for your health.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
