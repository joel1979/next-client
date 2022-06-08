import '../styles/globals.css'
import useSWR, { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig 
    value={{
      refreshInterval: 3000,
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>
  )
  
}

export default MyApp
