import Head from "next/head";
import HOME from "../src/components/units/login/SignIn/signIn.index";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Reused</title>
      </Head>
      <HOME />
    </div>
  );
}
