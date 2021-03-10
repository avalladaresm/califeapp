import Image from 'next/image'
import React from 'react'
import { HiLocationMarker, HiPhone, HiOutlineMail } from 'react-icons/hi'

const Footer = () => {

  const contactUsItems = [
    {
      icon: <HiLocationMarker />,
      text: '22 Tarkington Rd Holbrook NY 11741\
            New York, USA'
    }, {
      icon: <HiPhone />,
      text: '+1631-435-5557'
    }, {
      icon: <HiOutlineMail />,
      text: 'capluslife@gmail.com'
    }
  ]

  return (
    <div style={{ backgroundColor: '#222222' }} className='h-1/3 p-5'>
      <div className='flex flex-row justify-start space-x-5'>

        <div className='flex flex-col w-1/4 space-y-5'>
          <div className='flex self-center h-auto max-w-full'>
            <Image src="/logo_blanco.png" alt="login_image" width='auto' height='auto' quality={100} />
          </div>
          <div className='text-white'>
            Pensando en tu bienestar y en el de tu familia, te ofrecemos un seguro médico completo que te brinda protección en caso de enfermedad y accidentes; un plan con mejores y mayores beneficios
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='text-white font-semibold text-xl'>
            Contact Us
          </div>
          {contactUsItems.map((item, i) => (
            <div key={i} className='flex flex-row space-x-4 text-white'>
              <div>{item.icon}</div>
              <div>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='border-t border-cyan-500 align-middle justify-center text-white m-5'>
        <div className='flex align-middle justify-center'>
          © 2021 C.A+LIFE. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer