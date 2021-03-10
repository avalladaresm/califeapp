import { FC, useState } from "react"
import { LoginSettings } from '../logincard/LoginSettings'
import Spin from "../Spin"
import { TempLogo } from "../TempLogo"
import { useDoLogin } from '../../pages/auth/AuthService'
import { useRouter } from 'next/router'
import { useQueryClient } from "react-query"
import { AccountLogIn } from "../../pages/auth/AuthModel"

export const LoginCard: FC<LoginSettings> = () => {
  const [loginData, setLoginData] = useState<AccountLogIn>()

  const queryClient = useQueryClient()
  const router = useRouter();
  const doLogin = useDoLogin(queryClient, router)

  const onLogin = async () => {
    doLogin.mutate({ ...loginData })
  }

  return (
    <div style={{ height: '24rem', backgroundColor: '#fff' }} className='place-self-center rounded-sm w-96 border border-blueGray-200 px-7 py-7 space-y-3'>
      <div className='flex flex-col space-y-3'>
        <p className='font-sans font-semibold text-xl'>
          Iniciar sesión en C.A+Life
			</p>
      </div>
      <form method='post' className='flex flex-col space-y-6'>
        <div className='flex flex-col self-center w-full space-y-1'>
          <div className='flex flex-col'>
            <label>Correo</label>
            <input style={{ outline: 'none' }} type='text' onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className='p-3 rounded-sm h-12 border border-blueGray-300' />
          </div>
          <div className='flex flex-col'>
            <label>Clave</label>
            <input style={{ outline: 'none' }} type='password' onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className='p-3 rounded-sm h-12 border border-blueGray-300' />
          </div>
        </div>
        <div className='flex flex-col self-center w-full space-y-3'>
          <div className='flex self-end'>
            ¿Olvidó su clave?
          </div>
          {doLogin.isLoading ?
            <button disabled type='button' className='h-12 rounded-md bg-blueGray-400 text-md font-semibold disabled:opacity-75 text-coolGray-50 flex flex-row justify-center items-center cursor-wait'>
              <Spin /> logging in...
						</button> :
            <button onClick={() => onLogin()} type='button' style={{ backgroundColor: '#09dca4' }} className='h-12 rounded-md flex flex-row justify-center items-center'>
              <div className='text-xl text-white font-semibold'>
                Aceptar
              </div>
            </button>
          }
        </div>
      </form>
      <div className='flex align-middle justify-center'>
        ¿No posee una cuenta? <a onClick={() => router.push('/auth/signup')} style={{ color: '#09dca4' }} className='pl-1 hover:underline'>Registrese</a>
      </div>
    </div>
  )
}