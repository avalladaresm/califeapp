import { useRouter } from "next/router"

const Content = (props) => {
  const router = useRouter()

  return (
    <div style={{ backgroundColor: '#f8f9fa' }} className={`p-10 pt-24 min-h-screen space-y-2
      ${router.pathname === '/auth/login' || router.pathname === '/auth/signup' ? 'ml-0' : props.collapsed ? 'sm:ml-20' : 'sm:ml-56'}`}
    >
      <div className='p-6 bg-blueGray-50 rounded-md min-h-full'>
        {props.children}
      </div>
    </div>
  )
}

export default Content