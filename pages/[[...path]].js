import { useRouter } from 'next/router';
import { BuilderComponent, Builder, builder } from '@builder.io/react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { getTargetingValues } from '@builder.io/personalization-utils';
import { supabase } from '../utils/supabaseServer';

export async function getStaticProps({ params }) {
  const isPersonalizedRequest = params?.path?.[0].startsWith(';');
  const page =
    (await builder
      .get('page', {
        apiKey: 'e89fbe16533145d4ae320467ed536a91',
        userAttributes: isPersonalizedRequest
          ? {
              // if it's a personalized page let's fetch it:
              ...getTargetingValues(params.path[0].split(';').slice(1)),
            }
          : {
              urlPath: '/' + (params?.path?.join('/') || ''),
            },
        cachebust: true,
      })
      .toPromise()) || null;

  const { data: sports } = await supabase
    .from('sports')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    props: {
      page,
      sports,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    apiKey: 'e89fbe16533145d4ae320467ed536a91',
  });

  return {
    // new set ensure unique urls, as there could be multiple pages on the same url, variations will be handled by middlewar
    paths: [...new Set(pages.map((page) => `${page.data?.url}`))],
    fallback: true,
  };
}

export default function Path({ page, sports }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const isLive = !Builder.isEditing && !Builder.isPreviewing;
  if (!page && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  const { title, description, image } = page?.data || {};
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BuilderComponent
        renderLink={Link}
        model="page"
        content={page}
        data={{ sports }}
      />
    </>
  );
}
