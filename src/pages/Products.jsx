import React, { useState } from 'react';
import { Star, Eye } from 'lucide-react';
import { products, cakeCategories, brownieCategories } from '../data/products';

export default function Products({ setPage, setSelectedProduct }) {
  const [activeTab, setActiveTab] = useState('all'); // all, cakes, brownies
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    // Main category filter
    const isCake = cakeCategories.includes(product.category);
    const isBrownie = brownieCategories.includes(product.category);
    
    if (activeTab === 'cakes' && !isCake) return false;
    if (activeTab === 'brownies' && !isBrownie) return false;
    
    // Subcategory filter
    if (selectedSubCategory !== 'all' && product.category !== selectedSubCategory) return false;
    
    return true;
  });

  const getSubcategories = () => {
    if (activeTab === 'cakes') return cakeCategories;
    if (activeTab === 'brownies') return brownieCategories;
    return [...cakeCategories, ...brownieCategories];
  };

  const handleOrder = (product) => {
    setSelectedProduct(product);
    if (cakeCategories.includes(product.category)) {
      setPage('order-cake');
    } else {
      setPage('order-brownie');
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-bakery-chocolate">Our Sweet Collection</h1>
        <p className="text-gray-500">
          From customized theme cakes to rich fudgy brownies, explore our menu crafted with premium ingredients.
        </p>
      </div>

      {/* Main Category Tabs */}
      <div className="flex justify-center border-b border-bakery-pink/20 pb-4">
        <div className="flex space-x-2 md:space-x-4 bg-bakery-softpink/20 p-1.5 rounded-full">
          <button
            onClick={() => { setActiveTab('all'); setSelectedSubCategory('all'); }}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'all' 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'text-bakery-dark hover:bg-bakery-pink/20'
            }`}
          >
            All Desserts
          </button>
          <button
            onClick={() => { setActiveTab('cakes'); setSelectedSubCategory('all'); }}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'cakes' 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'text-bakery-dark hover:bg-bakery-pink/20'
            }`}
          >
            Cakes
          </button>
          <button
            onClick={() => { setActiveTab('brownies'); setSelectedSubCategory('all'); }}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'brownies' 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'text-bakery-dark hover:bg-bakery-pink/20'
            }`}
          >
            Brownies
          </button>
        </div>
      </div>

      {/* Subcategory Pills - Horizontal scrollable on mobile */}
      <div className="flex overflow-x-auto py-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none justify-start md:justify-center space-x-2">
        <button
          onClick={() => setSelectedSubCategory('all')}
          className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
            selectedSubCategory === 'all'
              ? 'bg-bakery-dark text-white border-bakery-dark'
              : 'bg-white text-gray-600 border-gray-200 hover:border-bakery-pink'
          }`}
        >
          All Categories
        </button>
        {getSubcategories().map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubCategory(sub)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
              selectedSubCategory === sub
                ? 'bg-bakery-dark text-white border-bakery-dark'
                : 'bg-white text-gray-600 border-gray-200 hover:border-bakery-pink'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="glass-card flex flex-col justify-between overflow-hidden group">
              
              {/* Product Top */}
              <div className="space-y-4">
                {/* Product Image */}
                <div className="relative overflow-hidden h-64 bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-bold px-3 py-1 rounded-full border border-primary-100 shadow-sm">
                    {product.category}
                  </span>
                </div>

                {/* Product Info */}
                <div className="px-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-bakery-chocolate group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-amber-500 text-sm">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="font-bold text-bakery-chocolate">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews} reviews)</span>
                  </div>

                  {/* Weight and Flavors badge displays */}
                  <div className="space-y-1.5 pt-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Available Sizes:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.weightOptions.map(w => (
                        <span key={w} className="bg-bakery-cream border border-bakery-pink/15 text-bakery-chocolate text-[10px] px-2 py-0.5 rounded">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Popular Flavors:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.flavorOptions.map(f => (
                        <span key={f} className="bg-bakery-cream border border-bakery-pink/15 text-bakery-chocolate text-[10px] px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Price & Button */}
              <div className="p-6 pt-6 mt-4 border-t border-bakery-pink/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Starting Price</p>
                  <span className="text-2xl font-extrabold text-bakery-chocolate">
                    ₹{product.price}
                  </span>
                </div>
                <button
                  onClick={() => handleOrder(product)}
                  className="btn-primary py-2 px-5 text-sm"
                >
                  Order Now
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <p className="text-gray-500 text-lg font-serif">No products found in this category.</p>
          <button 
            onClick={() => { setActiveTab('all'); setSelectedSubCategory('all'); }}
            className="btn-secondary text-sm"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
}
