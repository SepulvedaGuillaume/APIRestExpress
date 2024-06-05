import "@/styles/globals.sass";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Layout from "@/pages/layout";
import { BasketProvider } from "@/contexts/basketContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <BasketProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BasketProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
