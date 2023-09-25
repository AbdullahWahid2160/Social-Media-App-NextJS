import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eggcrheyguhghujhtevz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZ2NyaGV5Z3VoZ2h1amh0ZXZ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTIyMDE3NiwiZXhwIjoyMDEwNzk2MTc2fQ.zMy5QRpvZ4-nlQfkG2SDnq3vTFuKExu523anJnla0Ns';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
