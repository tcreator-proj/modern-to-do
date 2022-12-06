import '../styles.scss';
import type { AppProps } from "next/app";
import { wrapper } from "../src/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
    {typeof window === 'undefined' ? null : <Component {...pageProps} />}
  </div>
}

  export default wrapper.withRedux(MyApp);