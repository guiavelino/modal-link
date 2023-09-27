import { RequestModalProvider } from "@/contexts/RequestModal";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RequestModalProvider>
      <Component {...pageProps} />
    </RequestModalProvider>
  );
}
