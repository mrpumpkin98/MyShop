import Head from "next/head";
import HOME from "../pages/Market/index";
export default function Home() {
  return (
    <div>
      <Head>
        <title>리유즈마켓</title>
        <link rel="icon" type="image/png" href="/images/icons/logo.png" />
      </Head>

      <HOME />
    </div>
  );
}
