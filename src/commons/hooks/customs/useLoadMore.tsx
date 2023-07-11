import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS } from "../queries/UseQueryFetchUsedItems";

export const onLoadMore = (): void => {
  const { data, refetch, fetchMore } = useQuery(FETCH_USED_ITEMS);
  if (data === undefined) return;
  void fetchMore({
    variables: {
      page: Math.ceil((data?.fetchUseditems.length ?? 10) / 10) + 1,
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (fetchMoreResult.fetchUseditems === undefined) {
        return {
          fetchUseditems: [...prev.fetchUseditems],
        };
      }
      return {
        fetchUseditems: [
          ...prev.fetchUseditems,
          ...fetchMoreResult.fetchUseditems,
        ],
      };
    },
  });
};
