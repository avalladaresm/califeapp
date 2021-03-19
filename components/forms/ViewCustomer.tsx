import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { LoggedInUserCookieData } from '../../pages/auth/AuthModel';
import { useAuth } from '../../pages/auth/AuthService';
import { Formik, Form, Field, FormikState } from 'formik';
import { format } from 'date-fns'
import DependantHealthQuestionnaire from './DependantHealthQuestionnaire';
import { UpdateCustomerPlanStatus } from '../../pages/admin/plans/PlanService';

interface NewCustomer {
  firstname: string,
  middlename: string,
  firstSurname: string,
  secondSurname: string,
  surnameAfterMarried: string,
  email: string,
  gender: string,
  birthDate: string,
  maritalStatus: string,
  occupation: string,
  weight: number,
  height: number,
  worksAt: string,
  workAddress: string,

  neighborhood: string,
  avenue: string,
  street: string,
  block: number,
  houseNumber: number,
  city: string,
  state: string,
  country: string,

  identificationDocument: string,
  identificationDocumentType: string,

  cellphoneNumber: string,
  telephoneNumber: string,
  faxNumber: string,
}

interface Dependant {
  firstname: string,
  middlename: string,
  firstSurname: string,
  secondSurname: string,
  surnameAfterMarried: string,
  email: string,
  gender: string,
  birthDate: string,
  maritalStatus: string,
  occupation: string,
  weight: number,
  height: number,
  worksAt: string,
  workAddress: string,

  neighborhood: string,
  avenue: string,
  street: string,
  block: number,
  houseNumber: number,
  addressType: string,
  city: string,
  state: string,
  country: string,

  identificationDocument: string,
  identificationDocumentType: string,

  cellphoneNumber: string,
  telephoneNumber: string,
  faxNumber: string,
}

interface Beneficiary {
  beneficiaryFullname: string
  beneficiaryKin: string
  beneficiaryIdentificationDocument: string
  beneficiaryPercentage: number
}

export interface OptionType {
  label: string
  value: number | string
}

const ViewCustomer = ({ customerData }) => {
  const [_beneficiaries, _setBeneficiaries] = useState<Beneficiary[]>([])
  const [_dependants, _setDependants] = useState<Dependant[]>([])
  const [_dependantsAmount, _setDependantsAmount] = useState<number>(0)
  const [_holderQuestionsAnswers, _setHolderQuestionsAnswers] = useState([]);
  const [_currentQuote, _setCurrentQuote] = useState([]);
  const { customerDetails, customerAddresses, customerPhoneNumbers, customerBeneficiaries, customerIdentificationDocuments, customerPlan, dependants } = customerData
  console.log('customerDetails', customerData)
  const queryClient = useQueryClient()
  const auth: LoggedInUserCookieData = useAuth(queryClient)

  /*   const hmm = planDetails.reduce(function (acc, x) {
      for (var key in x) acc[key] = x[key];
      return acc;
    }, {});
  
   */  /* const joined = planDetails.forEach((pd, i) => {
const merged = Object.assign({}, pd, planDetails[i + 1])
console.log('mergd', merged)
return merged
}) */
  //  console.log('joined',hmm)

  const initialValues = {
    firstname: customerDetails.firstname,
    middlename: customerDetails.middlename,
    firstSurname: customerDetails.firstSurname,
    secondSurname: customerDetails.secondSurname,
    surnameAfterMarried: customerDetails.surnameAfterMarried,
    email: customerDetails.email,
    gender: customerDetails.gender,
    birthDate: format(new Date(customerDetails.birthDate), 'yyyy-MM-dd'),
    maritalStatus: customerDetails.maritalStatus,
    occupation: customerDetails.occupation,
    weight: customerDetails.weight,
    height: customerDetails.height,
    worksAt: customerDetails.worksAt,
    workAddress: customerDetails.workAddress,

    neighborhood: customerAddresses.neighborhood,
    avenue: customerAddresses.avenue,
    street: customerAddresses.street,
    block: customerAddresses.block,
    houseNumber: customerAddresses.houseNumber,
    addressType: customerAddresses.addressType,
    city: customerAddresses.city,
    state: customerAddresses.state,
    country: customerAddresses.country,

    cellphoneNumber: '',
    telephoneNumber: '',
    faxNumber: '',

    beneficiaries: [],
    dependants: [],
    planId: '',
    holderAge: '',
    holderDob: '',
    partnerAge: '',
    partner: '',
    isPartnerIncluded: '',
    children: '',
    lifeInsurance: '',
    isMaternityIncluded: '',
    downPayment: '',
    installmentPayment: '',
    status: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => { }}
    >
      {({ initialValues, values, setFieldValue }) => (
        <Form>
          <div className='flex flex-col w-full h-auto rounded-md border border-blueGray-300 bg-white'>
            <div className='flex flex-col p-4 max-w-7xl xl:w-4/5 lg:w-11/12 w-full justify-self-center self-center space-y-10'>
              <GeneralInfo />
              <Address address={customerAddresses} />
              <IdentificationDocument identificationDocument={customerIdentificationDocuments} />
              <Contact />
              <Beneficiaries beneficiary={customerBeneficiaries} />
              <Dependants dependants={dependants} />

              {/*  <HowManyDependants setDependantsAmount={_setDependantsAmount} />
              <Dependants
                dependantsAmount={_dependantsAmount}
                values={values}
                initialValues={initialValues}
                selectedDob={selectedDob}
                setSelectedDob={setSelectedDob}
                setFieldValue={setFieldValue}
              /> */}
              < div className='h-12 w-auto px-5 bg-[#09dca4] rounded-md flex flex-row justify-center items-center cursor-pointer' onClick={async () => UpdateCustomerPlanStatus(auth?.a_t, customerPlan.id)}>
                <div className='text-lg text-white font-semibold'>
                  Aprobar plan
                </div>
              </div>
            </div>
          </div>
        </Form>
      )
      }
    </Formik >
  )
}

