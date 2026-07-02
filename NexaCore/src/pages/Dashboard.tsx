import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, LogOut, FolderOpen, Clock, CheckCircle2, AlertCircle,
  Plus, Users, BarChart3, Zap, TrendingUp, Eye, Calendar,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';

interface Project {
  id: string;
  name: string;
  service_type: string;
  description: string;
  budget_range: string;
  timeline: string;
  deadline: string | null;
  tech_preferences: string;
  status: string;
  priority: string;
  additional_notes: string;
  created_at: string;
  updated_at: string;
}

interface TeamAvail {
  id: number;
  department: string;
  total_members: number;
  available_members: number;
  active_projects: number;
  capacity_percent: number;
}

const statusConfig: Record<string, { color: string; bg: string; icon: typeof Clock }> = {
  submitted: { color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200', icon: Clock },
  in_review: { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: Eye },
  approved: { color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: CheckCircle2 },
  in_progress: { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: Zap },
  completed: { color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200', icon: CheckCircle2 },
};

export default function Dashboard() {
  const { user, profile, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamAvail, setTeamAvail] = useState<TeamAvail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      if (isAdmin) {
        const { data: projData } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        if (projData) setProjects(projData);
        const { data: availData } = await supabase
          .from('team_availability')
          .select('*')
          .order('department');
        if (availData) setTeamAvail(availData);
      } else {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('customer_id', user!.id)
          .order('created_at', { ascending: false });
        if (data) setProjects(data);
      }
      setLoading(false);
    }
    fetchData();
  }, [user, isAdmin]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" /></div>;
  }

  const displayName = profile?.full_name || user?.email || 'User';
  const projectStats = {
    total: projects.length,
    submitted: projects.filter(p => p.status === 'submitted').length,
    inProgress: projects.filter(p => p.status === 'in_progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">NexaCore</span>
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="hidden sm:inline text-sm text-gray-500 font-medium">
              {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-gray-900">{displayName}</div>
              <div className="text-xs text-gray-400">{isAdmin ? 'Admin' : 'Customer'}</div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back, {displayName.split(' ')[0]}
          </h1>
          <p className="text-gray-500">
            {isAdmin
              ? "Here's an overview of all projects and team availability."
              : "Manage your projects and start new ones anytime."}
          </p>
        </div>

        {/* Customer: Start Project CTA */}
        {!isAdmin && (
          <div className="mb-8 bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-white font-bold text-lg mb-1">Have a new project?</h2>
              <p className="text-blue-100 text-sm">Submit your project brief and our team will get back to you within 24 hours.</p>
            </div>
            <Link
              to="/start-project"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shrink-0"
            >
              <Plus size={16} />
              Start a Project
            </Link>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {isAdmin ? (
            <>
              <StatCard icon={FolderOpen} label="Total Projects" value={projectStats.total} color="blue" />
              <StatCard icon={Clock} label="In Progress" value={projectStats.inProgress} color="amber" />
              <StatCard icon={CheckCircle2} label="Completed" value={projectStats.completed} color="green" />
              <StatCard icon={Users} label="Team Members" value={18} color="gray" />
            </>
          ) : (
            <>
              <StatCard icon={FolderOpen} label="My Projects" value={projectStats.total} color="blue" />
              <StatCard icon={Clock} label="Pending Review" value={projectStats.submitted} color="amber" />
              <StatCard icon={Zap} label="In Progress" value={projectStats.inProgress} color="blue" />
              <StatCard icon={CheckCircle2} label="Completed" value={projectStats.completed} color="green" />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects list */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                {isAdmin ? 'All Projects' : 'Your Projects'}
              </h2>
              {!isAdmin && (
                <Link
                  to="/start-project"
                  className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus size={14} />
                  New project
                </Link>
              )}
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <FolderOpen size={40} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-gray-900 font-semibold mb-2">No projects yet</h3>
                <p className="text-gray-500 text-sm mb-6">
                  {isAdmin
                    ? 'No projects have been submitted yet.'
                    : "You haven't started any projects. Submit your first one!"}
                </p>
                {!isAdmin && (
                  <Link
                    to="/start-project"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    <Plus size={16} />
                    Start your first project
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => {
                  const sc = statusConfig[project.status] || statusConfig.submitted;
                  const Icon = sc.icon;
                  return (
                    <div key={project.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-gray-900 font-semibold">{project.name}</h3>
                          <p className="text-gray-400 text-xs mt-0.5">{project.service_type}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${sc.bg} ${sc.color}`}>
                          <Icon size={12} />
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><BarChart3 size={12} /> {project.budget_range}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {project.timeline}</span>
                        {project.deadline && <span className="flex items-center gap-1"><Calendar size={12} /> Due {new Date(project.deadline).toLocaleDateString()}</span>}
                        <span className="flex items-center gap-1 capitalize">
                          <AlertCircle size={12} /> {project.priority}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin: Team Availability */}
            {isAdmin && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-gray-900 font-bold text-sm mb-4 flex items-center gap-2">
                  <Users size={16} className="text-blue-600" />
                  Team Availability
                </h3>
                <div className="space-y-4">
                  {teamAvail.map((dept) => (
                    <div key={dept.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                        <span className="text-xs text-gray-400">
                          {dept.available_members}/{dept.total_members} available
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            dept.capacity_percent >= 90
                              ? 'bg-red-500'
                              : dept.capacity_percent >= 70
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${dept.capacity_percent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">{dept.active_projects} active projects</span>
                        <span className="text-xs text-gray-400">{dept.capacity_percent}% capacity</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin: Quick Stats */}
            {isAdmin && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-gray-900 font-bold text-sm mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-blue-600" />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">Avg. delivery time</span>
                    <span className="text-sm font-semibold text-gray-900">4.2 weeks</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">Client satisfaction</span>
                    <span className="text-sm font-semibold text-gray-900">98%</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">On-time delivery</span>
                    <span className="text-sm font-semibold text-gray-900">96%</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-500">Repeat clients</span>
                    <span className="text-sm font-semibold text-gray-900">72%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Customer: Quick Links */}
            {!isAdmin && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-gray-900 font-bold text-sm mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link to="/start-project" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors text-sm">
                    <Plus size={16} /> Start a new project
                  </Link>
                  <Link to="/team" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors text-sm">
                    <Users size={16} /> View our team
                  </Link>
                  <Link to="/contact" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors text-sm">
                    <ArrowRight size={16} /> Contact support
                  </Link>
                </div>
              </div>
            )}

            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-gray-900 font-bold text-sm mb-4">Your Profile</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400 text-xs">Name</span>
                  <div className="text-gray-900 font-medium">{profile?.full_name || 'Not set'}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Email</span>
                  <div className="text-gray-900 font-medium">{user?.email}</div>
                </div>
                {profile?.company && (
                  <div>
                    <span className="text-gray-400 text-xs">Company</span>
                    <div className="text-gray-900 font-medium">{profile.company}</div>
                  </div>
                )}
                <div>
                  <span className="text-gray-400 text-xs">Account type</span>
                  <div className="text-gray-900 font-medium capitalize">{profile?.role || 'customer'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: typeof FolderOpen; label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
    gray: 'bg-gray-100 text-gray-600',
  };
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${colorMap[color]}`}>
        <Icon size={18} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}
