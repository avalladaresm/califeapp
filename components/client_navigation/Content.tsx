
const Content = (props) => {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }} className='p-10 pt-24 rounded-md h-screen'>
      {props.children}
    </div>
  )
}

export default Content