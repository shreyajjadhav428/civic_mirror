// File Path: backend/src/config/supabase.js
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js'; 

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || 'placeholder-key'; // Only use the Secret Key in the Node.js backend

export const supabase = createClient(supabaseUrl, supabaseSecretKey);