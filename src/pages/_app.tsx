import '../styles/globals.css'
import { GlobalState } from '@context/global-state/GlobalState'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import 'react-toastify/dist/ReactToastify.css'
import AxiosState from '@context/axios/AxiosState'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App ({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
        theme="light"
        limit={2}
      />
      <AxiosState>
        <GlobalState>
          <Component {...pageProps} />
        </GlobalState>
      </AxiosState>
    </>
  )
}
