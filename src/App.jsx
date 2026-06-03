import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Heart, Sparkles, ShieldAlert } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './components/Icons';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import CustomCakeOrder from './pages/CustomCakeOrder';
import BrownieOrder from './pages/BrownieOrder';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

// Database Initialization
import { initDb } from './utils/db';

export default function App() {
  const [page, setPage] = useState('home'); // home, about, products, order-cake, order-brownie, contact, admin
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize DB on mount
  useEffect(() => {
    initDb();
    
    // Hash Routing Handler
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'products', 'order-cake', 'order-brownie', 'contact', 'admin'].includes(hash)) {
        setPage(hash);
      } else {
        setPage('home');
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when page state changes programmatically
  const navigateTo = (newPage) => {
    window.location.hash = `#${newPage}`;
    setPage(newPage);
    setMobileMenuOpen(false);
  };

  const renderActivePage = () => {
    switch (page) {
      case 'home':
        return <Home setPage={navigateTo} setSelectedProduct={setSelectedProduct} />;
      case 'about':
        return <About />;
      case 'products':
        return <Products setPage={navigateTo} setSelectedProduct={setSelectedProduct} />;
      case 'order-cake':
        return (
          <CustomCakeOrder 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
            setPage={navigateTo} 
          />
        );
      case 'order-brownie':
        return (
          <BrownieOrder 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
            setPage={navigateTo} 
          />
        );
      case 'contact':
        return <Contact />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home setPage={navigateTo} setSelectedProduct={setSelectedProduct} />;
    }
  };

  const navLinks = [
    { label: 'Home', value: 'home' },
    { label: 'Menu', value: 'products' },
    { label: 'Our Story', value: 'about' },
    { label: 'Contact', value: 'contact' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bakery-cream">
      
      {/* Floating Glass Navbar */}
      <header className="glass-header sticky top-0 w-full shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo and Brand Name */}
            <div 
              onClick={() => navigateTo('home')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <img 
                src="/logo.png" 
                alt="The Cake Bites Logo" 
                className="w-12 h-12 rounded-full border border-bakery-pink/20 object-cover shadow-sm group-hover:scale-105 transition-transform" 
              />
              <div>
                <span className="text-xl font-bold tracking-tight text-bakery-chocolate group-hover:text-primary-600 transition-colors">
                  The Cake Bites
                </span>
                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider -mt-0.5">
                  Tamil Nadu Home Bakery
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => navigateTo(link.value)}
                  className={`text-sm font-semibold transition-colors py-1 ${
                    page === link.value 
                      ? 'text-primary-600 border-b-2 border-primary-600' 
                      : 'text-bakery-dark/80 hover:text-primary-600'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => navigateTo('admin')}
                className={`text-sm font-semibold transition-colors py-1 flex items-center gap-1 ${
                  page === 'admin' 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-bakery-dark/80 hover:text-primary-600'
                }`}
              >
                Dashboard
              </button>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href="https://wa.me/919876543210?text=Hello%20The%20Cake%20Bites,%20I'd%20like%20to%20place%20an%20order." 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold hover:text-emerald-600 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
                Quick Inquiry
              </a>
              <button 
                onClick={() => navigateTo('products')}
                className="btn-primary py-2 px-5 text-sm"
              >
                Order Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => navigateTo('products')}
                className="px-4 py-1.5 bg-primary-600 text-white rounded-full text-xs font-bold"
              >
                Order
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-bakery-dark hover:bg-bakery-softpink/20 rounded-xl"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-bakery-pink/10 bg-white/95 backdrop-blur-md animate-fade-in">
            <div className="px-4 pt-3 pb-6 space-y-3 shadow-inner">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => navigateTo(link.value)}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                    page === link.value
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-bakery-dark hover:bg-bakery-softpink/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => navigateTo('admin')}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  page === 'admin'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-bakery-dark hover:bg-bakery-softpink/10'
                }`}
              >
                Admin Dashboard
              </button>
              <div className="border-t border-bakery-pink/15 pt-4 flex flex-col gap-3 px-4">
                <a 
                  href="https://wa.me/919876543210?text=Hello%20The%20Cake%20Bites"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5 text-emerald-500" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Premium Footer */}
      <footer className="bg-bakery-chocolate text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Brand Intro Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="The Cake Bites Logo" className="w-10 h-10 rounded-full border border-white/10" />
                <h3 className="text-xl font-bold font-serif">The Cake Bites</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Handcrafting custom designer cakes, theme cakes, and fudgy decadent brownies. Baked to order with love.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com" className="p-2 bg-white/5 rounded-full hover:bg-primary-600 hover:text-white transition-colors">
                  <InstagramIcon className="w-4.5 h-4.5" />
                </a>
                <a href="https://wa.me/919876543210" className="p-2 bg-white/5 rounded-full hover:bg-emerald-600 hover:text-white transition-colors">
                  <WhatsAppIcon className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-primary-400">Quick Navigation</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                {navLinks.map((link) => (
                  <li key={link.value}>
                    <button 
                      onClick={() => navigateTo(link.value)} 
                      className="hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => navigateTo('admin')} 
                    className="hover:text-primary-400 transition-colors"
                  >
                    Admin Area
                  </button>
                </li>
              </ul>
            </div>

            {/* Cake Categories Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-primary-400">Popular Offerings</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => navigateTo('products')} className="hover:text-primary-400">Custom Theme Cakes</button></li>
                <li><button onClick={() => navigateTo('products')} className="hover:text-primary-400">Gourmet Photo Cakes</button></li>
                <li><button onClick={() => navigateTo('products')} className="hover:text-primary-400">Nutella Swirl Brownies</button></li>
                <li><button onClick={() => navigateTo('products')} className="hover:text-primary-400">Wedding Tiered Cakes</button></li>
              </ul>
            </div>

            {/* Contact Quick details */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-primary-400">Direct Contact</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary-400" />
                  <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
                </li>
                <li className="flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <a href="https://wa.me/919876543210" className="hover:text-white">Chat on WhatsApp</a>
                </li>
                <li className="text-xs">
                  <p className="font-semibold text-gray-300">Hub Location:</p>
                  <p>Mount Road, Chennai, Tamil Nadu - 600002</p>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & SEO Footer */}
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row md:justify-between items-center text-xs text-gray-500 gap-4">
            <p>© {new Date().getFullYear()} The Cake Bites. All rights reserved. | Powered by TMCyberTech</p>
            <div className="flex gap-4">
              <span className="hover:underline cursor-help" title="Website is highly optimized for fast page loads and keywords.">SEO Optimized</span>
              <span>•</span>
              <span className="hover:underline cursor-help" title="Netlify deployment serverless functions are configured.">MongoDB Atlas Backed</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
