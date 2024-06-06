import "@/styles/globals.sass";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Layout from "@/pages/layout";
import { BasketProvider } from "@/contexts/basketContext";
import { CategoryProvider } from "@/contexts/categoryContext";
import { SearchProvider } from "@/contexts/searchContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <BasketProvider>
      <SearchProvider>
        <CategoryProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CategoryProvider>
      </SearchProvider>
    </BasketProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
