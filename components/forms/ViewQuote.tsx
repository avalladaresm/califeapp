import React, { useState } from 'react'
import { format } from 'date-fns'

interface Children {
  children: number
  price: number
}

interface LifeInsurance {
  coverage: number
  price: number
}

interface PaymentRecurrence {
  installmentInWords: string
  yearlyInstallments: number
}

interface QuoteData {
  holderDob: Date
  partnerDob: Date
  maternity: boolean
  children: Children
  lifeInsurance: LifeInsurance
  installments: PaymentRecurrence
}

const ViewQuote = ({ quickQuoteData }) => {

  const quickQuote = quickQuoteData[0]

  return (
    <div className='bg-white overflow-hidden sm:rounded-sm border border-gray-300'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-xl font-medium'>
          Cotización rápida #{quickQuote?.id}
        </h3>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          <div>
            <Holder quickQuote={quickQuote} />
            <Partner quickQuote={quickQuote} />
            <Maternity quickQuote={quickQuote} />
            <Children quickQuote={quickQuote} />
            <LifeInsurance quickQuote={quickQuote} />
            <PaymentRecurrence quickQuote={quickQuote} />
          </div>
        </dl>
      </div>
    </div>
  )
}

export default ViewQuote

const Holder = ({ quickQuote }) => {
  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white'>
      <dt className='text-md font-medium'>
        Titular
      </dt>
      <dd className='flex flex-row mt-1 text-md sm:mt-0 sm:col-span-2 space-x-2'>
        <div className="flex flex-row space-x-6">

          <div className="flex flex-col">
            <label htmlFor='holderBirthDate' className='font-semibold'>Nombre</label>
            {quickQuote.userName}
          </div>
          <div className="flex flex-col">
            <label htmlFor='holderBirthDate' className='font-semibold'>Celular</label>
            {quickQuote.userPhoneNumber}
          </div>
          <div className="flex flex-col">
            <label htmlFor='holderBirthDate' className='font-semibold'>Correo</label>
            {quickQuote.userEmail}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='holderBirthDate' className='font-semibold'>Fecha de nacimiento</label>
            {format(new Date(quickQuote.holderDob), 'PPP')}
          </div>
        </div>
      </dd>
    </div>
  )
}

const Partner = ({ quickQuote }) => {
  const [_include, _setInclude] = useState<boolean>(false)

  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white'>
      <dt className='flex flex-row space-x-4'>
        <div className='text-md font-medium'>
          Cónyugue
          </div>
        <div className='space-x-2'>
          <input type='checkbox' name='isPartnerIncluded' id='isPartnerIncluded' onChange={e => (_setInclude(e.target.checked), !e.target.checked && setPartnerDob(null))} />
          <label htmlFor='isPartnerIncluded' className='text-gray-700'>¿Incluir?</label>
        </div>
      </dt>
      <dd className='mt-1 text-md sm:mt-0 sm:col-span-2 space-x-2'>
        <label htmlFor='partnerBirthDate'>Fecha de nacimiento</label>
        <input type='date' name='partnerBirthDate' id='partnerBirthDate' disabled={!_include} className={`${!_include && 'bg-gray-200'}`} onChange={e => setPartnerDob(e.target.value)} />
      </dd>
    </div>
  )
}

const Maternity = ({ quickQuote }) => {
  const [_include, _setInclude] = useState<boolean>(false)

  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white'>
      <dt className='flex flex-row space-x-4'>
        <div className='text-md font-medium'>
          Maternidad
          </div>
        <div className='space-x-2'>
          {quickQuote.isMaternityIncluded}
        </div>
      </dt>
    </div>
  )
}

const Children = ({ quickQuote }) => {
  const [_include, _setInclude] = useState<boolean>(false)
  const _children = [
    {
      children: 0,
      price: 0
    }, {
      children: 1,
      price: 210
    }, {
      children: 2,
      price: 360
    }, {
      children: 3,
      price: 510
    }, {
      children: 4,
      price: 660
    }, {
      children: 5,
      price: 810
    },
  ]

  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white'>
      <dt className='flex flex-row space-x-4'>
        <div className='text-md font-medium'>
          Hijos
        </div>
      </dt>
      <dd className='mt-1 text-md sm:mt-0 sm:col-span-2 space-x-2'>
        <div className='flex flex-row space-x-7'>
          {quickQuote.children}
        </div>
      </dd>
    </div>
  )
}

const LifeInsurance = ({ quickQuote }) => {
  const [_include, _setInclude] = useState<boolean>(false)
  const options = [
    {
      coverage: 0,
      price: 0,
      id: 0
    }, {
      coverage: 50000,
      price: 30,
      id: 1
    }, {
      coverage: 100000,
      price: 50,
      id: 2
    }, {
      coverage: 150000,
      price: 75,
      id: 3
    }, {
      coverage: 200000,
      price: 120,
      id: 4
    }
  ]

  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white'>
      <dt className='flex flex-row space-x-4'>
        <div className='text-md font-medium'>
          Cobertura de seguro de vida
        </div>
      </dt>
      <dd className='mt-1 text-md sm:mt-0 sm:col-span-2 space-x-2'>
        <div className='flex flex-row space-x-7'>
          {quickQuote.lifeInsurance}
        </div>
      </dd>
    </div>
  )
}

const PaymentRecurrence = ({ quickQuote }) => {
  const options = [
    {
      installmentInWords: 'mensual',
      yearlyInstallments: 12
    }, {
      installmentInWords: 'bi-mensual',
      yearlyInstallments: 6
    }, {
      installmentInWords: 'trimestral',
      yearlyInstallments: 4
    }, {
      installmentInWords: 'semestral',
      yearlyInstallments: 2
    }, {
      installmentInWords: 'anual',
      yearlyInstallments: 1
    },
  ]

  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white'>
      <dt className='flex flex-row space-x-4'>
        <div className='text-md font-medium'>
          Tipo de pago
        </div>
      </dt>
      <dd className='mt-1 text-md sm:mt-0 sm:col-span-2 space-x-2'>
        <div className='flex flex-row space-x-7'>
          {quickQuote.installments}
        </div>
      </dd>
    </div>
  )
}