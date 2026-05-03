import { createClient } from '@supabase/supabase-js';

// 1. URL se '/rest/v1/' hatana hay
const supabaseUrl = 'https://mqlrhhsidfxmejqadkuc.supabase.co'; 

// 2. Anon Key 'eyJ...' se shuru hoti hay, 'sb_pub...' wali nahi
const supabaseAnonKey = 'sb_publishable_FM_-tVnDsQ4Holorh6_g_Q_La0Tohql'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);