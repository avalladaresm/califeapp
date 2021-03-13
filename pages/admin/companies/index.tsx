import { GetServerSidePropsContext } from "next"
import React from "react"
import MainContainer from "../../../components/admin_navigation"
import PageContent from "../../../components/PageContent"
import Table from "../../../components/Table"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUserCookieData } from "../../auth/AuthModel"
import { FetchAccountRolesOnly } from "../../auth/AuthService"
import { useCompanies } from "./CompanyService"

const Companies = (props) => {
  const { data } = useCompanies(props?.cookies?.a_t)

  const handleButtonClick = (e, row) => {
    console.log(e, row)
  }

  const columns = [
    {
      id: 'name',
      accessor: 'name',
      Header: 'Name'
    },
    {
      id: 'description',
      accessor: 'description',
      Header: 'Description'
    },
    {
      id: 'edit',
      Header: 'Acciones',
      Cell: ({ cell }) => (
        <div className='flex flex-row'>
          <button onClick={(e) => handleButtonClick(e.type, cell.row)}>
            Edit
          </button>
          <button value={cell.row.values.name} onClick={(e) => handleButtonClick(e.type, cell.row)}>
            Disable
          </button>
        </div>
      )
    }
  ]

  return (
    <MainContainer>
      {
        data ?
          <PageContent title='Companies'>
            <Table columns={columns} data={data} />
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

export default Companies