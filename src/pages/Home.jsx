import React from 'react';
import { Sparkles, Heart, Clock, Award, Star, ArrowRight } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '../components/Icons';
import { products, testimonials } from '../data/products';

export default function Home({ setPage, setSelectedProduct }) {
  // Show first 3 cakes and first 2 brownies as featured/best sellers
  const bestSellers = [
    products.find(p => p.id === "cake-1"),
    products.find(p => p.id === "cake-2"),
    products.find(p => p.id === "brownie-1"),
    products.find(p => p.id === "cake-5")
  ].filter(Boolean);

  const handleOrderProduct = (product) => {
    setSelectedProduct(product);
    if (product.category.includes("Brownie")) {
      setPage("order-brownie");
    } else {
      setPage("order-cake");
    }
    window.scrollTo(0, 0);
  };

  const instaPosts = [
    { id: 1, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400" },
    { id: 2, img: "https://images.unsplash.com/photo-1616260841546-742f1b8c6bc3?auto=format&fit=crop&q=80&w=400" },
    { id: 3, img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=400" },
    { id: 4, img: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=400" },
    { id: 5, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400" },
    { id: 6, img: "https://images.unsplash.com/photo-1548907040-4d42b52125ca?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-gradient-to-br from-bakery-softpink via-bakery-cream to-white pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="space-y-8 text-center lg:text-left z-10">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 font-semibold text-xs tracking-wider uppercase animate-pulse">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Pure Homemade Goodness
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-bakery-chocolate leading-tight">
                Freshly Baked Cakes <br />
                <span className="text-primary-600 italic font-serif">Made With Love</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                Crafting custom premium cakes, theme cakes, and fudgy decadent brownies for birthdays, weddings, and life's sweetest milestones across Tamil Nadu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => { setPage('products'); window.scrollTo(0, 0); }}
                  className="btn-primary flex items-center justify-center gap-2 group"
                >
                  Order Now 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button 
                  onClick={() => { setPage('about'); window.scrollTo(0, 0); }}
                  className="btn-secondary"
                >
                  Our Story
                </button>
              </div>
            </div>

            {/* Hero Right Image */}
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-bakery-pink/20 to-transparent rounded-full filter blur-3xl w-72 h-72 mx-auto"></div>
              <div className="relative animate-float max-w-md w-full">
                <div className="bg-white p-4 rounded-3xl shadow-premium border border-bakery-pink/10 transform rotate-2">
                  <img 
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600" 
                    alt="Signature Premium Cake" 
                    className="rounded-2xl object-cover w-full h-[350px]"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-white px-4 py-3 rounded-2xl shadow-lg border border-bakery-pink/10 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary-500 fill-primary-500" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Bestseller</p>
                      <p className="text-sm font-bold text-bakery-chocolate">Choco Truffle</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bakery Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=400" 
                alt="Baking Brownies" 
                className="rounded-2xl shadow-md w-full h-48 object-cover transform -rotate-1"
              />
              <img 
                src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400" 
                alt="Cupcakes Preparation" 
                className="rounded-2xl shadow-md w-full h-48 object-cover translate-y-6 transform rotate-2"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-bakery-chocolate leading-tight">
              Baking Sweet Memories Since 2023
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At <strong>The Cake Bites</strong>, we believe every celebration deserves a centerpiece that is both beautiful and delicious. As a home-grown custom bakery, we pour our heart and soul into every batter, frosting, and design.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From our famous decadent Nutella-swirled brownies to complex multi-tiered theme cakes, all our baked treats are crafted using premium quality ingredients and no preservatives.
            </p>
            <button 
              onClick={() => { setPage('about'); window.scrollTo(0, 0); }}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold gap-1"
            >
              Read our full story <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products / Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-bakery-chocolate">Our Best Sellers</h2>
          <p className="text-gray-500">A handpicked selection of our most loved cakes and brownies. Handcrafted to absolute perfection.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <div key={product.id} className="glass-card overflow-hidden group">
              <div className="relative overflow-hidden h-60 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-semibold px-3 py-1 rounded-full border border-primary-100">
                  {product.category}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-bakery-chocolate group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-1.5 text-amber-500 text-sm">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="font-bold text-bakery-chocolate">{product.rating}</span>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-extrabold text-bakery-chocolate">
                    ₹{product.price} <span className="text-xs text-gray-400 font-normal">onwards</span>
                  </span>
                  <button 
                    onClick={() => handleOrderProduct(product)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-semibold hover:bg-primary-700 transition-all shadow-sm hover:shadow"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => { setPage('products'); window.scrollTo(0, 0); }}
            className="btn-secondary"
          >
            View All Products
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-bakery-softpink/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-bakery-chocolate">Why Choose Us</h2>
            <p className="text-gray-500">Every single cake is baked from scratch with absolute dedication to design and taste.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-bakery-pink/10 text-center space-y-4 hover:shadow-premium transition-shadow">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-bakery-chocolate">Fresh Ingredients</h3>
              <p className="text-sm text-gray-500">We use only premium quality flour, Belgian chocolate, and fresh dairy. No chemical preservatives.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-bakery-pink/10 text-center space-y-4 hover:shadow-premium transition-shadow">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-bakery-chocolate">Bespoke Designs</h3>
              <p className="text-sm text-gray-500">Send us a photo or a theme, and we will sculpt it into a gorgeous, customized cake design.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-bakery-pink/10 text-center space-y-4 hover:shadow-premium transition-shadow">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-bakery-chocolate">Timely Delivery</h3>
              <p className="text-sm text-gray-500">Your cake arrives fresh and intact exactly at the promised slot. Handled with extreme care.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-bakery-pink/10 text-center space-y-4 hover:shadow-premium transition-shadow">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-bakery-chocolate">Premium Quality</h3>
              <p className="text-sm text-gray-500">Strict hygiene standards are maintained in our kitchen. Quality is guaranteed in every bite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-bakery-chocolate">Loved by Our Customers</h2>
          <p className="text-gray-500">See what our lovely customers say about our cakes and brownies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review) => (
            <div key={review.id} className="glass-card p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{review.text}"</p>
              </div>
              <div className="border-t border-bakery-pink/10 pt-4 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-bakery-chocolate text-sm">{review.name}</h4>
                  <p className="text-gray-400">{review.location}</p>
                </div>
                <span className="text-gray-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Grid Mockup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-bakery-chocolate flex items-center justify-center gap-2">
            <InstagramIcon className="w-8 h-8 text-primary-600" />
            Follow us @thecakebites
          </h2>
          <p className="text-gray-500">Check out our latest bakes, reels, and behind-the-scenes magic on Instagram.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {instaPosts.map((post) => (
            <a 
              key={post.id} 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="group relative overflow-hidden aspect-square rounded-2xl bg-gray-200 block"
            >
              <img 
                src={post.img} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <InstagramIcon className="w-8 h-8 text-white" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA / Contact Quick details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-bakery-chocolate to-bakery-dark rounded-3xl p-12 text-white relative overflow-hidden shadow-xl text-center md:text-left">
          <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight">
                Have a Custom Theme in Mind?
              </h2>
              <p className="text-gray-300 max-w-lg">
                Let's discuss and customize your dream cake. Fill out our simple query form or chat directly with our chef on WhatsApp.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <button 
                onClick={() => { setPage('order-cake'); window.scrollTo(0, 0); }}
                className="btn-primary bg-primary-500 hover:bg-primary-600 text-white border-0"
              >
                Custom Cake Form
              </button>
              <a 
                href="https://wa.me/919876543210?text=Hello%20The%20Cake%20Bites,%20I'd%20like%20to%20enquire%20about%20a%20custom%20cake." 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary bg-white text-bakery-dark border-0 flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
