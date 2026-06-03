import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, Send, CheckCircle, Mail } from 'lucide-react';
import { WhatsAppIcon } from '../components/Icons';
import { cakeCategories } from '../data/products';
import { addOrder } from '../utils/db';

export default function CustomCakeOrder({ selectedProduct, setSelectedProduct, setPage }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    mobile: '',
    email: '',
    product_name: '',
    category: 'Birthday Cakes',
    weight: '1 KG',
    flavor: 'Classic Dark Chocolate',
    delivery_date: '',
    delivery_time: '17:00',
    delivery_address: '',
    notes: '',
    refImage: null
  });

  const [orderSuccess, setOrderSuccess] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        product_name: selectedProduct.name,
        category: selectedProduct.category,
        weight: selectedProduct.weightOptions[0] || '1 KG',
        flavor: selectedProduct.flavorOptions[0] || 'Classic Dark Chocolate'
      }));
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, refImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.mobile || !formData.product_name || !formData.delivery_date) {
      alert("Please fill in all required fields.");
      return;
    }

    // Save order in Database
    const newOrder = await addOrder({
      customer_name: formData.customer_name,
      mobile: formData.mobile,
      email: formData.email,
      product_name: formData.product_name,
      category: formData.category,
      quantity: 1,
      weight: formData.weight,
      flavor: formData.flavor,
      delivery_date: formData.delivery_date,
      delivery_time: formData.delivery_time,
      delivery_address: formData.delivery_address,
      notes: `${formData.notes}${formData.refImage ? ' (Reference image uploaded)' : ''}`
    });

    setOrderSuccess(newOrder);
  };

  const handleWhatsAppRedirect = () => {
    if (!orderSuccess) return;
    
    const message = `Hello The Cake Bites,

I'd like to confirm my order!
*Order ID:* ${orderSuccess.order_id}

*Details:*
- *Customer Name:* ${orderSuccess.customer_name}
- *Cake Name:* ${orderSuccess.product_name}
- *Category:* ${orderSuccess.category}
- *Weight:* ${orderSuccess.weight}
- *Flavor:* ${orderSuccess.flavor}
- *Delivery Date:* ${orderSuccess.delivery_date}
- *Delivery Time:* ${orderSuccess.delivery_time}
- *Delivery Address:* ${orderSuccess.delivery_address}
- *Notes:* ${orderSuccess.notes}

Please confirm my order and send payment details. Thank you!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-4">
          <CheckCircle className="w-12 h-12" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-bakery-chocolate">Order Submitted Successfully!</h1>
          <p className="text-gray-500">Your order has been recorded with Order ID: <span className="font-bold text-primary-600">{orderSuccess.order_id}</span></p>
        </div>

        {/* Notifications Visual representation */}
        <div className="glass-card p-6 border border-emerald-100 text-left space-y-4 max-w-md mx-auto">
          <h3 className="font-bold text-bakery-chocolate flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary-500" />
            Automated Notifications Sent
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>To Client (Email Confirmation):</span>
              <span className="font-semibold text-emerald-600">Sent (Brevo)</span>
            </div>
            <div className="flex justify-between">
              <span>To Owner (New Order Alert):</span>
              <span className="font-semibold text-emerald-600">Sent (Brevo)</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Click the button below to connect with us on WhatsApp and send your order summary to speed up the confirmation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsAppRedirect}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Complete on WhatsApp
            </button>
            <button
              onClick={() => {
                setSelectedProduct(null);
                setPage('products');
                window.scrollTo(0, 0);
              }}
              className="btn-secondary"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => { setSelectedProduct(null); setPage('products'); window.scrollTo(0, 0); }}
        className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </button>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-bakery-chocolate flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-primary-600" />
            Custom Cake Booking
          </h1>
          <p className="text-gray-500 mt-1">Fill out the details below. We will customize the cake according to your choice.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Customer Details */}
            <div className="sm:col-span-2">
              <label className="label-text">Customer Name *</label>
              <input
                type="text"
                name="customer_name"
                required
                placeholder="Enter your full name"
                className="input-field"
                value={formData.customer_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label-text">Mobile Number (WhatsApp) *</label>
              <input
                type="tel"
                name="mobile"
                required
                placeholder="10-digit mobile number"
                className="input-field"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label-text">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email (optional)"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Cake Specifics */}
            <div>
              <label className="label-text">Cake Name *</label>
              <input
                type="text"
                name="product_name"
                required
                placeholder="e.g. Red Velvet, Custom Design"
                className="input-field"
                value={formData.product_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label-text">Cake Category *</label>
              <select
                name="category"
                className="input-field"
                value={formData.category}
                onChange={handleChange}
              >
                {cakeCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text">Weight Option *</label>
              <select
                name="weight"
                className="input-field"
                value={formData.weight}
                onChange={handleChange}
              >
                {selectedProduct?.weightOptions ? (
                  selectedProduct.weightOptions.map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))
                ) : (
                  <>
                    <option value="0.5 KG">0.5 KG</option>
                    <option value="1 KG">1 KG</option>
                    <option value="1.5 KG">1.5 KG</option>
                    <option value="2 KG">2 KG</option>
                    <option value="3 KG+">3 KG+</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="label-text">Flavor Option *</label>
              <select
                name="flavor"
                className="input-field"
                value={formData.flavor}
                onChange={handleChange}
              >
                {selectedProduct?.flavorOptions ? (
                  selectedProduct.flavorOptions.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))
                ) : (
                  <>
                    <option value="Classic Dark Chocolate">Classic Dark Chocolate</option>
                    <option value="Signature Cream Cheese">Signature Cream Cheese</option>
                    <option value="Vanilla Bean & Custard">Vanilla Bean & Custard</option>
                    <option value="Butterscotch Crunch">Butterscotch Crunch</option>
                    <option value="Fresh Fruit Mix">Fresh Fruit Mix</option>
                  </>
                )}
              </select>
            </div>

            {/* Delivery details */}
            <div>
              <label className="label-text">Preferred Delivery Date *</label>
              <input
                type="date"
                name="delivery_date"
                required
                className="input-field"
                value={formData.delivery_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label-text">Preferred Delivery Time *</label>
              <input
                type="time"
                name="delivery_time"
                required
                className="input-field"
                value={formData.delivery_time}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label-text">Delivery Address *</label>
              <textarea
                name="delivery_address"
                required
                rows="3"
                placeholder="Full address with pincode and landmarks"
                className="input-field"
                value={formData.delivery_address}
                onChange={handleChange}
              />
            </div>

            {/* Custom Notes & Reference Image Upload */}
            <div className="sm:col-span-2">
              <label className="label-text">Special Instructions / Custom Wording</label>
              <textarea
                name="notes"
                rows="3"
                placeholder="Mention any lettering on the cake, dietary limits (eggless, sugar-free), color theme details etc."
                className="input-field"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label-text">Upload Reference Image (Mock)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-bakery-pink/25 rounded-2xl bg-white/30 hover:border-primary-500 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h20a4 4 0 004-4V20m-6-6l-2-2H20"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-semibold text-primary-600 hover:text-primary-700 focus-within:outline-none"
                    >
                      <span>Upload a reference image</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        accept="image/*"
                        className="sr-only" 
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                </div>
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-400 mb-1.5">Image Preview:</p>
                  <img src={imagePreview} alt="Preview" className="h-40 rounded-xl object-cover border border-bakery-pink/25" />
                </div>
              )}
            </div>

          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base font-bold shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
              Submit Order Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
