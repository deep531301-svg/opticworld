import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance = null;

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

if (isValidUrl(supabaseUrl) && supabaseAnonKey && !supabaseUrl.includes('your-project-id')) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error('Failed to create Supabase client:', e.message);
  }
} else {
  console.warn(
    'Supabase is running in local fallback mode. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Export a safe mock client if not connected to avoid crashes
export const supabase = supabaseInstance || {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({ data: {}, error: { message: 'Supabase not configured' } }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        maybeSingle: async () => ({ data: null, error: null }),
        single: async () => ({ data: null, error: null }),
      }),
    }),
  }),
};

// Automatic connection diagnostic logger
if (supabaseInstance) {
  supabaseInstance.auth.getSession()
    .then(({ error }) => {
      if (error) {
        console.error('❌ Supabase connection error:', error.message);
      } else {
        console.log('⚡ [Supabase] Connected successfully! API is responsive.');
      }
    })
    .catch(err => {
      console.error('❌ Supabase connection network error:', err);
    });
}
