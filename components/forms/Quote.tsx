import React, { useContext, useEffect, useState } from 'react'
import { differenceInMonths, differenceInYears } from 'date-fns'
import { RatePlan, RATE_PLAN_ADDER, RATE_PLAN_MULTIPLIER, CARNET_PRICE, MaternityPrices } from '../../constants';
import { PlanContext } from '../../context/PlanContext';
import { PlanTypes } from '../../models/index'
import { useQueryClient } from 'react-query';
import { createQuickQuote } from '../../services/QuickQuote';
import { useAuth } from '../../pages/auth/AuthService';

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

const Quote = (props) => {
  const [_holderDob, _setHolderDob] = useState<Date>(null);
  const [_partnerDob, _setPartnerDob] = useState<Date>(null);
  const [_maternity, _setMaternity] = useState<boolean>();
  const [_children, _setChildren] = useState<Children>();
  const [_lifeInsurance, _setLifeInsurance] = useState<LifeInsurance>();
  const [_paymentRecurrence, _setPaymentRecurrence] = useState<PaymentRecurrence>();
  const [_calculatedResult, _setCalculatedResult] = useState([]);

  const queryClient = useQueryClient()
  const auth = useAuth(queryClient)
  const selectedPlan = useContext(PlanContext)

  useEffect(() => {
    props.setQuoteResult(_calculatedResult)
  }, [_calculatedResult]);

  const quoteData: QuoteData = {
    holderDob: _holderDob,
    partnerDob: _partnerDob,
    maternity: _maternity,
    children: _children,
    lifeInsurance: _lifeInsurance,
    installments: _paymentRecurrence,
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
              queryClient={queryClient}
              auth={auth}
            />
            <QuoteResult
              calculatedResult={_calculatedResult}
              setQuoteResultAccepted={props.setQuoteResultAccepted}
            />
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
            <div key={i} className='space-x-2'>
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
            <div key={i} className='space-x-2'>
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
          {options.map((o, i) => (
            <div key={i} className='space-x-2'>
              <input type='radio' name={`installmentInWords`} id={`installmentInWords${i}`} value={o.yearlyInstallments} onChange={e => setRecurrence({ yearlyInstallments: Number(e.target.value), installmentInWords: o.installmentInWords })} />
              <label htmlFor={`installmentInWords${i}`}>{o.installmentInWords}</label>
            </div>
          ))}
        </div>
      </dd>
    </div>
  )
}

