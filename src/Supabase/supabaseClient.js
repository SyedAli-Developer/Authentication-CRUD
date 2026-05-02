import { createClient } from '@supabase/supabase-js';

// 1. URL se '/rest/v1/' hatana hay
const supabaseUrl = 'https://mqlrhhsidfxmejqadkuc.supabase.co'; 

// 2. Anon Key 'eyJ...' se shuru hoti hay, 'sb_pub...' wali nahi
const supabaseAnonKey = 'YOUR_ACTUAL_ANON_KEY_HERE'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);