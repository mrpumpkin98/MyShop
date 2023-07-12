import { useRouter } from "next/router";

export const useOnClickMarket = () => {
  const router = useRouter();
  const onClickSubmit = (event: React.MouseEvent<HTMLTableDataCellElement>) => {
    router.push(`/Market/${event.currentTarget.id}`);
  };
  return {
    onClickSubmit,
  };
};