const ActionButtons = ({ setCalculatedResult, quoteData, selectedPlan, queryClient, auth }) => {
  const { PLAN_PLATA, PLAN_ORO, PLAN_PLATINUM } = PlanTypes
  const { SILVER, GOLD, PLATINUM } = MaternityPrices
  const { holderDob, partnerDob, children, lifeInsurance, maternity, installments }: QuoteData = quoteData
  let carnets = 0
  const result = []
  const currentQuote = {}

  const calculateQuote = async () => {
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

    let lifeInsuranceId = null
    switch (lifeInsurance.coverage) {
      case 50000:
        lifeInsuranceId = 1
        break
      case 100000:
        lifeInsuranceId = 2
        break
      case 150000:
        lifeInsuranceId = 3
        break
      case 200000:
        lifeInsuranceId = 4
        break
      default:
        lifeInsuranceId = null
        break
    }

    if (children?.children > 0) result.push({ description: 'Hijos', quantity: children.children, amount: children.price, totalAmount: children.price })
    
    carnets = carnets + children.children

    if (lifeInsurance?.coverage > 0) result.push({ description: 'Seguro de vida', quantity: carnets, amount: lifeInsurance.price, totalAmount: lifeInsurance.price * carnets })

    result.push({ description: 'Carnets', quantity: carnets, amount: CARNET_PRICE, totalAmount: carnets * CARNET_PRICE })

    let totalQuoteAmount = 0
    let installmentPayment = 0
    let downPayment = 0
    let totalInstallments = 0
    switch (installments?.yearlyInstallments) {
      case 1:
        totalQuoteAmount = (holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets)) * 12
        installmentPayment = totalQuoteAmount / 1
        downPayment = installmentPayment + (carnets * CARNET_PRICE)
        totalInstallments = 0
        result.push({ description: `Pago ${installments.installmentInWords}`, quantity: 0, amount: 0, totalAmount: totalQuoteAmount - installmentPayment })
        break
      case 2:
        totalQuoteAmount = (holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets)) * 12
        installmentPayment = totalQuoteAmount / 2
        downPayment = installmentPayment + (carnets * CARNET_PRICE)
        totalInstallments = totalQuoteAmount - installmentPayment
        result.push({ description: `Pago ${installments.installmentInWords}`, quantity: 1, amount: (totalQuoteAmount / 2), totalAmount: totalInstallments })
        break
      case 4:
        totalQuoteAmount = (holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets)) * 12
        installmentPayment = totalQuoteAmount / 4
        downPayment = installmentPayment + (carnets * CARNET_PRICE)
        totalInstallments = totalQuoteAmount - installmentPayment
        result.push({ description: `Pago ${installments.installmentInWords}`, quantity: 3, amount: (totalQuoteAmount / 4), totalAmount: totalInstallments })
        break
      case 6:
        totalQuoteAmount = (holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets)) * 12
        installmentPayment = totalQuoteAmount / 6
        downPayment = installmentPayment + (carnets * CARNET_PRICE)
        totalInstallments = totalQuoteAmount - installmentPayment
        result.push({ description: `Pago ${installments.installmentInWords}`, quantity: 5, amount: (totalQuoteAmount / 6), totalAmount: totalInstallments })
        break
      case 12:
        totalQuoteAmount = (holderAssignedFee + partnerAssignedFee + maternityPrice + children.price + (lifeInsurance.price * carnets)) * 12
        installmentPayment = totalQuoteAmount / 12
        downPayment = installmentPayment + (carnets * CARNET_PRICE)
        totalInstallments = totalQuoteAmount - installmentPayment
        result.push({ description: `Pago ${installments.installmentInWords}`, quantity: 11, amount: (totalQuoteAmount / 12), totalAmount: totalInstallments })
        break
      default:
        totalQuoteAmount = 0
        installmentPayment = 0
        downPayment = 0
        totalInstallments = 0
        break
    }

    result.push({ description: 'Pago de prima', quantity: 1, amount: downPayment, totalAmount: downPayment })
    result.push({ description: 'Total plan', quantity: '-', amount: downPayment + totalInstallments, totalAmount: downPayment + totalInstallments })
    
    currentQuote['planId'] = selectedPlan
    currentQuote['holderAge'] = null
    currentQuote['holderDob'] = holderDob
    currentQuote['partnerAge'] = null
    currentQuote['partnerDob'] = partnerDob
    currentQuote['isPartnerIncluded'] = partnerDob ? 1 : 0
    currentQuote['children'] = children
    currentQuote['lifeInsurance'] = lifeInsurance
    currentQuote['isMaternityIncluded'] = maternity ? 1 : 0
    currentQuote['installments'] = installments.yearlyInstallments,
    currentQuote['downPayment'] = downPayment
    currentQuote['installmentPayment'] = installmentPayment
    queryClient.setQueryData('CurrentQuote', currentQuote)

    await createQuickQuote(auth?.a_t, {
      userId: auth?.uid,
      planId: selectedPlan,
      holderDob: holderDob,
      partnerDob: partnerDob,
      children: children.children,
      lifeInsurance: lifeInsuranceId,
      isMaternityIncluded: maternity ? 1 : 0,
      installments: installments.yearlyInstallments,
      downPayment: downPayment,
      installmentPayment: installmentPayment
    })

    setCalculatedResult(result)
  }

  return (
    <div className='px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 bg-white justify-items-center'>
      <dd className='mt-1 text-md sm:mt-0 sm:col-span-2 space-x-2'>
        <div className='flex flex-row space-x-7'>
          <button type='submit' className='h-12 px-5 bg-[#09dca4] rounded-md flex flex-row justify-center items-center' onClick={async () => calculateQuote()}>
            <div className='text-lg text-white font-semibold'>
              Calcular
            </div>
          </button>
        </div>
      </dd>
    </div>
  )
}

const QuoteResult = ({ calculatedResult, setQuoteResultAccepted }) => {

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
          <div className='px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 justify-items-center'>
            <dd className='mt-1 text-md sm:mt-0 sm:col-span-2 space-x-2'>
              <div className='flex flex-row space-x-7'>
                <div className='h-12 w-auto px-5 bg-[#09dca4] rounded-md flex flex-row justify-center items-center cursor-pointer' onClick={() => setQuoteResultAccepted(true)}>
                  <div className='text-lg text-white font-semibold'>
                    Aceptar cotización y crear plan
                  </div>
                </div>
              </div>
            </dd>
          </div>
        </div>
      </div>
    </div >
  )
}
