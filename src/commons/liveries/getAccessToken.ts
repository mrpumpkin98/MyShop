import { gql, GraphQLClient } from "graphql-request";

interface RestoreAccessTokenResponse {
  restoreAccessToken: {
    accessToken: string;
  };
}

const RESTORE_ACCESS_TOKEN = gql`
  mutation {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const graphQLClient = new GraphQLClient(
      "https://backend12.codebootcamp.co.kr/graphql01",
      { credentials: "include" }
    );

    const result = await graphQLClient.request<RestoreAccessTokenResponse>(
      RESTORE_ACCESS_TOKEN
    );
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
