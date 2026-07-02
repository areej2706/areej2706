import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Zap, Send, CheckCircle2, Calendar, DollarSign, Clock, FileText, Code, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';

const serviceOptions = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Cloud & DevOps',
  'Data & AI',
  'Backend & APIs',
  'Security & Compliance',
  'E-Commerce Solutions',
  'Other',
];

const budgetOptions = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
  'Not sure yet',
];

const timelineOptions = [
  'Less than 2 weeks',
  '2 - 4 weeks',
  '1 - 2 months',
  '2 - 3 months',
  '3 - 6 months',
  '6+ months',
  'Flexible',
];

const priorityOptions = [
  { value: 'low', label: 'Low', desc: 'No rush — flexible timeline' },
  { value: 'medium', label: 'Medium', desc: 'Standard priority' },
  { value: 'high', label: 'High', desc: 'Important — need it soon' },
  { value: 'urgent', label: 'Urgent', desc: 'Critical — ASAP' },
];

export default function StartProject() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    service_type: '',
    description: '',
    budget_range: '',
    timeline: '',
    deadline: '',
    tech_preferences: '',
    priority: 'medium',
    additional_notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError('');

    const { error: insertError } = await supabase.from('projects').insert({
      customer_id: user.id,
      name: form.name,
      service_type: form.service_type,
      description: form.description,
      budget_range: form.budget_range,
      timeline: form.timeline,
      deadline: form.deadline || null,
      tech_preferences: form.tech_preferences,
      priority: form.priority,
      additional_notes: form.additional_notes,
    });

    if (insertError) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Project submitted!</h1>
          <p className="text-gray-500 mb-8">
            Our team will review your project brief and get back to you within 24 hours with next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', service_type: '', description: '', budget_range: '', timeline: '', deadline: '', tech_preferences: '', priority: 'medium', additional_notes: '' }); }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-colors"
            >
              Submit another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-700 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">NexaCore</span>
            </Link>
          </div>
          <Link to="/dashboard" className="text-sm text-blue-600 font-medium hover:text-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Start a new project</h1>
          <p className="text-gray-500">
            Tell us everything about your project. The more detail you provide, the faster we can match you with the right team.
          </p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Basics */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />
              Project Basics
            </h2>
            <p className="text-gray-400 text-sm mb-6">What do you need built?</p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Project name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. E-commerce platform for handmade goods"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Service type *</label>
                <select
                  name="service_type"
                  value={form.service_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-all bg-white"
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Project description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your project in detail — what it does, who it's for, key features, etc."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm transition-all resize-none"
                />
              </div>
            </div>
          </section>

          {/* Budget & Timeline */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <DollarSign size={18} className="text-blue-600" />
              Budget & Timeline
            </h2>
            <p className="text-gray-400 text-sm mb-6">Help us scope the right team for your project.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget range *</label>
                <select
                  name="budget_range"
                  value={form.budget_range}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-all bg-white"
                >
                  <option value="">Select budget range...</option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expected timeline *</label>
                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-all bg-white"
                >
                  <option value="">Select timeline...</option>
                  {timelineOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 items-center gap-1.5">
                  <Calendar size={14} className="text-gray-400" />
                  Specific deadline (optional)
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Clock size={14} className="text-gray-400" />
                  Priority
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-all bg-white"
                >
                  {priorityOptions.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Priority visual selector */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority level</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {priorityOptions.map(({ value, label, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, priority: value }))}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      form.priority === value
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`text-sm font-semibold ${form.priority === value ? 'text-blue-700' : 'text-gray-900'}`}>{label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Code size={18} className="text-blue-600" />
              Technical Details
            </h2>
            <p className="text-gray-400 text-sm mb-6">Any tech preferences or requirements?</p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Technology preferences</label>
                <input
                  type="text"
                  name="tech_preferences"
                  value={form.tech_preferences}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, PostgreSQL, AWS"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 items-center gap-1.5">
                  <MessageSquare size={14} className="text-gray-400" />
                  Additional notes
                </label>
                <textarea
                  name="additional_notes"
                  value={form.additional_notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Anything else we should know? Existing systems to integrate with, design references, compliance requirements, etc."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm transition-all resize-none"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-gray-400 text-center sm:text-left">
              We'll review your brief and respond within 24 hours.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-5 py-3 text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-600/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Project
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
