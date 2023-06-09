import Head from "next/head";
import LandingPage from "../src/components/units/landingPage";
export default function Home() {
  return (
    <div>
      <Head>
        <title>MyShop</title>
      </Head>
      <LandingPage />
    </div>
  );
}
