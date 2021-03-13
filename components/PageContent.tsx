import React from "react"
import Button from "./Button"

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
          {props.children}
        </div>
      </div>
    </div>
  )
}
export default PageContent