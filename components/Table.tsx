import React, { useMemo } from "react"
import Button from "./Button"
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
    <table {...getTableProps()} className='table-auto max-w-full w-full mb-0 border border-blueGray-300'>
      <thead style={{ backgroundColor: '#f8f9fa' }} >
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className='font-semibold'>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                className='whitespace-nowrap font-bold py-2 px-3 border-b border-gray-300 text-left'
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} className='border-b border-gray-300'>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className='whitespace-normal py-2 px-3'
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
  )
}

export default Table