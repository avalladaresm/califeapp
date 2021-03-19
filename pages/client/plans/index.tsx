import { format } from "date-fns"
import { GetServerSidePropsContext } from "next"
import React from "react"
import MainContainer from "../../../components/client_navigation"
import ClientPages from "../../../components/client_navigation/ClientPages"
import PageContent from "../../../components/PageContent"
import Table from "../../../components/Table"
import { FetchUser, useUser } from "../../../services/User"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUserCookieData } from "../../auth/AuthModel"
import { usePlans, usePlansCustomer } from "./PlansService"

const Plans = (props) => {
  const user = useUser(props?.cookies?.a_t, props?.loggedInUser?.idUser)
  const planCustomer = usePlansCustomer(props?.cookies?.a_t, props?.loggedInUser?.idUser)
  const { } = usePlans(props?.cookies?.a_t)

  const columns = [
    {
      id: 'planName',
      accessor: 'planName',
      Header: 'Plan'
    },
    {
      id: 'status',
      accessor: 'status',
      Header: 'Status'
    },
    {
      id: 'createdDate',
      accessor: 'createdDate',
      Header: 'Fecha de creación',
      Cell: (cell) => {
        return (
          <div>{format(new Date(cell.row.values.createdDate), 'PPPP pp')}</div>
        )
      }
    }
  ]

  return (
    <MainContainer customerName={user.data && user.data.name} userProfile={user.data && user.data.idUserProfile}>
      <div className='flex flex-row space-x-3'>
        <ClientPages customerName={user.data && user.data.name} />
        <div className='w-full p-5 border border-gray-300 bg-white'>
          {
            planCustomer?.data ?
              <PageContent title='Mis planes' >
                <div className='whitespace-nowrap'>
                  <Table columns={columns} data={planCustomer?.data} size='full' />
                </div>
              </PageContent> :
              'Loading...'
          }
        </div>
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

  const loggedInUser = await FetchUser(parsedCookie.a_t, parsedCookie.uid)
  return {
    props: {
      cookies: {
        uid: parsedCookie.uid,
        a_t: parsedCookie.a_t
      },
      loggedInUser: loggedInUser
    }
  }
}

export default Plans