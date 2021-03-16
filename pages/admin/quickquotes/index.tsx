import { GetServerSidePropsContext } from "next"
import MainContainer from "../../../components/admin_navigation"
import { useQuickQuotes } from "../../../services/QuickQuote"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUserCookieData } from "../../auth/AuthModel"

const Dashboard = (props) => {
  const { data } = useQuickQuotes(props?.cookies?.a_t)

  return (
    <MainContainer>
      <div className='flex justify-center'>
        Quick quotes!!!!!!!!!!
      </div>
    </MainContainer>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const parsedCookie: LoggedInUserCookieData = ctx.req.headers.cookie && documentCookieJsonify(ctx.req?.headers?.cookie)

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