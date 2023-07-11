import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import ApolloSetting from "../src/commons/apollo";
import Layout from "../src/components/commons/layout";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import store from "../src/commons/stores/store";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <ApolloSetting>
          <>
            <Global styles={globalStyles} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </>
        </ApolloSetting>
      </Provider>
    </RecoilRoot>
  );
}
