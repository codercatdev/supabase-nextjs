import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import Auth from '../components/Auth';
import Account from '../components/Account';

export default function Home() {
  return (
    <>
      <div className="container">Welcome to CodingCat.dev Supabase Example</div>
    </>
  );
}
