import { gql, useQuery } from "@apollo/client";
import { IQuery } from "../../types/generated/types";

export const FETCH_USED_ITEMS_OF_THE_BEST = gql`
  query fetchUseditemsOfTheBest {
    fetchUseditemsOfTheBest {
      _id
      images
      name
      remarks
      price
      pickedCount
    }
  }
`;

export const useQueryFetchUseditemsOfTheBest = () => {
  const { data, refetch } = useQuery(FETCH_USED_ITEMS_OF_THE_BEST);
  return {
    data,
    refetch,
  };
};
