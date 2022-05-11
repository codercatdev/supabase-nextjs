import '../styles/globals.css';
import Header from '../components/Header';
import { Builder } from '@builder.io/react';

import { Button } from '@supabase/ui';

const supaButton = ({ text }) => <Button>{text}</Button>;

Builder.registerComponent(supaButton, {
  name: 'Supa Button',

  inputs: [
    {
      name: 'text',
      type: 'string',
      defaultValue: 'Jon',
    },
  ],
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
