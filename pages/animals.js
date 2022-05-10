import Animals from '../components/Animals';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
  const [session, setSession] = useState(null);
  const [me, setMe] = useState(null);
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <>
      <div className="container">
        <Animals session={session} />
      </div>
    </>
  );
}
