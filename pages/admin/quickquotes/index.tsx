import { format } from "date-fns"
import { GetServerSidePropsContext } from "next"
import Link from 'next/link'
import React from "react"
import MainContainer from "../../../components/admin_navigation"
import PageContent from "../../../components/PageContent"
import Table from "../../../components/Table"
import { useQuickQuotes } from "../../../services/QuickQuote"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUserCookieData } from "../../auth/AuthModel"

const QuickQuote = (props) => {
  const { data } = useQuickQuotes(props?.cookies?.a_t)

  const columns = [
    {
      id: 'id',
      accessor: 'id',
      Header: '',
      Cell: (cell) => {
        return (
          <Link href={`/admin/quickquotes/${cell.row.values.id}`}>
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
      id: 'userName',
      accessor: 'userName',
      Header: 'Nombre de la cuenta'
    },
    {
      id: 'installments',
      accessor: 'installments',
      Header: 'Periodo de pago',
      Cell: (cell) => {
        let installmentInWords = ''
        switch (cell.row.values.installments) {
          case 12:
            installmentInWords = 'mensual'
            break
          case 6:
            installmentInWords = 'bi-mensual'
            break
          case 4:
            installmentInWords = 'trimestral'
            break
          case 2:
            installmentInWords = 'semestral'
            break
          case 1:
            installmentInWords = 'anual'
            break
        }
        return <div>{installmentInWords}</div>
      }
    },
    {
      id: 'installmentPayment',
      accessor: 'installmentPayment',
      Header: 'Valor cuota',
      Cell: (cell) => {
        return (
          <div>
            {cell.row.values.installmentPayment.toLocaleString('en-US', { style: 'currency', currency: 'HNL', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 })}
          </div>
        )
      }
    },
    {
      id: 'totalQuickQuote',
      accessor: 'totalQuickQuote',
      Header: 'Total',
      Cell: (cell) => {
        const { installmentPayment, downPayment } = cell.row.original
        let installments = 0
        let total = 0
        switch (cell.row.values.installments) {
          case 12:
            installments = 11
            break
          case 6:
            installments = 5
            break
          case 4:
            installments = 3
            break
          case 2:
            installments = 1
            break
          case 1:
            installments = 0
            break
        }
        total = (installments * installmentPayment) + downPayment
        return (
          <div>
            {total.toLocaleString('en-US', { style: 'currency', currency: 'HNL', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 })}
          </div>
        )
      }
    },
    {
      id: 'createdAt',
      accessor: 'createdAt',
      Header: 'Fecha de solicitud',
      Cell: (cell) => {
        return (
          <div>
            {format(new Date(cell.row.values.createdAt), 'PPPP pp')}
          </div>
        )
      }
    }
  ]

  return (
    <MainContainer>
      {
        data ?
          <PageContent title='Cotizaciones rápidas'>
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

  return {
    props: {
      cookies: {
        uid: parsedCookie.uid,
        a_t: parsedCookie.a_t
      }
    }
  }
}

export default QuickQuote