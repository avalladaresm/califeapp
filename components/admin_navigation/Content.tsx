
const Content = (props) => {
  console.log('porp', props.collapsed)
  return (
    <div style={{ backgroundColor: '#f8f9fa' }} className={`p-10 pt-24 min-h-screen space-y-2
      ${props.collapsed ? 'sm:ml-20' : 'sm:ml-56'}`}
    >
      <div className='p-6 bg-blueGray-50 rounded-md min-h-full'>
        {props.children}
      </div>
    </div>
  )
}

export default Content