import { RequestModalProvider } from "@/contexts/RequestModal";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RequestModalProvider>
        <Component {...pageProps} />
      </RequestModalProvider>
    </SessionProvider>
  );
}
