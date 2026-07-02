import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: insertError } = await supabase
      .from('contact_messages')
      .insert({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });

    if (insertError) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Contact Us</p>
          <h1 className="text-5xl font-bold text-white mb-6">We'd love to hear from you.</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Whether you have a question about features, pricing, need a demo, or just want to say hello — our team
            is ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info panel */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact information</h2>
                <p className="text-gray-500 leading-relaxed">
                  Reach out through any of these channels and we'll get back to you as soon as possible.
                </p>
              </div>

              {[
                {
                  icon: Mail,
                  label: 'Email us',
                  value: 'hello@nexacore.io',
                  href: 'mailto:hello@nexacore.io',
                  sub: 'We respond within 2 business hours',
                },
                {
                  icon: Phone,
                  label: 'Call us',
                  value: '+1 (415) 555-0199',
                  href: 'tel:+14155550199',
                  sub: 'Mon–Fri, 9am–6pm PT',
                },
                {
                  icon: MapPin,
                  label: 'Visit us',
                  value: '548 Market St, Suite 400',
                  href: null,
                  sub: 'San Francisco, CA 94104',
                },
                {
                  icon: Clock,
                  label: 'Support hours',
                  value: '24/7 Enterprise Support',
                  href: null,
                  sub: 'Standard: Mon–Fri 9am–6pm PT',
                },
              ].map(({ icon: Icon, label, value, href, sub }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <div className="text-gray-900 font-medium">{value}</div>
                    )}
                    <div className="text-sm text-gray-400 mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
                    <p className="text-gray-500 max-w-sm">
                      Thanks for reaching out. We'll get back to you within 2 business hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                      className="mt-8 text-sm text-blue-600 font-medium hover:text-blue-700"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
                    {error && (
                      <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                        {error}
                      </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="you@company.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-all bg-white"
                        >
                          <option value="">Select a topic...</option>
                          <option value="sales">Sales inquiry</option>
                          <option value="support">Technical support</option>
                          <option value="partnership">Partnership</option>
                          <option value="media">Media & press</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Tell us how we can help..."
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm transition-all resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-blue-600/20"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <>
                            <Send size={16} />
                            Send message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
