import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import MainContainer from "../../../components/admin_navigation"
import ViewQuote from "../../../components/forms/ViewQuote"
import PageContent from "../../../components/PageContent"
import { FetchQuickQuote } from "../../../services/QuickQuote"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUserCookieData } from "../../auth/AuthModel"
import { FetchAccountRolesOnly } from "../../auth/AuthService"

const QuoteId = (props) => {
  const [_quickQuoteData, _setQuickQuoteData] = useState();
  const router = useRouter()
  const { quoteId } = router.query

  useEffect(() => {
    (async () => {
      _setQuickQuoteData(await FetchQuickQuote(props?.cookies?.a_t, Number(quoteId)))
    })()
  }, []);

  return (
    <MainContainer>
      {
        _quickQuoteData ?
          <PageContent title={'Detalles de la cotización rápida'}>
            {_quickQuoteData && <ViewQuote quickQuoteData={_quickQuoteData} />}
          </PageContent> :
          'Loading...'
      }
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

  const accountRoles = await FetchAccountRolesOnly(parsedCookie)
  return {
    props: {
      cookies: {
        uid: parsedCookie.uid,
        a_t: parsedCookie.a_t,
        r: accountRoles
      }
    }
  }
}

export default QuoteId