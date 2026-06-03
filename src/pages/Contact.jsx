import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, CheckCircle } from 'lucide-react';
import { WhatsAppIcon } from '../components/Icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    // Simulate contact form submission
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-bakery-chocolate">Contact Us</h1>
        <p className="text-gray-500">
          Have questions or want to discuss a customized order? Get in touch with us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Contact Info Panel */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-2xl font-bold text-bakery-chocolate">Get in Touch</h3>
            
            <div className="space-y-6">
              <a 
                href="tel:+919876543210" 
                className="flex items-start gap-4 text-gray-600 hover:text-primary-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-100 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Call</p>
                  <p className="font-semibold text-bakery-chocolate">+91 98765 43210</p>
                  <p className="text-xs text-gray-400">Call us for quick orders</p>
                </div>
              </a>

              <a 
                href="https://wa.me/919876543210?text=Hello%20The%20Cake%20Bites" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-start gap-4 text-gray-600 hover:text-emerald-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 shrink-0">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">WhatsApp Chat</p>
                  <p className="font-semibold text-bakery-chocolate">Chat on WhatsApp</p>
                  <p className="text-xs text-gray-400">Click to connect instantly</p>
                </div>
              </a>

              <a 
                href="mailto:orders@thecakebites.in" 
                className="flex items-start gap-4 text-gray-600 hover:text-primary-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-100 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</p>
                  <p className="font-semibold text-bakery-chocolate">orders@thecakebites.in</p>
                  <p className="text-xs text-gray-400">Send custom requirements</p>
                </div>
              </a>

              <div className="flex items-start gap-4 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Business Hours</p>
                  <p className="font-semibold text-bakery-chocolate">09:00 AM - 09:00 PM</p>
                  <p className="text-xs text-gray-400">Open all 7 days</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Service Location</p>
                  <p className="font-semibold text-bakery-chocolate">Chennai & surrounding areas</p>
                  <p className="text-xs text-gray-400">Delivery across Tamil Nadu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 sm:p-10 space-y-6">
            <h3 className="text-2xl font-bold text-bakery-chocolate">Send us a Message</h3>
            
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-bakery-chocolate text-lg">Thank You!</h4>
                <p className="text-gray-500 text-sm">Your message has been sent successfully. We will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary py-2 px-6 text-xs mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label-text">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="input-field"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label-text">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your email address"
                      className="input-field"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="label-text">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="E.g. Catering Enquiry, Birthday Cake Doubt"
                    className="input-field"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="label-text">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    placeholder="Write your details here..."
                    className="input-field"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Google Map Mockup */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-bakery-chocolate">Our Main Service Hub</h3>
        <div className="h-96 rounded-3xl overflow-hidden shadow-premium border border-bakery-pink/10">
          <iframe 
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.88653922616!2d80.11039028688461!3d12.971598730999513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b1287e8c5!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1717336190872!5m2!1sen!2sin" 
            className="w-full h-full border-0" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </div>
  );
}
