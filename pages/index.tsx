import Head from "next/head";
import HOME from "../src/components/units/market/list/MarketList.index";
export default function Home() {
  return (
    <div>
      <Head>
        <title>MyShop</title>
      </Head>
      <HOME />
    </div>
  );
}
