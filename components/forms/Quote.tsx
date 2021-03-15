import React, { useContext, useState } from 'react'
import { differenceInMonths, differenceInYears } from 'date-fns'
import { RatePlan, RATE_PLAN_ADDER, RATE_PLAN_MULTIPLIER, CARNET_PRICE, MaternityPrices } from '../../constants';
import { PlanContext } from '../../context/PlanContext';
import { PlanTypes } from '../../models/index'

interface Children {
  children: number
  price: number
}

interface LifeInsurance {
  coverage: number
  price: number
}

interface PaymentRecurrence {
  recurrence: string
  yearlyPayments: number
}

interface QuoteData {
  holderDob: Date
  partnerDob: Date
  maternity: boolean
  children: Children
  lifeInsurance: LifeInsurance
  paymentRecurrence: PaymentRecurrence
}

const Quote = () => {
  const [_holderDob, _setHolderDob] = useState<Date>(null);
  const [_partnerDob, _setPartnerDob] = useState<Date>(null);
  const [_maternity, _setMaternity] = useState<boolean>();
  const [_children, _setChildren] = useState<Children>();
  const [_lifeInsurance, _setLifeInsurance] = useState<LifeInsurance>();
  const [_paymentRecurrence, _setPaymentRecurrence] = useState<PaymentRecurrence>();
  const [_calculatedResult, _setCalculatedResult] = useState([]);

  const selectedPlan = useContext(PlanContext)
  console.log('calculated', _calculatedResult, _lifeInsurance)
  const quoteData: QuoteData = {
    holderDob: _holderDob,
    partnerDob: _partnerDob,
    maternity: _maternity,
    children: _children,
    lifeInsurance: _lifeInsurance,
    paymentRecurrence: _paymentRecurrence,
  }

  return (
    <div className='bg-white overflow-hidden sm:rounded-sm border border-gray-300'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-xl font-medium'>
          Cotizador
        </h3>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          <div>
            <Holder setHolderDob={_setHolderDob} />
            <Partner setPartnerDob={_setPartnerDob} />
            <Maternity setMaternity={_setMaternity} />
            <Children setChildren={_setChildren} />
            <LifeInsurance setLifeInsurance={_setLifeInsurance} />
            <PaymentRecurrence setRecurrence={_setPaymentRecurrence} />
            <ActionButtons
              setCalculatedResult={_setCalculatedResult}
              quoteData={quoteData}
              selectedPlan={selectedPlan}
            />
            <QuoteResult calculatedResult={_calculatedResult} />
          </div>
        </dl>
      </div>
    </div>
  )
}

export default Quote

const Holder = ({ setHolderDob }) => {
  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white'>
      <dt className='text-md font-medium'>
        Titular
      </dt>
      <dd className='mt-1 text-md sm:mt-0 sm:col-span-2 space-x-2'>
        <label htmlFor='holderBirthDate'>Fecha de nacimiento</label>
        <input type='date' name='holderBirthDate' id='holderBirthDate' onChange={e => setHolderDob(e.target.value)} />
      </dd>
    </div>
  )
}

const Partner = ({ setPartnerDob }) => {
  const [_include, _setInclude] = useState<boolean>(false)

  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white'>
      <dt className='flex flex-row space-x-4'>
        <div className='text-md font-medium'>
          Cónyugue
          </div>
        <div className='space-x-2'>
          <input type='checkbox' name='includePartner' id='includePartner' onChange={e => (_setInclude(e.target.checked), !e.target.checked && setPartnerDob(null))} />
          <label htmlFor='includePartner' className='text-gray-700'>¿Incluir?</label>
        </div>
      </dt>
      <dd className='mt-1 text-md sm:mt-0 sm:col-span-2 space-x-2'>
        <label htmlFor='partnerBirthDate'>Fecha de nacimiento</label>
        <input type='date' name='partnerBirthDate' id='partnerBirthDate' disabled={!_include} className={`${!_include && 'bg-gray-200'}`} onChange={e => setPartnerDob(e.target.value)} />
      </dd>
    </div>
  )
}

const Maternity = ({ setMaternity }) => {
  const [_include, _setInclude] = useState<boolean>(false)

  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white'>
      <dt className='flex flex-row space-x-4'>
        <div className='text-md font-medium'>
          Maternidad
          </div>
        <div className='space-x-2'>
          <input type='checkbox' name='maternity' id='maternity' onChange={e => setMaternity(e.target.checked)} />
          <label htmlFor='maternity' className='text-gray-700'>¿Incluir?</label>
        </div>
      </dt>
    </div>
  )
}

