import React from "react"
import Button from "./Button"
import Table from "./Table"

const PageContent = (props) => {

  return (
    <div className='space-y-6'>
      <div className='flex flex-row justify-between'>
        <div className='text-3xl font-semibold'>
          {props.title}
        </div>
        <Button title='Create' type='create' />
      </div>
      <div className='flex w-full h-auto rounded-md border border-blueGray-300 bg-white'>
        <div className='p-4 w-full h-auto'>
          <div className='whitespace-nowrap'>
            <Table columns={props.columns} data={props.data} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PageContent