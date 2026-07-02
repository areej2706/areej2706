import { Link } from 'react-router-dom';
import { ArrowRight, Target, Heart, Lightbulb, Users, FolderOpen, Zap, Shield } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Delivery Over Activity',
    description:
      'We measure success by shipped projects, not hours billed. Every engagement has a clear scope, timeline, and outcome.',
  },
  {
    icon: Heart,
    title: 'Client Obsession',
    description:
      'Your project is our reputation. We treat every engagement like our own product — because it reflects on us.',
  },
  {
    icon: Lightbulb,
    title: 'Radical Transparency',
    description:
      'No surprises. We share progress, blockers, and decisions openly so you always know where your project stands.',
  },
  {
    icon: Users,
    title: 'Right Team, Right Project',
    description:
      'We match your project with the exact expertise it needs — not whoever is available. Quality over convenience.',
  },
];

const milestones = [
  { year: '2019', event: 'NexaCore founded by Alexandra Chen and Marcus Okafor to help startups ship faster.' },
  { year: '2020', event: 'Delivered our first 20 projects. Raised $2.5M pre-seed. Built a team of 8.' },
  { year: '2021', event: 'Crossed 50 projects delivered. $8M Series A. Expanded to mobile and cloud services.' },
  { year: '2022', event: '100+ projects completed. Expanded to Europe. Team grew to 45 people.' },
  { year: '2023', event: '$50M Series B. 200+ projects delivered. Launched AI and data services.' },
  { year: '2024', event: '98% client satisfaction. 18+ team members. The go-to partner for project delivery.' },
];

const services = [
  { icon: FolderOpen, title: 'Web & Mobile Apps', desc: 'Full-stack development from concept to App Store.' },
  { icon: Zap, title: 'UI/UX Design', desc: 'Research-driven design that converts and delights.' },
  { icon: Shield, title: 'Cloud & Security', desc: 'Infrastructure, compliance, and zero-downtime deployments.' },
  { icon: Users, title: 'Data & AI', desc: 'ML models, analytics, and intelligent automation.' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">About NexaCore</p>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            We build your projects
            <br />
            so you can build your business.
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            NexaCore is a project delivery company. You bring the idea — we bring the team, the process,
            and the expertise to ship it. Fast, reliably, and with the quality your users deserve.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Make great project delivery accessible to every team.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                Too many great ideas die because finding and managing the right team is too hard. NexaCore
                eliminates that barrier. You submit your project, we assemble the perfect team, and we deliver
                it — on time, on budget, with full transparency.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Whether you need a web app, a mobile experience, a design overhaul, or an AI-powered feature,
                we have the people and the process to make it happen.
              </p>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                Meet the team that delivers
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="NexaCore team working"
                className="rounded-2xl shadow-2xl object-cover w-full h-96"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-blue-100 text-sm">Projects delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Services</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What we deliver</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              From concept to deployment — we handle the full lifecycle of your project.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">What We Believe</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">The Journey</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">From idea to 200+ projects</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-10">
              {milestones.map(({ year, event }) => (
                <div key={year} className="flex items-start gap-8 pl-4">
                  <div className="relative flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="pb-2">
                    <div className="text-blue-600 font-bold text-sm mb-1">{year}</div>
                    <p className="text-gray-700 leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a project in mind?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Create your account and submit your project brief — we'll take it from there.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Start your project
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-400 transition-colors"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
