import { GetServerSidePropsContext } from "next"
import MainContainer from "../../../components/admin_navigation"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUser } from "../../auth/AuthModel"

const Dashboard = () => {
  return (
    <MainContainer>
      <div>Dashboard</div>
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

export default Dashboard