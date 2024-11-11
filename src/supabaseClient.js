import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kakflzsvsspumoriullc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtha2ZsenN2c3NwdW1vcml1bGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNjMxMjcsImV4cCI6MjA0NjgzOTEyN30.Q3AUFZ9K2FXYZaBF9RoBqxO-RNH1-Ug8lMHdZBD3PIU'; // Encuentra la clave en el panel de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
