import { supabase } from '../utils/supabaseClient';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Sports({ session }) {
  const [sports, setSports] = useState([]);
  useEffect(() => {
    const sub = supabase
      .from('sports')
      .on('*', (payload) => {
        supabase
          .from('sports')
          .select('*')
          .order('created_at', { ascending: false })
          .then((d) => setSports(d.data));
      })
      .subscribe();
    supabase
      .from('sports')
      .select('*')
      .order('created_at', { ascending: false })
      .then((d) => setSports(d.data));
    return () => {
      if (sub) sub.unsubscribe();
    };
  }, []);

  const addSports = async () => {
    const name = faker.name.findName();
    const image = faker.image.sports(null, null, true);
    await supabase.from('sports').insert([{ name, image }]);
  };
  return (
    <div>
      {session && (
        <div>
          <button onClick={() => addSports()}>Add Sports</button>
          {sports.map((sport) => (
            <li key={sport.id} style={{ display: 'grid' }}>
              <div>{sport.name}</div>
              {sport.image && (
                <div>
                  <Image
                    loader={(image) => image.src}
                    src={sport.image}
                    width="100px"
                    height="100px"
                    alt={sport.name}
                  />
                </div>
              )}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
