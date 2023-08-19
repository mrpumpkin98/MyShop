import { useMutation } from "@apollo/client";
import { UPDATE_USED_ITEM } from "../mutations/UseMutationUpdateUsedItem";
import {
  IMutation,
  IMutationUpdateUseditemArgs,
} from "../../types/generated/types";
import { FETCH_USED_ITEM } from "../queries/UseQueryFetchUsedItem";
import { useRouter } from "next/router";
import { useQueryFetchUsedItems } from "../queries/UseQueryFetchUsedItems";
import { Modal } from "antd";

export const useOnClickMarketUpdate = (
  fileUrls: any,
  props: any,
  address: any,
  gLat: any,
  gLng: any
) => {
  const router = useRouter();
  const [updateUseditem] = useMutation<
    Pick<IMutation, "updateUseditem">,
    IMutationUpdateUseditemArgs
  >(UPDATE_USED_ITEM);

  const { refetch } = useQueryFetchUsedItems();

  const onClickMarketUpdate = async (data: any): Promise<void> => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles;

    if (address === "" && !isChangedFiles) {
      alert("수정한 내용이 없습니다.");
      return;
    }

    if (typeof router.query.useditemId !== "string") {
      alert("시스템에 문제가 있습니다.");
      return;
    }
    const result = await updateUseditem({
      variables: {
        updateUseditemInput: {
          name: data.name,
          remarks: data.remarks,
          price: Number(data.price),
          tags: data.tags,
          images: [...fileUrls],
          contents: data.contents,
          useditemAddress: {
            address: address,
            addressDetail: data.addressDetail,
            lat: gLat,
            lng: gLng,
          },
        },
        useditemId: router.query.useditemId,
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM,
          variables: { useditemId: router.query.useditemId },
        },
      ],
    });

    if (result.data?.updateUseditem._id === undefined) {
      alert("요청에 문제가 있습니다.");
      return;
    }
    await refetch();
    void router.push(`/Market/${result.data?.updateUseditem._id}`);
    Modal.success({
      title: "상품 수정 완료",
      content: "상품이 수정되었습니다.",
    });
  };
  return { onClickMarketUpdate };
};
