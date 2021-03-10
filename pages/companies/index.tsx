import React from "react"
import { useQueryClient } from "react-query"
import MainContainer from "../../components/navigation"
import PageContent from "../../components/PageContent"
import { useAuth } from "../auth/AuthService"
import { useCompanies } from "./CompanyService"

const Companies = () => {
  const queryClient = useQueryClient()
  const auth = useAuth(queryClient)
  const { data, isLoading } = useCompanies(auth?.a_t)

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
      {data ? <PageContent title='Companies' data={data} columns={columns} isLoading={isLoading} /> : 'Loading...'}
    </MainContainer>
  )
}

export default Companies