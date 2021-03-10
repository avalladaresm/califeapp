import { GetServerSidePropsContext } from "next"
import React from "react"
import MainContainer from "../../../components/client_navigation"
import ClientPages from "../../../components/client_navigation/ClientPages"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUser } from "../../auth/AuthModel"

const Payments = () => {
  return (
    <MainContainer>
      <div className='flex flex-row border border-pink-700 space-x-3'>
        <ClientPages />
        <div className='w-full p-5 border border-gray-300 bg-white'>
          Payments
        </div>
      </div>
    </MainContainer>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const parsedCookie: LoggedInUser = ctx.req.headers.cookie && documentCookieJsonify(ctx.req?.headers?.cookie)

  if (!parsedCookie?.a_t) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      cookies: {
        uid: parsedCookie.uid,
        a_t: parsedCookie.a_t
      }
    }
  }
}

export default Payments