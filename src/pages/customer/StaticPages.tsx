import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Phone, MapPin, Clock, ArrowRight, ChevronDown, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

/* ---------------- ABOUT PAGE ---------------- */
export const AboutPage: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#f2efe9] py-20 lg:py-32 px-4 sm:px-6 lg:px-8 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium">
            Maison Heritage
          </span>
          <h1 className="mt-3 font-serif-luxury text-4xl sm:text-6xl text-neutral-950 font-normal leading-tight">
            The Pursuit of Enduring Poise
          </h1>
          <p className="mt-6 text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
            Founded with a singular conviction: genuine luxury should be quiet, conscious, and uncompromised by the rapid obsolescence of seasonal trends.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 aspect-[4/3] bg-neutral-200 overflow-hidden">
            <img
              src="/src/assets/images/hero_fashion_editorial_1791148216465.jpg"
              alt="Atelier tailoring"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Architectural Tailoring
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-950 font-normal">
              Garments as Habitable Architecture
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              Every VELORA jacket, trouser, and overcoat is constructed with careful attention to proportion, drape, and freedom of motion. We prioritize natural internal canvases—using horsehair and organic wool chest pieces rather than fusible glues—so that garments mold to your body with every wear.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              By working exclusively with generational European mills across Biella, Tuscany, and the Scottish Borders, we preserve ancient spinning crafts while integrating contemporary minimalist silhouettes.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Material Integrity
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-950 font-normal">
              100% Traceable Fibers & Full-Grain Leathers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              We reject polyester blends, bonded leather scraps, and synthetic chemical coatings. Our Tuscan calfskins are vegetable-tanned using chestnut and mimosa bark extracts, allowing the hides to breathe and develop a deep golden patina over decades of companionship.
            </p>
            <div className="pt-4 flex items-center gap-6 text-xs font-mono text-neutral-800">
              <div>• Biella Virgin Wool</div>
              <div>• Grade-A Cashmere</div>
              <div>• Tuscan Full-Grain</div>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 aspect-[4/3] bg-neutral-200 overflow-hidden">
            <img
              src="/src/assets/images/collection_autumn_minimal_1791148236983.jpg"
              alt="Artisanal knitwear"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="p-12 bg-neutral-950 text-white text-center">
          <h3 className="font-serif-luxury text-3xl font-light">Experience the Atelier</h3>
          <p className="mt-2 text-xs text-neutral-400 max-w-md mx-auto">
            Discover our curated capsules designed for modern confidence.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-6 px-8 py-3.5 bg-white text-neutral-950 hover:bg-neutral-100 text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center gap-2"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- CONTACT PAGE ---------------- */