export default ViewCustomer


{/* Questionario de salud titular */ }
{/* <div className='w-11/12 justify-self-center self-center mb-5' >
  <p className='font-semibold text-2xl'>Questionario de Salud del Dependiente</p>
</div>
<div className='flex flex-wrap mx-2 justify-evenly self-center'>
  <DependantHealthQuestionnaire />
</div> */}

{/* Examenes Personas Mayores de 50 Años */ }
{/* <div className='w-11/12 justify-self-center self-center mb-5' >
  <p className='font-semibold text-2xl'>Examenes Personas Mayores de 50 Años</p>
</div>
<div className='flex flex-wrap mx-2 justify-start'>
  <PeopleAged50Exams />
</div> */}

const ActionButtons = ({ initialValues, isSubmitting, resetForm }) => {
  return (
    <div className='flex justify-end rounded-b space-x-2 mb-3'>
      <button
        className='xl:w-1/12 md:w-1/6 sm:w-1/5 w-1/2 sm px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-coolGray-500 hover:bg-coolGray-600 active:bg-coolGray-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
        type='button'
        style={{ transition: 'all .15s ease', outline: 'none' }}
        onClick={() => resetForm(initialValues as Partial<FormikState<NewCustomer>>)}
      >
        Limpiar
      </button>

      {isSubmitting ?
        <button
          className='xl:w-1/12 md:w-1/6 sm:w-1/5 w-1/2 sm px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
          type='submit'
          style={{ transition: 'all .15s ease', outline: 'none' }}
        >
          Guardando datos...
                        </button> :
        <button
          //className='xl:w-1/12 md:w-1/6 sm:w-1/5 w-1/2 sm px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
          style={{ backgroundColor: '#09dca4' }} className='h-12 w-36 px-2 rounded-md flex flex-row justify-center items-center text-white text-md font-semibold'
          type='submit'
        >
          Guardar
        </button>}
    </div>
  )
}


