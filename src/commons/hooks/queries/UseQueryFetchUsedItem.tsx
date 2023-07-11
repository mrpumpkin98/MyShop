import { gql, useQuery } from "@apollo/client";
import { IQuery, IQueryFetchUseditemArgs } from "../../types/generated/types";
import { useRouter } from "next/router";

export const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      createdAt
      seller {
        _id
        name
        email
        picture
      }
      pickedCount
      useditemAddress {
        zipcode
        address
        addressDetail
        lat
        lng
      }
    }
  }
`;

interface IuseQueryFetchUsedItem {
  data?: Pick<IQuery, "fetchUseditem">;
}

export const useQueryFetchUsedItem = (): IuseQueryFetchUsedItem => {
  const router = useRouter();

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: {
      useditemId: String(router.query.useditemId),
    },
  });

  return { data };
};
