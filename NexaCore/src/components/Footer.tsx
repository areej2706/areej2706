import { Link } from 'react-router-dom';
import { Zap, MessageCircle, Link2, GitBranch, Play, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-white text-xl font-bold tracking-tight">NexaCore</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-gray-400">
              Building the infrastructure layer for the next generation of intelligent software. Trusted by teams
              at startups and Fortune 500 companies alike.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { Icon: MessageCircle, href: 'https://twitter.com', label: 'Twitter' },
                { Icon: Link2, href: 'https://linkedin.com', label: 'LinkedIn' },
                { Icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
                { Icon: Play, href: 'https://youtube.com', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/team', label: 'Our Team' },
                { to: '/contact', label: 'Contact' },
                { to: '/signup', label: 'Get Started' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2.5">
              {['Features', 'Pricing', 'Documentation', 'Changelog', 'Status Page'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 shrink-0 text-blue-400" />
                <a href="mailto:hello@nexacore.io" className="text-sm hover:text-white transition-colors">
                  hello@nexacore.io
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-blue-400" />
                <a href="tel:+14155550199" className="text-sm hover:text-white transition-colors">
                  +1 (415) 555-0199
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-blue-400" />
                <span className="text-sm">548 Market St, Suite 400<br />San Francisco, CA 94104</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} NexaCore, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
