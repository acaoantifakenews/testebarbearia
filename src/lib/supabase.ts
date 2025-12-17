import { createClient } from '@supabase/supabase-js'

// Pega a URL e a Chave Anon do Supabase a partir das variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validação para garantir que as variáveis de ambiente foram configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required. Check your .env.local file.")
}

// Cria e exporta o cliente Supabase para ser usado em toda a aplicação
export const supabase = createClient(supabaseUrl, supabaseAnonKey)