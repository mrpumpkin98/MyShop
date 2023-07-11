import { useRouter } from "next/router";

export const onClickMarket = () => {
  const router = useRouter();
  const onClickSubmitMove = (
    event: React.MouseEvent<HTMLTableDataCellElement>
  ) => {
    router.push(`/Market/${event.currentTarget.id}`);
  };
  return {
    onClickSubmitMove,
  };
};
