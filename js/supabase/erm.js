import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://qjbldrvxwmhfwjealpju.supabase.co'
const supabaseKey = 'sb_publishable_YmAZagM2Tlp8omJU-Fccaw_13CRbalf'

export const supabase = createClient(supabaseUrl, supabaseKey)