import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, Send, CheckCircle, Mail } from 'lucide-react';
import { WhatsAppIcon } from '../components/Icons';
import { brownieCategories } from '../data/products';
import { addOrder } from '../utils/db';

export default function BrownieOrder({ selectedProduct, setSelectedProduct, setPage }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    mobile: '',
    email: '',
    product_name: '',
    category: 'Brownie Boxes',
    quantity: 1,
    weight: 'Box of 6',
    flavor: 'Classic Fudgy',
    delivery_date: '',
    delivery_address: '',
    notes: ''
  });

  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        product_name: selectedProduct.name,
        category: selectedProduct.category,
        weight: selectedProduct.weightOptions[0] || 'Box of 6',
        flavor: selectedProduct.flavorOptions[0] || 'Classic Fudgy'
      }));
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.mobile || !formData.product_name || !formData.delivery_date) {
      alert("Please fill in all required fields.");
      return;
    }

    const newOrder = await addOrder({
      customer_name: formData.customer_name,
      mobile: formData.mobile,
      email: formData.email,
      product_name: formData.product_name,
      category: formData.category,
      quantity: parseInt(formData.quantity) || 1,
      weight: formData.weight, // Used as quantity/box selector in brownie context
      flavor: formData.flavor,
      delivery_date: formData.delivery_date,
      delivery_address: formData.delivery_address,
      notes: formData.notes
    });

    setOrderSuccess(newOrder);
  };

  const handleWhatsAppRedirect = () => {
    if (!orderSuccess) return;

    const message = `Hello The Cake Bites,

I'd like to confirm my brownie order!
*Order ID:* ${orderSuccess.order_id}

*Details:*
- *Customer Name:* ${orderSuccess.customer_name}
- *Brownie Type:* ${orderSuccess.product_name}
- *Category:* ${orderSuccess.category}
- *Pack Size:* ${orderSuccess.weight}
- *Flavor:* ${orderSuccess.flavor}
- *Order Quantity:* ${orderSuccess.quantity} box(es)
- *Delivery Date:* ${orderSuccess.delivery_date}
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
          <h1 className="text-3xl font-bold text-bakery-chocolate">Brownie Order Request Sent!</h1>
          <p className="text-gray-500">Your request has been registered under ID: <span className="font-bold text-primary-600">{orderSuccess.order_id}</span></p>
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
            Click the button below to connect with us on WhatsApp and send your order details for instant verification and GPay billing info.
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
              Back to Menu
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
            Brownie Order Booking
          </h1>
          <p className="text-gray-500 mt-1">Order our fudgy, mouth-watering brownie boxes. Hand-packed and delivered fresh.</p>
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

            {/* Brownie details */}
            <div>
              <label className="label-text">Brownie Selection *</label>
              <input
                type="text"
                name="product_name"
                required
                placeholder="e.g. Classic Fudgy Brownie Box"
                className="input-field"
                value={formData.product_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label-text">Brownie Category *</label>
              <select
                name="category"
                className="input-field"
                value={formData.category}
                onChange={handleChange}
              >
                {brownieCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text">Pack Size Selection *</label>
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
                    <option value="Box of 6">Box of 6</option>
                    <option value="Box of 12">Box of 12</option>
                    <option value="9x9 Inch Platter">9x9 Inch Platter</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="label-text">Brownie Flavor / Sub-type *</label>
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
                    <option value="Classic Fudgy">Classic Fudgy</option>
                    <option value="Nutella Swirl">Nutella Swirl</option>
                    <option value="Triple Chocolate Chunk">Triple Chocolate Chunk</option>
                    <option value="Lotus Biscoff Swirl">Lotus Biscoff Swirl</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="label-text">Quantity (Number of boxes) *</label>
              <input
                type="number"
                name="quantity"
                min="1"
                required
                className="input-field"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

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

            <div className="sm:col-span-2">
              <label className="label-text">Custom Notes (Optional)</label>
              <textarea
                name="notes"
                rows="3"
                placeholder="E.g. eggless option, gift card messages, ribbon color preferences, etc."
                className="input-field"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base font-bold shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
              Place Brownie Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
