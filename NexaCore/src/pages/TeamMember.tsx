import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Link2, MessageCircle, GitBranch, Users, Award, BookOpen, Briefcase } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TeamMember } from '../types';

export default function TeamMember() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [others, setOthers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMember() {
      if (!id) return;
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('id', Number(id))
        .maybeSingle();
      if (!error && data) {
        setMember(data);
        const { data: deptData } = await supabase
          .from('team_members')
          .select('*')
          .neq('id', Number(id))
          .eq('department', data.department)
          .order('sort_order')
          .limit(3);
        if (deptData) setOthers(deptData);
      }
      setLoading(false);
    }
    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl px-6">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="h-48 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-400 text-4xl font-bold mb-4">404</p>
          <p className="text-gray-500 mb-6">Team member not found.</p>
          <Link to="/team" className="text-blue-600 font-medium hover:text-blue-700">
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back */}
      <div className="bg-gray-900 pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>

      {/* Profile Hero */}
      <section className="bg-linear-to-br from-gray-900 via-blue-950 to-gray-900 pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-24">
          <div className="flex flex-col lg:flex-row items-start gap-10">
            <div className="shrink-0">
              <div className="w-44 h-44 rounded-2xl overflow-hidden ring-4 ring-white/10 shadow-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg mb-4">
                {member.department}
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{member.name}</h1>
              <p className="text-blue-300 text-xl mb-4 font-medium">{member.role}</p>
              <p className="text-gray-300 text-base leading-relaxed max-w-2xl mb-6">{member.short_bio}</p>

              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-lg border border-white/10 transition-all"
                >
                  <Mail size={14} />
                  {member.email}
                </a>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-blue-600 text-white rounded-lg border border-white/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Link2 size={15} />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-sky-500 text-white rounded-lg border border-white/10 transition-all"
                    aria-label="Twitter"
                  >
                    <MessageCircle size={15} />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-gray-600 text-white rounded-lg border border-white/10 transition-all"
                    aria-label="GitHub"
                  >
                    <GitBranch size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-gray-900 font-bold text-lg mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-blue-600" />
                About {member.name.split(' ')[0]}
              </h2>
              <p className="text-gray-600 leading-relaxed">{member.full_bio}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-gray-900 font-bold text-lg mb-5 flex items-center gap-2">
                <Award size={18} className="text-blue-600" />
                Key Achievements
              </h2>
              <ul className="space-y-3">
                {member.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-gray-600 text-sm leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-gray-900 font-bold text-sm mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-blue-600" />
                Education
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed space-y-1">
                {member.education.split('•').map((edu, i) => (
                  <p key={i}>{edu.trim()}</p>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-gray-900 font-bold text-sm mb-3 flex items-center gap-2">
                <Briefcase size={16} className="text-blue-600" />
                Experience
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{member.experience}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-gray-900 font-bold text-sm mb-4 flex items-center gap-2">
                <Award size={16} className="text-blue-600" />
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                More from {member.department}
              </h2>
              <Link
                to="/team"
                className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
              >
                <Users size={14} />
                View all team
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {others.map((m) => (
                <Link
                  key={m.id}
                  to={`/team/${m.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-4 p-4"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm">{m.name}</h3>
                    <p className="text-blue-600 text-xs font-medium">{m.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
