import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const STORES = [
  { city: 'New York Flagship', address: '590 Fifth Avenue, New York, NY 10036', hours: 'Mon - Sat: 10am - 8pm' },
  { city: 'London Boutique', address: '142 Bond Street, Mayfair, London W1S 2PF', hours: 'Mon - Sat: 10am - 7pm' },
  { city: 'Tokyo Ginza Atelier', address: '6-10-1 Ginza, Chuo-ku, Tokyo 104-0061', hours: 'Mon - Sun: 11am - 8pm' }
];

export const ContactUs = () => {
  const { addToast } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Your inquiry has been sent to our optical care team! We will reply within 2 hours.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="badge-gold text-xs">CLIENT CONCIERGE &amp; BOUTIQUES</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mt-3 mb-3 font-serif leading-tight">
            Get in Touch With LUMEN &amp; OPTIC
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Have a question regarding your prescription or custom fitting? We are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-start">
          {/* Contact Form (7 cols on desktop) */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-[var(--border-color)] shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6 font-serif">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Your Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field py-2.5 text-xs sm:text-sm" placeholder="Lord / Lady Vance" />
                </div>

                <div>
                  <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Email Address</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field py-2.5 text-xs sm:text-sm" placeholder="client@domain.com" />
                </div>
              </div>

              <div>
                <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Subject</label>
                <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="input-field py-2.5 text-xs sm:text-sm">
                  <option value="">General Inquiry</option>
                  <option value="rx">Prescription Consultation</option>
                  <option value="fitting">AR Fitting &amp; Frame Sizing</option>
                  <option value="order">Order Status &amp; Tracking</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Message</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="input-field py-2.5 text-xs sm:text-sm" placeholder="How may we assist your vision needs today?" />
              </div>

              <button type="submit" className="btn-gold py-3.5 px-8 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mt-2 rounded-2xl shadow-lg shadow-[#d4af37]/25">
                <Send className="w-4 h-4" /> Send Inquiry
              </button>
            </form>
          </div>

          {/* Direct Support Info (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] shadow-md">
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-6 font-serif">
                Direct Customer Support
              </h4>

              <div className="flex flex-col gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 text-[var(--accent-gold)] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">TOLL-FREE CONCIERGE</span>
                    <strong className="text-[var(--text-primary)] text-sm sm:text-base">+1 (800) 586-3690</strong>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">OPTICAL CONSULTATION EMAIL</span>
                    <strong className="text-[var(--text-primary)] text-sm sm:text-base">concierge@optic-lumen.com</strong>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 text-[var(--accent-gold)] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">CONCIERGE HOURS</span>
                    <strong className="text-[var(--text-primary)] text-sm sm:text-base">24/7 Global Support Available</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Flagship Boutiques */}
            <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] shadow-md">
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2.5 font-serif">
                <MapPin className="w-5 h-5 text-[var(--accent-gold)]" /> Flagship Boutiques
              </h4>

              <div className="flex flex-col gap-3.5">
                {STORES.map((s, idx) => (
                  <div key={idx} className="p-4 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-color)]">
                    <strong className="text-[var(--accent-gold)] block text-xs sm:text-sm font-bold font-serif">{s.city}</strong>
                    <span className="text-xs text-[var(--text-secondary)] block mt-1">{s.address}</span>
                    <span className="text-xs text-[var(--text-muted)] mt-0.5 block">{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
