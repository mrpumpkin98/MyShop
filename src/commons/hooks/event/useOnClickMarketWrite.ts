import { useMutation } from "@apollo/client";
import { CREATE_USED_ITEM } from "../mutations/UseMutationCreateUsedItem";
import { IMutation } from "../../types/generated/types";
import { IMutationCreateUseditemArgs } from "../../types/generated/types";
import { useRouter } from "next/router";
import { useQueryFetchUsedItems } from "../queries/UseQueryFetchUsedItems";

export const useOnClickMarketWrite = (
  fileUrls: any,
  address: any,
  gLat: any,
  gLng: any
) => {
  const router = useRouter();
  const [createUseditem] = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);

  const { refetch } = useQueryFetchUsedItems();

  const onClickMarketWrite = async (data: any): Promise<void> => {
    const result = await createUseditem({
      variables: {
        createUseditemInput: {
          name: data.name,
          remarks: data.remarks,
          price: Number(data.price),
          tags: data.tags, //여기서도 split(" ")가능
          images: [...fileUrls],
          contents: data.contents,
          useditemAddress: {
            address: address,
            addressDetail: data.addressDetail,
            lat: gLat,
            lng: gLng,
          },
        },
      },
    });
    await refetch();
    const { Modal } = await import("antd");
    Modal.success({ content: "상품 등록에 성공하였습니다!" });
    const useditemId: string = result.data
      ? result.data.createUseditem._id
      : "";
    void router.push(`/Market/${useditemId}`);
  };
  return { onClickMarketWrite };
};
