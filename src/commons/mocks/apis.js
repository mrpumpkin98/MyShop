import { graphql } from "msw";

const gql = graphql.link("http://mock.com/graphql");
export const apis = [
  gql.mutation("createBoard", (req, res, ctx) => {
    const { wrtier, title, contents } = req.variables.createBoardInput;

    return res(
      ctx.data({
        createBoard: {
          _id: "qqq",
          wrtier,
          title,
          contents,
          __typename: "Board",
        },
      })
    );
  }),
];

// 테스트 코드 추가
export const testApis = [
  gql.mutation("deleteBoard", (req, res, ctx) => {
    const { boardId } = req.variables;

    return res(
      ctx.data({
        deleteBoard: {
          _id: boardId,
          success: true,
          message: "Board deleted successfully",
          __typename: "BoardDeleteResult",
        },
      })
    );
  }),
];
