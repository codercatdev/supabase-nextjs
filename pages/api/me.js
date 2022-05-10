import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { apiHandler } from '../../helpers/api';
export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.json(req.auth);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
