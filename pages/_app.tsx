import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/TodoApp.css";
import "../styles/Portfolio.css";
import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
