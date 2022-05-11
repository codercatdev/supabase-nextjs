import { supabase } from '../utils/supabaseClient';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Animals({ session }) {
  const [animals, setAnimals] = useState([]);
  useEffect(() => {
    const sub = supabase
      .from('animals')
      .on('*', (payload) => {
        setAnimals((current) => [payload.new, ...current]);
        // supabase
        //   .from('animals')
        //   .select('*')
        //   .order('created_at', { ascending: false })
        //   .then((d) => setAnimals(d.data));
      })
      .subscribe();
    supabase
      .from('animals')
      .select('*')
      .order('created_at', { ascending: false })
      .then((d) => setAnimals(d.data));
    return () => {
      if (sub) sub.unsubscribe();
    };
  }, []);

  const addSports = async () => {
    const name = faker.name.findName();
    const image = faker.image.animals(null, null, true);
    await supabase.from('animals').insert([{ name, image }]);
  };
  return (
    <div>
      {session && (
        <div>
          <button onClick={() => addSports()}>Add Animals</button>
          <ul
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
          >
            {animals?.map((sport) => (
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
