import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield, Clock, Globe, ChevronRight, Star, Users, FolderOpen, Headphones } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TeamMember } from '../types';

const stats = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '18+', label: 'Team Members' },
  { value: '24/7', label: 'Support Available' },
];

const howItWorks = [
  { step: '01', title: 'Submit Your Project', description: 'Tell us what you need — scope, timeline, budget, and tech preferences.' },
  { step: '02', title: 'We Review & Match', description: 'Our team reviews your requirements and assigns the right experts.' },
  { step: '03', title: 'Build & Deliver', description: 'We execute with full transparency, regular updates, and on-time delivery.' },
];

const testimonials = [
  {
    name: 'Jordan Kim',
    title: 'CTO at Vertex Systems',
    quote: 'NexaCore delivered our entire platform in 6 weeks. Their team was professional, responsive, and the quality exceeded our expectations.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    name: 'Rachel Torres',
    title: 'Founder, Luminos',
    quote: "We needed a mobile app fast. NexaCore matched us with the perfect team and we launched in under a month. Incredible experience.",
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    name: 'Sam Brightwell',
    title: 'CEO, Quickbase AI',
    quote: 'From design to deployment, NexaCore handled everything. They are our go-to partner for every new project.',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
];

export default function Home() {
  const [featured, setFeatured] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_featured', true)
        .order('sort_order');
      if (!error && data) setFeatured(data);
      setLoading(false);
    }
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-linear-to-br from-gray-950 via-blue-950 to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fill-opacity%3D%220.015%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Trusted by 200+ clients worldwide
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Your project.
              <br />
              <span className="text-blue-400">Our experts.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              NexaCore is your dedicated project team. We take your idea from brief to launch — web apps, mobile
              apps, design, cloud, AI, and more. Submit your project, and we handle the rest.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Start your project
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/8 hover:bg-white/12 text-white font-medium rounded-xl border border-white/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-5">
              {['On-time delivery', 'Dedicated team', 'Transparent pricing'].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <CheckCircle2 size={14} className="text-green-400" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{value}</div>
                <div className="text-blue-100 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Three steps to launch</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Getting your project done has never been this simple.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map(({ step, title, description }) => (
              <div key={step} className="relative text-center p-8">
                <div className="text-6xl font-black text-blue-100 mb-4">{step}</div>
                <h3 className="text-gray-900 font-bold text-lg mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-blue-600/20"
            >
              Get started now
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">What We Build</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">End-to-end project services</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Whatever you need built, our team has the expertise to deliver it on time and on budget.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: 'Web Development', desc: 'Full-stack web apps with React, Next.js, and Node.js.' },
              { icon: Zap, title: 'Mobile Apps', desc: 'iOS & Android apps with React Native, Swift, and Kotlin.' },
              { icon: Shield, title: 'UI/UX Design', desc: 'Research-driven design that users love.' },
              { icon: Clock, title: 'Cloud & DevOps', desc: 'Infrastructure, CI/CD, and 99.99% uptime.' },
              { icon: Users, title: 'Data & AI', desc: 'ML models, analytics, and AI-powered features.' },
              { icon: FolderOpen, title: 'Backend & APIs', desc: 'Scalable microservices and real-time systems.' },
              { icon: Shield, title: 'Security', desc: 'Pen testing, compliance, and zero-trust architecture.' },
              { icon: Headphones, title: 'E-Commerce', desc: 'Online stores, payments, and inventory systems.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors">
                  <Icon size={20} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Team */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Our Team</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experts who deliver</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Every project is handled by experienced professionals who've shipped products used by millions.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                  <div className="h-72 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {featured.map((member) => (
                <Link
                  key={member.id}
                  to={`/team/${member.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="inline-block px-2.5 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg mb-2">
                        {member.department}
                      </div>
                      <h3 className="text-white font-bold text-lg">{member.name}</h3>
                      <p className="text-blue-200 text-sm">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{member.short_bio}</p>
                    <div className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                      View profile
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-12 text-center">
              <p className="text-lg font-semibold text-gray-900 mb-3">No featured team members available yet.</p>
              <p className="text-sm text-gray-500">
                Team member data is not loading because Supabase is not configured in this environment.
              </p>
            </div>
          )}

          <div className="text-center">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-blue-600/20"
            >
              Explore the full team
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Clients love working with us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 border border-gray-100">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-5">Ready to get your project done?</h2>
          <p className="text-gray-400 text-lg mb-10">
            Create your account, submit your project brief, and let our team handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-blue-600/30"
            >
              Start your project
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/8 hover:bg-white/12 text-white font-medium rounded-xl border border-white/10 transition-all duration-200"
            >
              Talk to us first
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
