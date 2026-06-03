import React from 'react';
import { Heart, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
          The Craftsmanship
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-bakery-chocolate">Our Story</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Crafting delightful moments with oven-fresh custom creations and passion.
        </p>
      </div>

      {/* Brand Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-bakery-chocolate">
            Started with a Passion for Baking
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The Cake Bites began as a small home kitchen project in Tamil Nadu, driven by a deep love for creating desserts that not only look spectacular but taste absolutely sublime. What started as baking for family birthdays and close friends quickly turned into a dedicated home bakery serving customers across the region.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We realized that people wanted custom cakes that were moist, flavorful, and designed with surgical precision, rather than the mass-produced, overly sweet cakes from commercial bakeries. That's when we made it our mission to offer custom cakes and fudgy brownies baked strictly to order.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every layer, every scoop of frosting, and every sprinkle is handled by hand. Our reputation is built on this absolute attention to detail and personalized service.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-primary-100/50 rounded-3xl transform rotate-3"></div>
          <img 
            src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=600" 
            alt="Handcrafting cakes" 
            className="relative rounded-3xl object-cover w-full h-[400px] shadow-lg"
          />
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 mb-6">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-bakery-chocolate">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To provide our clients with custom-designed cakes and gourmet brownies that elevate their celebrations. We aim to offer an easy ordering process, reliable delivery, and premium taste, making every occasion unforgettable.
          </p>
        </div>

        <div className="glass-card p-10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-bakery-chocolate">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To become the premier destination for custom theme cakes and dessert orders in Tamil Nadu, recognized for our artistic designs, mouth-watering flavors, and excellent customer service, while retaining our signature home-style warmth.
          </p>
        </div>
      </section>

      {/* Fresh Ingredients & Quality Promise */}
      <section className="bg-bakery-softpink/20 rounded-3xl p-8 md:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 space-y-4">
            <span className="text-xs font-semibold uppercase text-primary-600 tracking-wider">
              Zero Compromise
            </span>
            <h2 className="text-3xl font-bold text-bakery-chocolate">Our Quality Promise</h2>
            <p className="text-sm text-gray-500">
              We stand by our baking ethics and ensure only the best treats arrive at your doorstep.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3 bg-white p-6 rounded-2xl shadow-sm border border-bakery-pink/5">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-bakery-chocolate">No Artificial Preservatives</h4>
              <p className="text-sm text-gray-500">
                All our products are baked fresh to order and contain no emulsifiers, stabilizers, or artificial shelf-life enhancers.
              </p>
            </div>

            <div className="space-y-3 bg-white p-6 rounded-2xl shadow-sm border border-bakery-pink/5">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-bakery-chocolate">Premium Belgian Cocoa</h4>
              <p className="text-sm text-gray-500">
                We import fine Belgian chocolate and Dutch-processed cocoa powder to give our brownies and chocolate cakes their signature richness.
              </p>
            </div>

            <div className="space-y-3 bg-white p-6 rounded-2xl shadow-sm border border-bakery-pink/5">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-bakery-chocolate">Fresh Local Dairy</h4>
              <p className="text-sm text-gray-500">
                We source our butter, heavy cream, and milk daily from local farms to ensure freshness and richness in our frostings.
              </p>
            </div>

            <div className="space-y-3 bg-white p-6 rounded-2xl shadow-sm border border-bakery-pink/5">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-bakery-chocolate">100% Hygienic Kitchen</h4>
              <p className="text-sm text-gray-500">
                Our workspace is sterilized and deep-cleaned daily. We follow strict safety standards during baking and packing.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
