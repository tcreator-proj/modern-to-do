import '../styles.sass';
import type { AppProps } from "next/app";
import { wrapper } from "../src/redux/store";

function MyApp({ Component, pageProps }: AppProps) {

  return <div>
    {<Component {...pageProps} />}
  </div>
}

export default wrapper.withRedux(MyApp);