const GeneralInfo = () => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2' >
        <p className='font-semibold text-2xl'>Datos Personales</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='firstname'>Primer nombre</label>
          </div>
          <Field
            name='firstname' type='text' disabled
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300 `}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='middlename'>Segundo nombre</label>
          </div>
          <Field
            name='middlename' type='text' disabled
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='firstSurname'>Primer apellido</label>
          </div>
          <Field
            name='firstSurname' type='text' disabled={true}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='secondSurname'>Segundo apellido</label>
          </div>
          <Field
            name='secondSurname' type='text' disabled={true}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='surnameAfterMarried'>Apellido de casada</label>
          </div>
          <Field
            name='surnameAfterMarried' type='text' disabled={true}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='email'>Email</label>
          </div>
          <Field
            name='email' type='email' disabled={true}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='gender'>Sexo</label>
          </div>
          <Field name='gender' disabled
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='maritalStatus'>Estado Civil</label>
          </div>
          <Field
            name='maritalStatus' disabled
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='occupation'>Ocupación</label>
          </div>
          <Field
            name='occupation' type='text' disabled
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='birthDate'>Fecha de Nacimiento</label>
          </div>
          <Field
            name='birthDate' type='date' disabled
            className={`min-w-full rounded-sm h-10 p-2 bg-gray-300`}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='weight'>Peso (en lb)</label>
          </div>
          <Field
            name='weight' type='number' disabled
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='height'>Estatura (en m)</label>
          </div>
          <Field
            name='height' type='number' disabled
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='worksAt'>Lugar de Trabajo</label>
          </div>
          <Field
            name='worksAt' type='text' disabled
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='workAddress'>Dirección de Trabajo</label>
          </div>
          <Field
            name='workAddress' type='text' disabled
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
      </div>

    </div>
  )
}

const Address = ({ address }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2'>
        <p className='font-semibold text-2xl'>Dirección</p>
      </div>
      {address.map((address, i) => (
        <div key={i} className='flex flex-wrap mx-2 justify-evenly self-center'>
          <div className='flex flex-wrap w-full justify-evenly align-middle'>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`neighborhood${i}`}>Colonia o Barrio</label>
              </div>
              <Field
                name={`neighborhood${i}`} type='text' disabled value={address.neighborhood}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`street${i}`}>Calle</label>
              </div>
              <Field
                name={`street${i}`} type='text' disabled value={address.street}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`avenue${i}`}>Avenida</label>
              </div>
              <Field
                name={`avenue${i}`} type='text' disabled value={address.avenue}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`block${i}`}>Bloque</label>
              </div>
              <Field
                name={`block${i}`} type='text' disabled value={address.block}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`houseNumber${i}`}>No. de Casa</label>
              </div>
              <Field
                name={`houseNumber${i}`} type='text' disabled value={address.houseNumber}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
          </div>
          <div className='flex flex-wrap w-full justify-evenly align-middle'>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`country${i}`}>País</label>
              </div>
              <Field
                name={`country${i}`} type='text' disabled value={address.country}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`state${i}`}>Departamento</label>
              </div>
              <Field
                name={`state${i}`} type='text' disabled value={address.state}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`city${i}`}>Ciudad</label>
              </div>
              <Field
                name={`city${i}`} type='text' disabled value={address.city}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
          </div>
        </div>

      ))}
    </div>
  )
}

const IdentificationDocument = ({ identificationDocument }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2'>
        <p className='font-semibold text-2xl'>Identificación</p>
      </div>
      {identificationDocument.map((identificationDocument, i) => (
        <div key={i} className='flex flex-wrap mx-2 justify-evenly self-center'>
          <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor={`identificationDocument${i}`}>Documento de Identificación</label>
            </div>
            <Field
              name={`identificationDocument${i}`} type='text' disabled value={identificationDocument.identificationDocument}
              className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor={`identificationDocumentType${i}`}>Tipo de Documento de Identificación</label>
            </div>
            <Field
              name={`identificationDocumentType${i}`} type='text' disabled value={identificationDocument.identificationDocumentType}
              className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const Contact = () => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2'>
        <p className='font-semibold text-2xl'>Contacto</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='cellphoneNumber'>Número de celular</label>
          </div>
          <Field
            name='cellphoneNumber' type='tel'
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='telephoneNumber'>Teléfono de casa</label>
          </div>
          <Field
            name='telephoneNumber' type='tel'
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='faxNumber'>Número de fax</label>
          </div>
          <Field
            name='faxNumber' type='tel'
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}

const Beneficiaries = ({ beneficiary }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-5' >
        <p className='font-semibold text-2xl'>Beneficiarios</p>
      </div>
      {beneficiary.map((beneficiary, i) => (
        <div key={i} className='flex flex-wrap mx-2 justify-evenly self-center'>
          <div className='flex-grow ml-2 mb-2 2xl:w-64 w-96'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor={`beneficiaryFullName${i}`}>Nombre Completo</label>
            </div>
            <Field
              name={`beneficiaryFullName${i}`} type='text' value={beneficiary.beneficiaryFullName}
              className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor={`beneficiaryKin${i}`}>Parentesco</label>
            </div>
            <Field
              name={`beneficiaryKin${i}`} type='text' value={beneficiary.beneficiaryKin}
              className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor={`beneficiaryIdentificationDocument${i}`}>Documento de Identificación</label>
            </div>
            <Field
              name={`beneficiaryIdentificationDocument${i}`} type='text' value={beneficiary.beneficiaryIdentificationDocument}
              className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-2 2xl:w-64 w-28'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor={`beneficiaryPercentage${i}`}>Porcentaje</label>
            </div>
            <Field
              name={`beneficiaryPercentage${i}`} type='number' value={beneficiary.beneficiaryPercentage}
              className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
        </div>

      ))}
    </div>
  )
}

const DHealthQuestionnaire = (props) => {
  return (
    <div>
      <div className='w-full justify-self-center self-center mb-2' >
        <p className='font-semibold text-2xl'>Questionario de Salud del Dependiente #{props.dependant}</p>
      </div>
      <div className='flex flex-wrap justify-evenly self-center'>
        <DependantHealthQuestionnaire />
      </div>
    </div>
  )
}

const HowManyDependants = ({ setDependantsAmount }) => {
  const [_dependants, _setDependants] = useState<number>(0)
  const [_disabled, _setDisabled] = useState<boolean>(false)
  return (
    <div>
      <div className='w-full justify-self-center self-center mb-2' >
        <p className='text-lg'>¿Cuántos dependientes?</p>
      </div>
      <div className='flex flex-wrap space-x-3'>
        <input type='number' disabled={_disabled} onChange={e => _setDependants(Number(e.target.value))} className='disabled:opacity-50 disabled:' />
        <button
          className='xl:w-1/12 md:w-1/6 sm:w-1/5 w-1/2 sm px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner disabled:opacity-50'
          type='button'
          disabled={_disabled}
          onClick={() => (setDependantsAmount(_dependants), _setDisabled(true))}
        >
          Ok
        </button>
      </div>
    </div >
  )
}

const Dependants = ({ dependants }) => {
  return (
    <div>
      {dependants.map((dependant, i) => (
        <div key={i} className='w-full mb-10'>
          <div className='text-2xl underline mb-3'>
            Dependiente #{i + 1}
          </div>
          <DependantGeneralInfo dependant={dependant.dependantDetails} />
          <DependantAddress dependant={dependant.dependantAddress} />
          <DependantIdentificationDocument dependant={dependant.dependantIdentificationDocument} />
          <DependantContact dependant={dependant.dependantContact} />
          {/* <DHealthQuestionnaire dependant={i + 1} /> */}
        </div>
      ))}
    </div>
  )
}

const DependantGeneralInfo = ({ dependant }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2' >
        <p className='font-semibold text-2xl'>Datos Personales</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantFirstname'>Primer nombre</label>
          </div>
          <Field
            name='dependantFirstname' type='text' value={dependant.firstname}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantMiddlename'>Segundo nombre</label>
          </div>
          <Field
            name='dependantMiddlename' type='text' value={dependant.middlename}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantFirstSurname'>Primer apellido</label>
          </div>
          <Field
            name='dependantFirstSurname' type='text' value={dependant.firstSurname}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantSecondSurname'>Segundo apellido</label>
          </div>
          <Field
            name='dependantSecondSurname' type='text' value={dependant.secondSurname}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantSurnameAfterMarried'>Apellido de casada</label>
          </div>
          <Field
            name='dependantSurnameAfterMarried' type='text' value={dependant.surnameAfterMarried}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantEmail'>Email</label>
          </div>
          <Field
            name='dependantEmail' type='email' value={dependant.email}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantGender'>Sexo</label>
          </div>
          <Field
            name='dependantGender' value={dependant.gender}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantMaritalStatus'>Estado Civil</label>
          </div>
          <Field
            name='dependantMaritalStatus' value={dependant.maritalStatus}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantOccupation'>Ocupación</label>
          </div>
          <Field
            name='dependantOccupation' type='text' value={dependant.occupation}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantBirthDate'>Fecha de Nacimiento</label>
          </div>
          <Field
            name='dependantBirthDate' type='date' value={dependant.birthDate}
            className={`min-w-full rounded-sm h-10 p-2 bg-gray-300`}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantWeight'>Peso (en lb)</label>
          </div>
          <Field
            name='dependantWeight' type='number' value={dependant.weight}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantHeight'>Estatura (en m)</label>
          </div>
          <Field
            name='dependantHeight' type='number' value={dependant.height}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantWorksAt'>Lugar de Trabajo</label>
          </div>
          <Field
            name='dependantWorksAt' type='text' value={dependant.worksAt}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantWorkAddress'>Dirección de Trabajo</label>
          </div>
          <Field
            name='dependantWorkAddress' type='text' value={dependant.workAddress}
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
      </div>

    </div>
  )
}

const DependantAddress = ({ dependant }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2'>
        <p className='font-semibold text-2xl'>Dirección</p>
      </div>
      {dependant?.map((dependantAddress, i) => (
        <div key={i} className='flex flex-wrap mx-2 justify-evenly self-center'>
          <div className='flex flex-wrap w-full justify-evenly align-middle'>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`dependantNeighborhood${i}`}>Colonia o Barrio</label>
              </div>
              <Field
                name={`dependantNeighborhood${i}`} type='text' value={dependantAddress.neighborhood}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`dependantStreet${i}`}>Calle</label>
              </div>
              <Field
                name={`dependantStreet${i}`} type='text' value={dependantAddress.street}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`dependantAvenue${i}`}>Avenida</label>
              </div>
              <Field
                name={`dependantAvenue${i}`} type='text' value={dependantAddress.avenue}
                className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
                style={{ outline: 'none' }}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`dependantBlock${i}`}>Bloque</label>
              </div>
              <Field
                name={`dependantBlock${i}`} type='text' value={dependantAddress.block}
                className={`min-w-full p-2 rounded-sm h-10`}
                style={{ outline: 'none' }}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`dependantHouseNumber${i}`}>No. de Casa</label>
              </div>
              <Field
                name={`dependantHouseNumber${i}`} type='text' value={dependantAddress.houseNumber}
                className={`min-w-full p-2 rounded-sm h-10`}
                style={{ outline: 'none' }}
              />
            </div>
          </div>
          <div className='flex flex-wrap w-full justify-evenly align-middle'>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`dependantCountry${i}`}>País</label>
              </div>
              <Field
                name={`dependantCountry${i}`} disabled value={dependantAddress.country}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`dependantState${i}`}>Departamento</label>
              </div>
              <Field
                name={`dependantState${i}`} disabled value={dependantAddress.state}
              />
            </div>
            <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
              <div className='flex flex-row space-x-2 font-medium'>
                <label htmlFor={`dependantCity${i}`}>Municipio</label>
              </div>
              <Field
                name={`dependantCity${i}`} disabled value={dependantAddress.city}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const DependantIdentificationDocument = ({ dependant }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2'>
        <p className='font-semibold text-2xl'>Identificación</p>
      </div>
      {dependant?.map((identificationDocument, i) => (
        <div key={i} className='flex flex-wrap mx-2 justify-evenly self-center'>
          <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor={`identificationDocument${i}`}>Documento de Identificación</label>
            </div>
            <Field
              name={`identificationDocument${i}`} type='text' disabled value={identificationDocument.identificationDocument}
              className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor={`identificationDocumentType${i}`}>Tipo de Documento de Identificación</label>
            </div>
            <Field
              name={`identificationDocumentType${i}`} type='text' disabled value={identificationDocument.identificationDocumentType}
              className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const DependantContact = ({ dependant }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2'>
        <p className='font-semibold text-2xl'>Contacto</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantCellphoneNumber'>Número de celular</label>
          </div>
          <Field
            name='dependantCellphoneNumber' type='tel'
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantTelephoneNumber'>Teléfono de casa</label>
          </div>
          <Field
            name='dependantTelephoneNumber' type='tel'
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='dependantFaxNumber'>Número de fax</label>
          </div>
          <Field
            name='dependantFaxNumber' type='tel'
            className={`min-w-full p-2 rounded-sm h-10 bg-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}