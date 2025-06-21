import React from 'react';
import { supabase } from '@/lib/supabaseClient';

function App() {
  React.useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        const { data, error, status } = await supabase.from('users').select('*', { count: 'exact', head: true });
        
        if (error) {
          if (status === 404 || (error.code && error.code === '42P01') || (error.message && error.message.includes('relation "public.users" does not exist'))) {
            console.warn("A tabela 'users' (public.users) não foi encontrada ou está inacessível. Isso pode ser normal se ela ainda não foi criada ou se as permissões RLS não estão configuradas. A autenticação usa auth.users.");
          } else {
            console.error("Erro ao testar conexão com Supabase (public.users - contagem):", error);
          }
        } else if (data === null && status === 200 && supabase.rpc) { 
          console.log("Conexão com Supabase bem-sucedida! A tabela 'public.users' existe.");
        } else {
           console.log("Conexão com Supabase (public.users) estabelecida, mas não retornou dados nem erro específico para a tabela 'public.users'. Status:", status);
        }
      } catch (e) {
        console.error("Exceção ao testar conexão com Supabase (public.users):", e);
      }
    };
    if (supabase) {
      testSupabaseConnection();
    } else {
      console.warn("Cliente Supabase não inicializado.");
    }
  }, []);


  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Conteúdo legado removido */}
    </div>
  );
}

export default App;