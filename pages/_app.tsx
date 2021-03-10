import '../styles/index.css'
import 'tailwindcss/tailwind.css';
import 'nprogress/nprogress.css'

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { ReactQueryDevtools } from 'react-query/devtools'
import { FetchAccountRoles, useAuth } from './auth/AuthService';
import { deleteSpecificCookies, documentCookieJsonify } from '../utils';
import NProgress from 'nprogress'
import { LoggedInUser } from './auth/AuthModel';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: Infinity
    },
  },
})

function MyApp({ Component, pageProps }) {
  const [currentAuth, setCurrentAuth] = useState<LoggedInUser>(undefined)
  const [resolved, setResolved] = useState<boolean>(false)

  const router = useRouter()
  const auth: LoggedInUser = useAuth(queryClient)

  useEffect(() => {
    currentAuth && (async () => {
      try {
        const res: LoggedInUser = await FetchAccountRoles(queryClient, currentAuth)
        console.log('haww', res)
        if (res?.error) {
          router.push('/auth/login')
          deleteSpecificCookies(['uid', 'a_t'])
        }
        setResolved(true)
      }
      catch (e) {
        throw e
      }
    })()
  }, [currentAuth])

  useEffect(() => {
    const parsedCookie: LoggedInUser = documentCookieJsonify(document.cookie)
    const isParsedCookieUnd = parsedCookie.uid === null || parsedCookie.a_t === '' ? false : true
    const authData = auth ?? parsedCookie

    auth ?? !isParsedCookieUnd ? undefined : setCurrentAuth({ uid: parsedCookie.uid, a_t: parsedCookie.a_t })

    const listenCookieChange = (callback, interval) => {
      let cookieInQuery = authData?.uid?.toString()

      if (cookieInQuery) {
        let timer = setInterval(() => {
          let cookieExists = document.cookie.includes(cookieInQuery)
          if (!cookieExists) {
            try {
              callback();
              clearInterval(timer)
              queryClient.clear()
            } finally {
              cookieInQuery = authData?.uid?.toString()
            }
          }
        }, interval);
      }
    }

    listenCookieChange(() => {
      router.push('/auth/login')
    }, 3000);

  }, [])

  useEffect(() => {
    const parsedCookie: LoggedInUser = documentCookieJsonify(document.cookie)

    if ((!parsedCookie.uid || !parsedCookie.a_t) && router.pathname !== '/auth/signup') router.push('/auth/login')
  }, [])

  useEffect(() => { }, [resolved])

  useEffect(() => {
    NProgress.configure({ showSpinner: true })
    let routeChangeStart = () => NProgress.start();
    let routeChangeComplete = () => NProgress.done();

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeComplete);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeComplete);
    };
  }, []);

  useEffect(() => {
    if (!!auth?.uid && router.pathname === '/') router.push('/')
  }, [auth?.uid])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
