import App, {Container} from 'next/app';
import { AppContextProvider } from '@constants/utils/Context';

import '../styles/globals.css'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }) {
  return <AppContextProvider><Component {...pageProps} /></AppContextProvider>
}

export default MyApp
