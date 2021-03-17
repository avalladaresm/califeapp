import React, { useMemo } from "react"
import { useTable } from 'react-table'

const Table = (props) => {
  const columns = useMemo(() => props.columns, [])
  const data = useMemo(() => props.data, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <div className="flex flex-col px-4 items-center mb-5">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="align-middle inline-block sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border border-gray-300 sm:rounded-lg">
            <table {...getTableProps()} className='table-auto max-w-full min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-100' >
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()} className='font-semibold'>
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps()}
                        className='px-6 py-3 text-left text-sm text-gray-600 uppercase tracking-wider'
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className='bg-white divide-y divide-gray-200'>
                {rows.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()} className='border-b border-gray-300'>
                      {row.cells.map(cell => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className='px-6 py-3 whitespace-normal'
                          >
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table