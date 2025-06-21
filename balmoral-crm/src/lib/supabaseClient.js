import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://orwvoxuduoohgmhsolgf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yd3ZveHVkdW9vaGdtaHNvbGdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MTQ2NTksImV4cCI6MjA2NTM5MDY1OX0.fPhUU6-S33fXSh79nwcxt_uDCXLK3fzpET0DFy_77Is';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);