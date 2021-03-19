import { format } from "date-fns"
import { GetServerSidePropsContext } from "next"
import Link from "next/link"
import React from "react"
import MainContainer from "../../../components/admin_navigation"
import PageContent from "../../../components/PageContent"
import Table from "../../../components/Table"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUserCookieData } from "../../auth/AuthModel"
import { FetchAccountRolesOnly } from "../../auth/AuthService"
import { usePlansCustomers } from "./PlanService"

const Plans = (props) => {
  const { data } = usePlansCustomers(props?.cookies?.a_t)

  const columns = [
    {
      id: 'id',
      accessor: 'id',
      Header: '',
      Cell: (cell) => {
        return (
          <Link href={`/admin/plans/${cell.row.values.id}`}>
            <a className='text-blue-500 hover:underline active:text-blue-800'>Ver detalles</a>
          </Link>
        )
      }
    },
    {
      id: 'planName',
      accessor: 'planName',
      Header: 'Plan'
    },
    {
      id: 'initialFee',
      accessor: 'initialFee',
      Header: 'Initial Fee'
    },
    {
      id: 'monthlyFee',
      accessor: 'monthlyFee',
      Header: 'Monthly Fee'
    },
    {
      id: 'status',
      accessor: 'status',
      Header: 'Status',
      Cell: (cell) => {
        const { status } = cell.row.values
        return (
          <div className={`font-semibold ${status === 'success' ?  'text-green-400': (status === 'pending' ? 'text-orange-400' : status === 'cancelled' && 'text-red-600')}`}>{status}</div>
        )
      }
    },
    {
      id: 'createdDate',
      accessor: 'createdDate',
      Header: 'Fecha de solicitud',
      Cell: (cell) => {
        return (
          <div>
            {format(new Date(cell.row.values.createdDate), 'PPPP pp')}
          </div>
        )
      }
    }
  ]

  return (
    <MainContainer>
      {
        data ?
          <PageContent title={'Customers\' plans'}>
            <Table columns={columns} data={data} size='full' />
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

export default Plans