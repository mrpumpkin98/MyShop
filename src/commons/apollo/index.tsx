// import {
//   ApolloClient,
//   ApolloLink,
//   ApolloProvider,
//   InMemoryCache,
// } from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";
// import { useRecoilState } from "recoil";
// import { accessTokenState } from "../stores";
// import { useEffect } from "react";
// import io from "socket.io-client";

// const GLOBAL_STATE = new InMemoryCache(); // 컴퓨터 메모리에다가 백엔드에서 받아온 데이터 모두 임시로 저장해놓기 => 나중에 알아보기

// interface IApolloSettingProps {
//   children: JSX.Element;
// }

// export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
//   const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

//   useEffect(() => {
//     const result = localStorage.getItem("accessToken");
//     setAccessToken(result ?? "");
//   }, []);

//   const uploadLink = createUploadLink({
//     uri: "http://backend-practice.codebootcamp.co.kr/graphql",
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   const client = new ApolloClient({
//     link: ApolloLink.from([uploadLink]),
//     cache: GLOBAL_STATE,
//   });

//   return (
//     <>
//       <></>
//       <ApolloProvider client={client}>{props.children}</ApolloProvider>
//       <></>
//     </>
//   );
// }

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../../commons/stores/index";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../liveries/getAccessToken";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const restoreToken = useRecoilValueLoadable(restoreAccessTokenLoadable);

  useEffect(() => {
    void restoreToken.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? "");
    });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");

              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE,
  });

  // prettier-ignore
  return (
        <ApolloProvider client={client}>
          {props.children}
        </ApolloProvider>
      )
}
