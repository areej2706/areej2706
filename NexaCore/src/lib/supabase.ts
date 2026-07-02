import { createClient } from '@supabase/supabase-js';
import { teamMembers } from '../data/team';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';
const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function buildFallbackSupabase() {
  function createFallbackQuery(table: string) {
    let items = table === 'team_members' ? [...teamMembers] : [];

    const query: any = {
      select: () => query,
      eq: (column: string, value: any) => {
        if (table === 'team_members') {
          if (column === 'is_featured') {
            items = items.filter((item) => item.is_featured === value);
          }
          if (column === 'id') {
            items = items.filter((item) => item.id === Number(value));
          }
          if (column === 'department') {
            items = items.filter((item) => item.department === value);
          }
        }
        return query;
      },
      neq: (column: string, value: any) => {
        if (table === 'team_members' && column === 'id') {
          items = items.filter((item) => item.id !== Number(value));
        }
        return query;
      },
      order: () => query,
      limit: (count: number) => {
        items = items.slice(0, count);
        return query;
      },
      maybeSingle: async () => ({ data: items[0] ?? null, error: null }),
      then: (onFulfilled: any, onRejected: any) => Promise.resolve({ data: items, error: null }).then(onFulfilled, onRejected),
    };

    return query;
  }

  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        callback('SIGNED_OUT', null);
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
      signUp: async () => ({ data: null, error: { message: 'Supabase is not configured' } }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase is not configured' } }),
      signOut: async () => ({ error: null }),
    },
    from: (table: string) => createFallbackQuery(table),
  } as const;
}

if (!isConfigured) {
  console.warn('Supabase env vars are not set. Auth and database will not be available in local development.');
}

const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : buildFallbackSupabase();

export default supabase;
export { supabase };
