import { useRouter } from "next/router";
import { CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING } from "../mutations/useMutationCreatePointTransactionOfBuyingAndSelling";
import { useMutation } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "../queries/UseQueryFetchUserLogedIn";
import { FETCH_POINT_TRANSACTION } from "../queries/UseQueryFetchPointTransaction";
import { FETCH_POINT_TRANSACTION_OF_BUYING } from "../queries/UseQueryFetchPointTransactionOfBuying";
import { FETCH_USED_ITEMS } from "../queries/UseQueryFetchUsedItems";

export const useOnClickBuyingAndSelling = () => {
  const router = useRouter();
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );
  const onClickBuyingAndSelling = async (data: any): Promise<void> => {
    const result = await createPointTransactionOfBuyingAndSelling({
      variables: {
        useritemId: router.query.useditemId,
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEMS,
        },
        {
          query: FETCH_USER_LOGGED_IN,
          variables: { useritemId: router.query.useditemId },
        },
        {
          query: FETCH_POINT_TRANSACTION,
          variables: { useritemId: router.query.useditemId },
        },
        {
          query: FETCH_POINT_TRANSACTION_OF_BUYING,
          variables: { useritemId: router.query.useditemId },
        },
      ],
    });
    alert(`상품을 구매했습니다.`);
    console.log(router.query.useditemId);
    router.push(`/Market`);
  };
  return {
    onClickBuyingAndSelling,
  };
};
