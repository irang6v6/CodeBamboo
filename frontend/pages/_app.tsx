import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css'
import 'codemirror/lib/codemirror.css'
import { Layout } from '@/components/common/Layout';
import Modal from '@/components/common/LoginModal';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
          <Modal/>
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  ) 
}