export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Bespoke Consultation');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your message has been transmitted to the VELORA Client Concierge.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-2xl mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
          Client Services
        </span>
        <h1 className="mt-1 font-serif-luxury text-4xl sm:text-5xl text-neutral-950 font-normal">
          Client Concierge & Atelier Visit
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
          For private appointments, garment alterations, corporate gifting, or order inquiries, our concierge desk is available to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form Left */}
        <div className="lg:col-span-7 bg-white p-8 border border-neutral-200">
          <h2 className="font-serif-luxury text-2xl font-normal text-neutral-900 mb-6">
            Transmit an Inquiry
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider font-medium text-neutral-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider font-medium text-neutral-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-medium text-neutral-700 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
              >
                <option value="Bespoke Consultation">Private Styling & Bespoke Consultation</option>
                <option value="Order Tracking">Existing Order Inquiry & Delivery</option>
                <option value="Returns & Exchanges">Complimentary Return Request</option>
                <option value="Press & Partnership">Editorial & Press Relations</option>
              </select>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-medium text-neutral-700 mb-1">
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How may our concierge assist your wardrobe requirements?"
                className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-neutral-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
            >
              Submit Inquiry
            </button>
          </form>
        </div>

        {/* Contact Info Right */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#f7f5f0] p-8 border border-neutral-200 text-xs space-y-6">
            <h3 className="font-serif-luxury text-xl font-medium text-neutral-900">
              Manhattan Flagship Atelier
            </h3>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>450 West 14th Street, Meatpacking District, New York, NY 10014</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-900 shrink-0" />
                <span className="font-mono">+1 (800) 845-8890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>concierge@velora-fashion.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>
                  Monday – Saturday: 10:00 AM – 7:00 PM EST
                  <br />
                  Sunday: 12:00 PM – 6:00 PM EST
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 border border-neutral-200 text-xs space-y-4">
            <h4 className="font-serif-luxury text-lg font-medium text-neutral-900">
              European Atelier Salons
            </h4>
            <div className="grid grid-cols-2 gap-4 text-neutral-600">
              <div>
                <strong className="text-neutral-900 block font-medium">Milan Salon</strong>
                Via Montenapoleone 18, 20121 Milano
              </div>
              <div>
                <strong className="text-neutral-900 block font-medium">Paris Salon</strong>
                24 Rue du Faubourg Saint-Honoré, 75008 Paris
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- FAQ PAGE ---------------- */
export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does VELORA source its fabrics and leathers?',
      a: 'All fabrics are sourced directly from historic European family-run mills. Our cashmere is spun in the Scottish borders, fresco wool in Biella, Italy, and our calfskins are vegetable-tanned in Tuscan artisan workshops using mimosa bark extracts.'
    },
    {
      q: 'What are the delivery timeframes and rates?',
      a: 'We offer Standard White-Glove delivery (3–5 business days, $15 or complimentary on orders over $200) and Priority Atelier Express (1–2 business days, $35). Every order includes full transit insurance and signature verification upon handover.'
    },
    {
      q: 'What is your return policy?',
      a: 'We welcome complimentary returns within 30 days of delivery. Garments must be unworn, undamaged, with original atelier tags intact and returned in our signature rigid gift box.'
    },
    {
      q: 'Do you offer custom alterations or tailoring adjustments?',
      a: 'Yes. Clients visiting our Manhattan, Milan, or Paris ateliers receive complimentary in-house tailoring adjustments. For online orders, our concierge can recommend certified regional master tailors.'
    },
    {
      q: 'Are Cash on Delivery (COD) and Bank Wire transfers supported?',
      a: 'Yes. In addition to major credit cards, we accommodate Cash on Delivery for designated domestic regions and Direct Atelier Bank Wire transfers for collectors.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
          Patron Inquiries
        </span>
        <h1 className="mt-1 font-serif-luxury text-4xl text-neutral-950 font-normal">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-xs text-neutral-500">
          Essential details regarding our craft, fulfillment, sizing, and policies.
        </p>
      </div>

      <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
        {faqs.map((faq, idx) => (
          <div key={idx} className="py-4">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between text-left py-2 text-sm font-medium text-neutral-900"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-500 transition-transform ${
                  openIndex === idx ? 'rotate-180 text-neutral-900' : ''
                }`}
              />
            </button>
            {openIndex === idx && (
              <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-light pb-2">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- SHIPPING PAGE ---------------- */
export const ShippingPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
        Client Services
      </span>
      <h1 className="mt-1 font-serif-luxury text-4xl text-neutral-950 font-normal">
        Shipping & White-Glove Delivery
      </h1>
      <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
        Every commission is inspected by hand in our atelier, wrapped in acid-free archival tissue, and sealed in our bespoke rigid box.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
        <div className="p-6 bg-white border border-neutral-200">
          <Truck className="w-5 h-5 text-neutral-900 mb-3" />
          <h3 className="text-sm font-semibold text-neutral-950 uppercase tracking-wider">
            Standard Courier (3–5 Days)
          </h3>
          <p className="mt-2 text-neutral-600 leading-relaxed">
            Rate: <strong>$15</strong> or <strong>Complimentary</strong> on orders exceeding $200. Fully tracked via FedEx Priority or DHL.
          </p>
        </div>

        <div className="p-6 bg-white border border-neutral-200">
          <ShieldCheck className="w-5 h-5 text-neutral-900 mb-3" />
          <h3 className="text-sm font-semibold text-neutral-950 uppercase tracking-wider">
            Priority Atelier Express (1–2 Days)
          </h3>
          <p className="mt-2 text-neutral-600 leading-relaxed">
            Rate: <strong>$35</strong> flat. Direct expedited air courier with mandatory signature verification upon handover.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---------------- RETURNS PAGE ---------------- */
export const ReturnsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
        Confidence Guarantee
      </span>
      <h1 className="mt-1 font-serif-luxury text-4xl text-neutral-950 font-normal">
        Complimentary 30-Day Returns
      </h1>
      <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
        We want you to wear your VELORA garments with complete conviction. If an item does not suit your form or expectations, we will gladly arrange a complimentary return or exchange.
      </p>

      <div className="mt-10 p-8 bg-neutral-50 border border-neutral-200 text-xs space-y-4 text-neutral-700 leading-relaxed">
        <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider">
          Return Protocol
        </h3>
        <p>1. Initiate your return through your Customer Account or by contacting our concierge desk.</p>
        <p>2. Affix the prepaid insured courier shipping label provided in your original delivery box.</p>
        <p>3. Drop off the package at any authorized courier terminal or schedule a complimentary home pickup.</p>
        <p>4. Upon receipt and atelier inspection, your refund will be issued immediately to the original payment method.</p>
      </div>
    </div>
  );
};

/* ---------------- PRIVACY & TERMS POLICY PAGE ---------------- */
export const PolicyPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-xs text-neutral-700 leading-relaxed space-y-6">
      <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
        Legal Governance
      </span>
      <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-950 font-normal">
        {type === 'privacy' ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Sale'}
      </h1>
      <p className="text-neutral-500 font-mono text-[11px]">
        Last updated: October 2026 · VELORA Atelier Inc.
      </p>

      <div className="space-y-4 pt-4 border-t border-neutral-200">
        <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
          1. Principles of Discretion
        </h3>
        <p>
          VELORA is committed to safeguarding the privacy and digital sovereignty of our patrons. We never sell, lease, or monetize customer data to third-party advertising networks. Data collected during checkout is utilized strictly for fulfillment, tax compliance, and order status communications.
        </p>

        <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
          2. Transaction Security
        </h3>
        <p>
          All electronic payment records are handled in compliance with Level-1 PCI DSS standards using end-to-end 256-bit encryption. Payment tokens never touch our permanent database servers.
        </p>

        <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
          3. Ownership of Intellectual Craft
        </h3>
        <p>
          All garment designs, lookbook photography, editorial text, and architectural cuts appearing on this website are the proprietary intellectual property of VELORA Atelier Inc.
        </p>
      </div>
    </div>
  );
};
