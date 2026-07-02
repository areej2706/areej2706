import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TeamMember } from '../types';

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeDept, setActiveDept] = useState('All');

  useEffect(() => {
    async function fetchTeam() {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order');
      if (!error && data) setMembers(data);
      setLoading(false);
    }
    fetchTeam();
  }, []);

  const departments = ['All', ...Array.from(new Set(members.map((m) => m.department)))];

  const filtered = members.filter((m) => {
    const matchesDept = activeDept === 'All' || m.department === activeDept;
    const q = search.toLowerCase();
    const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q);
    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-linear-to-br from-gray-950 via-blue-950 to-gray-900 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Our Team</p>
          <h1 className="text-5xl font-bold text-white mb-6">The people of NexaCore</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Talented, kind, and driven by a shared mission. Meet the people building NexaCore every day.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative shrink-0 w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or role..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeDept === dept
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-1.5 text-gray-400 text-sm shrink-0">
              <Users size={15} />
              {filtered.length} members
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                  <div className="h-56 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-gray-300 mb-3">
                <Users size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 font-medium">No team members found</p>
              <button
                onClick={() => { setSearch(''); setActiveDept('All'); }}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((member) => (
                <Link
                  key={member.id}
                  to={`/team/${member.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-md">
                        {member.department}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 font-semibold text-sm mb-0.5">{member.name}</h3>
                    <p className="text-blue-600 text-xs font-medium mb-2">{member.role}</p>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{member.short_bio}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
