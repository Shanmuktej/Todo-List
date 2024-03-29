import Head from "next/head";
import { Container } from "react-bootstrap";
import AppContainer from "../components/AppContainer";

export default function Home() {
  return (
    <Container className="vh-100 m-0 p-0" fluid>
      <Head>
        <title>Anem Shanmuka Chandra Teja</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AppContainer />
      </main>
    </Container>
  );
}
