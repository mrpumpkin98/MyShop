import Head from "next/head";
import Board from "../src/components/units/board/list/BoardList.index";
export default function Home() {
  return (
    <div>
      <Head>
        <title>MyShop</title>
      </Head>
      <Board />
    </div>
  );
}
