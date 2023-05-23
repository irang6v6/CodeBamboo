import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { isBrowser } from 'browser-or-node';
import { Layout } from '@/components/common/Layout';
import Modal from '@/components/common/LoginModal';

if (isBrowser) {
  require('codemirror/mode/htmlmixed/htmlmixed');
  require('codemirror/mode/css/css');
  require('codemirror/mode/javascript/javascript');
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Head>
          <title>Code Bamboo</title>
          <link rel="icon" href="/codebamboo.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
          <Modal />
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
