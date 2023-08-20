import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import ApolloSetting from "../src/commons/apollo";
import Layout from "../src/components/commons/layout";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import store from "../src/commons/stores/store";
import MobilePage from "../src/commons/deviceDetect";
import { isMobile } from "react-device-detect";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <Head>
        <title>리유즈마켓</title>
        <link rel="icon" type="image/png" href="/images/icons/logo.png" />
      </Head>
      <Provider store={store}>
        <ApolloSetting>
          <>
            <Global styles={globalStyles} />
            {isMobile ? (
              <MobilePage />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </>
        </ApolloSetting>
      </Provider>
    </RecoilRoot>
  );
}
