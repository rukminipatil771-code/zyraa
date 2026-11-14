import React, { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { storageService } from '../services/storageService';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Sizing & Styling Advice');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete your name, email address, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    storageService.saveContactMessage({
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
    });
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
    showToast('Your message has been received by ZYRAA Client Care.');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20">
      <div className="max-w-2xl mb-12">
        <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862] mb-2">
          Client Concierge
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#141414]">
          Get in Touch with ZYRAA
        </h1>
        <p className="text-base text-[#6E6862] mt-3 leading-relaxed">
          Questions about garment fit, leather care, wholesale collaborations, or an
          existing order? Our atelier specialists respond within one business day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form */}
        <div className="lg:col-span-7 bg-white border border-[#E6DDD0] rounded-lg p-7 sm:p-9">
          {sent ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#F5E1DA] flex items-center justify-center text-[#141414]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#141414]">
                Inquiry Received
              </h2>
              <p className="text-sm text-[#6E6862] max-w-md mx-auto">
                Thank you for reaching out to ZYRAA Atelier. Our client care desk
                will follow up via email shortly.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="px-5 py-2.5 rounded border border-[#E6DDD0] text-xs font-medium text-[#141414] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {error && (
                <div className="p-3.5 rounded-md bg-red-50 border border-red-200 text-xs text-red-800">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[#141414] mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aria Sharma"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E6DDD0] rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[#141414] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aria@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E6DDD0] rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-[#141414] mb-1.5">
                  Topic
                </label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E6DDD0] rounded-md"
                >
                  <option>Sizing &amp; Styling Advice</option>
                  <option>Order &amp; Delivery Support</option>
                  <option>Returns &amp; Exchanges</option>
                  <option>Press &amp; Partnerships</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-[#141414] mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our concierge assist you today?"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E6DDD0] rounded-md resize-y"
                />
              </div>

              <button
                type="submit"
                className="px-7 py-3 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Studio Info */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#F3ECE2] border border-[#E6DDD0] rounded-lg p-7 space-y-5">
            <h2 className="font-serif text-2xl font-semibold text-[#141414]">
              ZYRAA Flagship Atelier
            </h2>

            <div className="space-y-4 text-sm text-[#6E6862]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#141414] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[#141414]">Showroom Address</p>
                  <p>18 Kala Ghoda Heritage Lane, Fort, Mumbai 400001</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#141414] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[#141414]">Direct Concierge</p>
                  <p>concierge@zyraa.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#141414] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[#141414]">Telephone</p>
                  <p className="tabular-nums">+91 (22) 4890-2410</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#141414] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[#141414]">Studio Hours</p>
                  <p>Monday – Saturday · 10:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
