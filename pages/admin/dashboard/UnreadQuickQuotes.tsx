import { useRouter } from "next/router"

const UnreadQuickQuotes = (props) => {
  const unreadQuickQuotes = props.quickQuotes?.length
  
  const router = useRouter()

  return (
    <div>
      <div className="border border-gray-300 sm:w-72 rounded-md">
        <div className="flex flex-col sm:min-h-28 bg-white rounded-tl-md rounded-tr-md">
          <div className='flex flex-row p-5'>
            <div className='justify-start self-center align-middle text-5xl font-bold text-blue-800'>
              {unreadQuickQuotes}
            </div>
            <div className='justify-center self-center text-xl font-semibold text-center'>
              Nuevas cotizaciones rápidas
          </div>
          </div>
        </div>
        <div className='bottom-0 h-10 w-full bg-blueGray-200 active:bg-blueGray-300 border-t border-gray-300 cursor-pointer text-center rounded-br-md rounded-bl-md'
        onClick={() => router.push('/admin/quickquotes')}>
          Ver todas
      </div>
      </div>
    </div >
  )
}

export default UnreadQuickQuotes