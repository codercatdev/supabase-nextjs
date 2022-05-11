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
        setSports((current) => [payload.new, ...current]);
        // supabase
        //   .from('sports')
        //   .select('*')
        //   .order('created_at', { ascending: false })
        //   .then((d) => console.log(d));
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
          <ul
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
          >
            {sports?.map((sport) => (
              <li
                key={sport.id}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
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
                <div>{sport.name}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
