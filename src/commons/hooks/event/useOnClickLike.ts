import { useRouter } from "next/router";
import { FETCH_USED_ITEM } from "../queries/UseQueryFetchUsedItem";
import { useMutation } from "@apollo/client";
import { TOGGLE_USED_ITEM_PICK } from "../mutations/UseMutationToggleUsedItemPick";

export const useOnClickLike = () => {
  const router = useRouter();
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK);
  const onClickLike = async (): Promise<void> => {
    const result = await toggleUseditemPick({
      variables: { useditemId: router.query.useditemId },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM,
          variables: { useditemId: router.query.useditemId },
        },
      ],
    });
  };
  return {
    onClickLike,
  };
};
