import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Menu } from '../components/Menu'
import { UserContextProvider } from '../components/userContext'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <UserContextProvider>
      <ChakraProvider>
        <Menu />
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContextProvider>
  </>
}