const Children = ({ setChildren }) => {
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
          {_children.map((c, i) => (
            <div className='space-x-2'>
              <input type='radio' name={`children`} id={`children${i}`} value={c.children} onChange={e => setChildren({ children: Number(e.target.value), price: c.price })} />
              <label htmlFor={`children${i}`}>{c.children === 0 ? 'Ninguno' : `${c.children} (${c.price.toLocaleString('en-US', { style: 'currency', currency: 'HNL', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 })})`}</label>
            </div>
          ))}
        </div>
      </dd>
    </div>
  )
}

const LifeInsurance = ({ setLifeInsurance }) => {
  const [_include, _setInclude] = useState<boolean>(false)
  const options = [
    {
      coverage: 0,
      price: 0
    },
    {
      coverage: 50000,
      price: 30
    }, {
      coverage: 100000,
      price: 50
    }, {
      coverage: 150000,
      price: 75
    }, {
      coverage: 200000,
      price: 120
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
          {options.map((c, i) => (
            <div className='space-x-2'>
              <input type='radio' name={`lifeInsurance`} id={`lifeInsurance${i}`} value={c.coverage} onChange={e => setLifeInsurance({ coverage: Number(e.target.value), price: c.price })} />
              <label htmlFor={`lifeInsurance${i}`}>{c.coverage === 0 ? 'Ninguno' : `${c.coverage.toLocaleString('en-US', { style: 'currency', currency: 'HNL', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 })} (${c.price.toLocaleString('en-US', { style: 'currency', currency: 'HNL', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 })})`}</label>
            </div>
          ))}
        </div>
      </dd>
    </div>
  )
}

const PaymentRecurrence = ({ setRecurrence }) => {
  const options = [
    {
      recurrence: 'mensual',
      yearlyPayments: 12
    }, {
      recurrence: 'bi-mensual',
      yearlyPayments: 6
    }, {
      recurrence: 'trimestral',
      yearlyPayments: 4
    }, {
      recurrence: 'semestral',
      yearlyPayments: 2
    }, {
      recurrence: 'anual',
      yearlyPayments: 1
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
          {options.map((o, i) => (
            <div className='space-x-2'>
              <input type='radio' name={`recurrence`} id={`recurrence${i}`} value={o.yearlyPayments} onChange={e => setRecurrence({ yearlyPayments: Number(e.target.value), recurrence: o.recurrence })} />
              <label htmlFor={`recurrence${i}`}>{o.recurrence}</label>
            </div>
          ))}
        </div>
      </dd>
    </div>
  )
}

const ActionButtons = ({ setCalculatedResult, quoteData, selectedPlan }) => {
  const { PLAN_PLATA, PLAN_ORO, PLAN_PLATINUM } = PlanTypes
  const { SILVER, GOLD, PLATINUM } = MaternityPrices
  const { holderDob, partnerDob, children, lifeInsurance, maternity, paymentRecurrence }: QuoteData = quoteData
  let carnets = 0
  const result = []

  const calculateQuote = () => {
    carnets = carnets + 1
    const holderAgeInYears = differenceInYears(new Date(), new Date(holderDob))
    const holderAgeInMonths = differenceInMonths(new Date(), new Date(holderDob))
    const holderMonthsBetweenYears = holderAgeInMonths % holderAgeInYears;
    const holderRatePlanOptions = RatePlan.filter(rp => rp.age === holderAgeInYears)
    let holderAssignedFee = 0
    let partnerAssignedFee = 0
    let maternityPrice = 0

    switch (holderDob && selectedPlan) {
      case PLAN_PLATA:
        holderAssignedFee = (holderRatePlanOptions[0].silver * RATE_PLAN_MULTIPLIER) + RATE_PLAN_ADDER
        break
      case PLAN_ORO:
        holderAssignedFee = (holderRatePlanOptions[0].gold * RATE_PLAN_MULTIPLIER) + RATE_PLAN_ADDER
        break
      case PLAN_PLATINUM:
        holderAssignedFee = (holderRatePlanOptions[0].platinum * RATE_PLAN_MULTIPLIER) + RATE_PLAN_ADDER
        break
      default:
        holderAssignedFee = 0
        break
    }
    result.push({ description: 'Titular', quantity: 1, amount: holderAssignedFee, totalAmount: holderAssignedFee })

    if (partnerDob) {
      carnets = carnets + 1
      const partnerAgeInYears = differenceInYears(new Date(), new Date(partnerDob))
      const partnerAgeInMonths = differenceInMonths(new Date(), new Date(partnerDob))
      const partnerMonthsBetweenYears = partnerAgeInMonths % partnerAgeInYears;
      const partnerRatePlanOptions = RatePlan.filter(rp => rp.age === partnerAgeInYears)

      switch (partnerDob && selectedPlan) {
        case PLAN_PLATA:
          partnerAssignedFee = (partnerRatePlanOptions[0].silver * RATE_PLAN_MULTIPLIER) + RATE_PLAN_ADDER
          break
        case PLAN_ORO:
          partnerAssignedFee = (partnerRatePlanOptions[0].gold * RATE_PLAN_MULTIPLIER) + RATE_PLAN_ADDER
          break
        case PLAN_PLATINUM:
          partnerAssignedFee = (partnerRatePlanOptions[0].platinum * RATE_PLAN_MULTIPLIER) + RATE_PLAN_ADDER
          break
        default:
          partnerAssignedFee = 0
          break
      }
      result.push({ description: 'Cónyugue', quantity: 1, amount: partnerAssignedFee, totalAmount: partnerAssignedFee })
    }

    if (maternity) {
      switch (selectedPlan) {
        case PLAN_PLATA:
          maternityPrice = SILVER
          break
        case PLAN_ORO:
          maternityPrice = GOLD
          break
        case PLAN_PLATINUM:
          maternityPrice = PLATINUM
          break
        default:
          maternityPrice = 0
          break
      }
      result.push({ description: 'Maternidad', quantity: 1, amount: maternityPrice, totalAmount: maternityPrice })
    }

    if (children?.children > 0) result.push({ description: 'Hijos', quantity: children.children, amount: children.price, totalAmount: children.price })
    carnets = carnets + children.children
    console.log(carnets, children.children)
    if (lifeInsurance?.coverage > 0) result.push({ description: 'Seguro de vida', quantity: carnets, amount: lifeInsurance.price, totalAmount: lifeInsurance.price * carnets })

    result.push({ description: 'Carnets', quantity: carnets, amount: CARNET_PRICE, totalAmount: carnets * CARNET_PRICE })

    let recurrentPayments = 0
    switch (paymentRecurrence?.yearlyPayments) {
      case 1:
        recurrentPayments = (holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets)) * 12
        result.push({ description: `Pago ${paymentRecurrence.recurrence}`, quantity: 1, amount: recurrentPayments / 1, totalAmount: recurrentPayments })
        break
      case 2:
        recurrentPayments = (holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets)) * 12
        result.push({ description: `Pago ${paymentRecurrence.recurrence}`, quantity: 2, amount: recurrentPayments / 2, totalAmount: recurrentPayments })
        break
      case 4:
        recurrentPayments = (holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets)) * 12
        result.push({ description: `Pago ${paymentRecurrence.recurrence}`, quantity: 4, amount: recurrentPayments / 4, totalAmount: recurrentPayments })
        break
      case 6:
        recurrentPayments = (holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets)) * 12
        result.push({ description: `Pago ${paymentRecurrence.recurrence}`, quantity: 6, amount: recurrentPayments / 6, totalAmount: recurrentPayments })
        break
      case 12:
        recurrentPayments = (holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets)) * 12
        result.push({ description: `Pago ${paymentRecurrence.recurrence}`, quantity: 12, amount: recurrentPayments / 12, totalAmount: recurrentPayments })
        break
      default:
        recurrentPayments = 0
        break
    }


    const downPayment = holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets) + (carnets * CARNET_PRICE)
    result.push({ description: 'Pago de prima', quantity: 1, amount: downPayment, totalAmount: downPayment })

    setCalculatedResult(result)
  }

  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 bg-white justify-items-center'>
      <dd className='mt-1 text-md sm:mt-0 sm:col-span-2 space-x-2'>
        <div className='flex flex-row space-x-7'>
          <button type='submit' style={{ backgroundColor: '#09dca4' }} className='h-12 w-36 px-2 rounded-md flex flex-row justify-center items-center' onClick={() => calculateQuote()}>
            <div className='text-lg text-white font-semibold'>
              Calcular
            </div>
          </button>
        </div>
      </dd>
    </div>
  )
}

const QuoteResult = ({ calculatedResult }) => {

  const cols = [
    {
      Header: 'Descripción'
    }, {
      Header: 'Cantidad'
    }, {
      Header: 'Monto unidad'
    }, {
      Header: 'Monto total'
    }
  ]

  return (
    <div className="flex flex-col px-4 items-center mb-5">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="align-middle inline-block max-w-4xl sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border border-gray-300 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {cols.map((c, i) => (
                    <th key={i} scope="col" className="px-6 py-3 text-left text-sm text-gray-500 uppercase tracking-wider">
                      {c.Header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calculatedResult.map((d, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-md text-gray-900">{d.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-md text-gray-900">{d.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-md text-gray-900">{d.amount.toLocaleString('en-US', { style: 'currency', currency: 'HNL', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 })}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-md text-gray-900">{d.totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'HNL', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 })}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}
