import { createClient } from '@supabase/supabase-js';

// Jo URL aur Key humne pehle dhundi thi, wo yahan paste karein
const supabaseUrl = 'https://mqlrhhsidfxmejqadkuc.supabase.co/rest/v1/'; 
const supabaseAnonKey = 'sb_publishable_FM_-tVnDsQ4Holorh6_g_Q_La0Tohql'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);