import React, { useState } from 'react';
import { useIsFetching, useQueryClient } from 'react-query';
import { LoggedInUserCookieData } from '../../pages/auth/AuthModel';
import { useAuth } from '../../pages/auth/AuthService';
import { Formik, Form, Field, FormikState } from 'formik';
import { object, string, number, date } from 'yup';
import { FcCheckmark } from 'react-icons/fc';
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { format, subDays, subYears } from 'date-fns'
import HolderHealthQuestionnaire from './HolderHealthQuestionnaire';
import DependantHealthQuestionnaire from './DependantHealthQuestionnaire';
import PeopleAged50Exams from './PeopleAged50Exams';
import { createCustomer } from '../../services/Customer'
import { store } from "react-notifications-component"

interface NewCustomer {
  firstname: string,
  middlename: string,
  firstSurname: string,
  secondSurname: string,
  surnameAfterMarried: string,
  email: string,
  gender: number,
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
  cityId: number,
  stateId: number,
  countryId: number,

  identificationDocument: string,
  identificationDocumentType: string,

  number: string,
  phoneNumberType: string
}

export interface OptionType {
  label: string
  value: number | string
}

const NewCustomer = (props) => {
  const [countries, setCoutries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState<number>(undefined)
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState<number>(undefined)
  const [cities, setCities] = useState([])
  const [selectedDob, setSelectedDob] = useState<Date>();
  const [selectedHiredOn, setSelectedHiredOn] = useState<Date>();

  const isFetching = useIsFetching()
  const queryClient = useQueryClient()

  const auth: LoggedInUserCookieData = useAuth(queryClient)

  const genderOptions = [{
    value: 'Male', label: 'Male'
  }, {
    value: 'Female', label: 'Female'
  }, {
    value: 'Other', label: 'Other'
  }]

  const determineManagerialRoleId = (employerRole: string[]): number => {
    if (employerRole?.includes('PERSON_ADMIN'))
      return 4
    else if (employerRole?.includes('BUSINESS_ADMIN'))
      return 5
  }

  const determineEmployeeRoleId = (employerRole: string[]): number => {
    if (employerRole?.includes('PERSON_ADMIN'))
      return 6
    else if (employerRole?.includes('BUSINESS_ADMIN'))
      return 7
  }

  const employeeRoleOptions = [{
    value: determineManagerialRoleId(props?.cookies?.r), label: 'Managerial'
  }, {
    value: determineEmployeeRoleId(props?.cookies?.r), label: 'Employee'
  }]
  console.log('form')

  const NewCustomerSchema = object().shape({
    name: string()
      .min(2, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    surname: string()
      .min(2, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    gender: object()
      .required('Required!'),
    username: string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    password: string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    dob: date()
      .max(
        subYears(new Date(), 18), selectedDob > new Date() ?
        'Dude your new employee hasn\'t even born yet? wtf??' :
        'Employee must be at least 18 years old!'
      )
      .required('Employee\'s date of birth is required!'),
    position: string()
      .required('Required'),
    contractType: string()
      .required('Required'),
    salary: number()
      .required('Required'),
    roleId: object()
      .required('Requied'),
    hiredOn: date()
      .max(
        subDays(new Date(), 10), selectedHiredOn > new Date() &&
      'You can only add a new employee if starting within the next 10 days!'
      )
      .required('Employee\'s hired date is required!'),
    email: string()
      .email('Invalid email')
      .required('Required'),
    emailType: string()
      .required('Required'),
    phoneNumber: string()
      .required('Required'),
    phoneNumberType: string()
      .required('Required'),
    streetAddress1: string()
      .required('Required'),
    cityId: object()
      .required('Required'),
    stateId: object()
      .required('Required'),
    countryId: object()
      .required('Required')
  });

  const initialValues = {
    uid: auth.uid,
    firstname: '',
    middlename: '',
    firstSurname: '',
    secondSurname: '',
    surnameAfterMarried: '',
    email: '',
    gender: null,
    birthDate: '',
    maritalStatus: '',
    occupation: '',
    weight: null,
    height: null,
    worksAt: '',
    workAddress: '',

    neighborhood: '',
    avenue: '',
    street: '',
    block: null,
    houseNumber: null,
    addressType: '',
    cityId: null,
    stateId: null,
    countryId: null,

    identificationDocument: '',
    identificationDocumentType: '',

    phoneNumber: '',
    phoneNumberType: '',

    /*beneficiaryFullName: '',
   beneficiaryKin: '',
   beneficiaryIdentificationDocument: '',
   beneficiaryPercentage: null, */


  }

  return (

    <Formik
      initialValues={initialValues}
      //validationSchema={NewCustomerSchema}
      onSubmit={async (values, { resetForm }) => {
        console.log('v', values)
        try {
          /* values.employerId = auth?.aid
          values.gender = values.gender
          values.cityId = values.cityId
          values.stateId = values.stateId
          values.countryId = values.countryId
          values.roleId = values.roleId*/
          values.uid = auth.uid
          values.addressType = 'Casa'
          values.cityId = 1
          values.stateId = 1
          values.countryId = 1
          values.gender = 'Masculino'
          let res = await createCustomer(auth.a_t, values)
          if (res.status === 200) {
            console.log('yeyy')
            store.addNotification({
              message: `El cliente se creó exitósamente.`,
              type: 'success',
              insert: 'bottom',
              container: 'top-center',
              animationIn: ['animate__animated', 'animate__fadeIn'],
              animationOut: ['animate__animated', 'animate__fadeOut'],
              dismiss: { duration: 5000 }
            });
          }
          resetForm()
        }
        catch (e) {
          console.log(e)
        }
      }}
    >
      {({ errors, touched, initialValues, values, resetForm, setFieldValue, setTouched, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <div className='flex flex-col w-full h-auto rounded-md border border-blueGray-300 bg-white'>
            <div className='flex flex-col p-4 max-w-6xl xl:w-4/5 lg:w-11/12 w-full justify-self-center self-center'>
              {/* Action buttons */}
              <div className='flex justify-end rounded-b space-x-2 mb-3'>
                <button
                  className='xl:w-1/12 md:w-1/6 sm:w-1/5 w-1/2 sm px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-coolGray-500 hover:bg-coolGray-600 active:bg-coolGray-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                  type='button'
                  style={{ transition: 'all .15s ease', outline: 'none' }}
                  onClick={() => { resetForm(initialValues as Partial<FormikState<NewCustomer>>), setSelectedCountry(0), setSelectedState(undefined) }}
                >
                  Reset
                      </button>

                {isSubmitting ?
                  <button
                    className='xl:w-1/12 md:w-1/6 sm:w-1/5 w-1/2 sm px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                    type='submit'
                    style={{ transition: 'all .15s ease', outline: 'none' }}
                  >
                    Creating employee account...
                        </button> :
                  <button
                    className='xl:w-1/12 md:w-1/6 sm:w-1/5 w-1/2 sm px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                    type='submit'
                  >
                    Save
                        </button>}
              </div>
              <GeneralInfo
                values={values}
                initialValues={initialValues}
                touched={touched}
                errors={errors}
                selectedDob={selectedDob}
                setSelectedDob={setSelectedDob}
                setFieldValue={setFieldValue}
                setTouched={setTouched}
              />
              <Address
                values={values}
                initialValues={initialValues}
                touched={touched}
                errors={errors}
              />
              <IdentificationDocument
                values={values}
                initialValues={initialValues}
                touched={touched}
                errors={errors}
              />
              <Contact
                values={values}
                initialValues={initialValues}
                touched={touched}
                errors={errors}
              />

              {/* Contact related */}


              {/* Beneficiarios */}
              {/* <div className='w-11/12 justify-self-center self-center mb-5' >
                <p className='font-semibold text-2xl'>Beneficiarios</p>
              </div>
              <div className='flex flex-wrap mx-2 justify-evenly self-center'>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-96'>
                  <div className='flex flex-row space-x-2'>
                    <label htmlFor='beneficiaryFullName'><span className='text-red-600'>*</span>Nombre Completo</label>
                    {(values.beneficiaryFullName === initialValues.beneficiaryFullName && !touched.beneficiaryFullName) ? null : (errors.beneficiaryFullName ? (<div className='text-red-600'>{errors.beneficiaryFullName}</div>) : <FcCheckmark />)}
                  </div>
                  <Field
                    name='beneficiaryFullName'
                    placeholder={!touched.beneficiaryFullName ? 'Pedro' : ''}
                    className={`min-w-full ${(values.beneficiaryFullName === initialValues.beneficiaryFullName && !touched.beneficiaryFullName) ? '' : (errors.beneficiaryFullName ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
                    style={{ outline: 'none' }}
                  />
                </div>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64 border-orange-500'>
                  <div className='flex flex-row space-x-2'>
                    <label htmlFor='beneficiaryKin'><span className='text-red-600'>*</span>Parentesco</label>
                    {(values.beneficiaryKin === initialValues.beneficiaryKin && !touched.beneficiaryKin) ? null : (errors.beneficiaryKin ? (<div className='text-red-600'>{errors.beneficiaryKin}</div>) : <FcCheckmark />)}
                  </div>
                  <Field
                    name='beneficiaryKin'
                    placeholder={!touched.beneficiaryKin ? 'Ramirez' : ''}
                    className={`min-w-full ${(values.beneficiaryKin === initialValues.beneficiaryKin && !touched.beneficiaryKin) ? '' : (errors.beneficiaryKin ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
                    style={{ outline: 'none' }}
                  />
                </div>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64 border-orange-500'>
                  <div className='flex flex-row space-x-2'>
                    <label htmlFor='beneficiaryIdentificationDocument'><span className='text-red-600'>*</span>Documento de Identificación</label>
                    {(values.beneficiaryIdentificationDocument === initialValues.beneficiaryIdentificationDocument && !touched.beneficiaryIdentificationDocument) ? null : (errors.beneficiaryIdentificationDocument ? (<div className='text-red-600'>{errors.beneficiaryIdentificationDocument}</div>) : <FcCheckmark />)}
                  </div>
                  <Field
                    name='beneficiaryIdentificationDocument'
                    placeholder={!touched.beneficiaryIdentificationDocument ? 'Ramirez' : ''}
                    className={`min-w-full ${(values.beneficiaryIdentificationDocument === initialValues.beneficiaryIdentificationDocument && !touched.beneficiaryIdentificationDocument) ? '' : (errors.beneficiaryIdentificationDocument ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
                    style={{ outline: 'none' }}
                  />
                </div>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-28 border-orange-500'>
                  <div className='flex flex-row space-x-2'>
                    <label htmlFor='beneficiaryPercentage'><span className='text-red-600'>*</span>Porcentaje</label>
                    {(values.beneficiaryPercentage === initialValues.beneficiaryPercentage && !touched.beneficiaryPercentage) ? null : (errors.beneficiaryPercentage ? (<div className='text-red-600'>{errors.beneficiaryPercentage}</div>) : <FcCheckmark />)}
                  </div>
                  <Field
                    name='beneficiaryPercentage'
                    placeholder={!touched.beneficiaryPercentage ? 'Ramirez' : ''}
                    className={`min-w-full ${(values.beneficiaryPercentage === initialValues.beneficiaryPercentage && !touched.beneficiaryPercentage) ? '' : (errors.beneficiaryPercentage ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
                    style={{ outline: 'none' }}
                  />
                </div>
              </div> */}

            </div>
          </div>
        </Form>
      )
      }
    </Formik >
  )
}

export default NewCustomer
{/* Questionario de salud titular */ }
{/* <div className='w-11/12 justify-self-center self-center mb-5' >
  <p className='font-semibold text-2xl'>Questionario de Salud del Titular</p>
</div>
<div className='flex flex-wrap mx-2 justify-evenly self-center'>
  <HolderHealthQuestionnaire />
</div> */}

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


const GeneralInfo = ({ values, initialValues, touched, errors, selectedDob, setSelectedDob, setFieldValue, setTouched }) => {
  return (
    <div className="">
      <div className='w-11/12 justify-self-center self-center mb-5' >
        <p className='font-semibold text-2xl'>Datos Personales</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='firstname'><span className='text-red-600'>*</span>Primer nombre</label>
            {(values.firstname === initialValues.firstname && !touched.firstname) ? null : (errors.firstname ? (<div className='text-red-600'>{errors.firstname}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='firstname'
            placeholder={!touched.firstname ? 'Pedro' : ''}
            className={`min-w-full ${(values.firstname === initialValues.firstname && !touched.firstname) ? '' : (errors.firstname ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64 border-orange-500'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='middlename'><span className='text-red-600'>*</span>Segundo nombre</label>
            {(values.middlename === initialValues.middlename && !touched.middlename) ? null : (errors.middlename ? (<div className='text-red-600'>{errors.middlename}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='middlename'
            placeholder={!touched.middlename ? 'Ramirez' : ''}
            className={`min-w-full ${(values.middlename === initialValues.middlename && !touched.middlename) ? '' : (errors.middlename ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64 border-orange-500'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='firstSurname'><span className='text-red-600'>*</span>Primer apellido</label>
            {(values.firstSurname === initialValues.firstSurname && !touched.firstSurname) ? null : (errors.firstSurname ? (<div className='text-red-600'>{errors.firstSurname}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='firstSurname'
            placeholder={!touched.firstSurname ? 'Ramirez' : ''}
            className={`min-w-full ${(values.firstSurname === initialValues.firstSurname && !touched.firstSurname) ? '' : (errors.firstSurname ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64 border-orange-500'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='secondSurname'><span className='text-red-600'>*</span>Segundo apellido</label>
            {(values.secondSurname === initialValues.secondSurname && !touched.secondSurname) ? null : (errors.secondSurname ? (<div className='text-red-600'>{errors.secondSurname}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='secondSurname'
            placeholder={!touched.secondSurname ? 'Ramirez' : ''}
            className={`min-w-full ${(values.secondSurname === initialValues.secondSurname && !touched.secondSurname) ? '' : (errors.secondSurname ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64 border-orange-500'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='surnameAfterMarried'><span className='text-red-600'>*</span>Apellido de casada</label>
            {(values.surnameAfterMarried === initialValues.surnameAfterMarried && !touched.surnameAfterMarried) ? null : (errors.surnameAfterMarried ? (<div className='text-red-600'>{errors.surnameAfterMarried}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='surnameAfterMarried'
            placeholder={!touched.surnameAfterMarried ? '' : ''}
            className={`min-w-full ${(values.surnameAfterMarried === initialValues.surnameAfterMarried && !touched.surnameAfterMarried) ? '' : (errors.surnameAfterMarried ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64 border-orange-500'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='email'><span className='text-red-600'>*</span>Email</label>
            {(values.email === initialValues.email && !touched.email) ? null : (errors.email ? (<div className='text-red-600'>{errors.email}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='email'
            placeholder={!touched.email ? 'pedro@gmail.com' : ''}
            className={`min-w-full ${(values.email === initialValues.email && !touched.email) ? '' : (errors.email ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='gender'><span className='text-red-600'>*</span>Sexo</label>
            {(values.gender === initialValues.gender && !touched.gender) ? null : (errors.gender ? (<div className='text-red-600'>{errors.gender}</div>) : <FcCheckmark />)}
          </div>
          <Field name='gender'
            placeholder={!touched.gender ? 'Masculino' : ''}
            className={`min-w-full ${(values.gender === initialValues.gender && !touched.gender) ? '' : (errors.gender ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          /* children={({ field }) => (
          <Select {...field} value={values.gender} menuPlacement='auto'
            onChange={(v: OptionType) => {
              setFieldValue(field.name, v);
            }}
            className={`min-w-full ${(values.gender === initialValues.gender && !touched.gender) ? '' : (errors.gender ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} text-center shadow-sm rounded-sm h-10 border border-gray-300`}
            options={genderOptions} placeholder='Select gender'
            onBlur={() => setTouched({ ...touched, gender: true })}
          />
        )} */
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='maritalStatus'><span className='text-red-600'>*</span>Estado Civil</label>
            {(values.maritalStatus === initialValues.maritalStatus && !touched.maritalStatus) ? null : (errors.maritalStatus ? (<div className='text-red-600'>{errors.maritalStatus}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='maritalStatus'
            placeholder={!touched.maritalStatus ? 'Soltero' : ''}
            className={`min-w-full ${(values.maritalStatus === initialValues.maritalStatus && !touched.maritalStatus) ? '' : (errors.maritalStatus ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='occupation'><span className='text-red-600'>*</span>Ocupación</label>
            {(values.occupation === initialValues.occupation && !touched.occupation) ? null : (errors.occupation ? (<div className='text-red-600'>{errors.occupation}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='occupation'
            placeholder={!touched.occupation ? 'Ingeniero' : ''}
            className={`min-w-full ${(values.occupation === initialValues.occupation && !touched.occupation) ? '' : (errors.occupation ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='birthDate'><span className='text-red-600'>*</span>Fecha de Nacimiento</label>
            {(values.birthDate === initialValues.birthDate && !touched.birthDate) ? null : (errors.birthDate ? (<div className='text-red-600'>{errors.birthDate}</div>) : <FcCheckmark />)}
          </div>
          <Field name='birthDate'
            children={({ field }) => (
              <DatePicker
                className={`flex-grow 2xl:w-64 w-64 ${(values.birthDate === initialValues.birthDate && !touched.birthDate) ? '' : (errors.birthDate ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} shadow-sm rounded-sm h-10 px-3 border border-gray-300`}
                selected={selectedDob}
                dateFormat='MMMM d, yyyy'
                onChange={(date: Date) => {
                  setSelectedDob(date);
                  setFieldValue('birthDate', (date && format(date, 'P')) ?? '');
                }}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                todayButton="Today"
                placeholderText={'Fecha de nacimiento del titular'}
                onBlur={() => setTouched({ ...touched, birthDate: true })}
              />
            )}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='weight'><span className='text-red-600'>*</span>Peso (en lb)</label>
            {(values.weight === initialValues.weight && !touched.weight) ? null : (errors.weight ? (<div className='text-red-600'>{errors.weight}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='weight'
            placeholder={!touched.weight ? 'Ingeniero' : ''}
            className={`min-w-full ${(values.weight === initialValues.weight && !touched.weight) ? '' : (errors.weight ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='height'><span className='text-red-600'>*</span>Estatura (en m)</label>
            {(values.height === initialValues.height && !touched.height) ? null : (errors.height ? (<div className='text-red-600'>{errors.height}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='height'
            placeholder={!touched.height ? 'Ingeniero' : ''}
            className={`min-w-full ${(values.height === initialValues.height && !touched.height) ? '' : (errors.height ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='worksAt'><span className='text-red-600'>*</span>Lugar de Trabajo</label>
            {(values.worksAt === initialValues.worksAt && !touched.worksAt) ? null : (errors.worksAt ? (<div className='text-red-600'>{errors.worksAt}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='worksAt'
            placeholder={!touched.worksAt ? 'Eterna S.A.' : ''}
            className={`min-w-full ${(values.worksAt === initialValues.worksAt && !touched.worksAt) ? '' : (errors.worksAt ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='workAddress'><span className='text-red-600'>*</span>Dirección de Trabajo</label>
            {(values.workAddress === initialValues.workAddress && !touched.workAddress) ? null : (errors.workAddress ? (<div className='text-red-600'>{errors.workAddress}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='workAddress'
            placeholder={!touched.workAddress ? 'San Pedro Sula' : ''}
            className={`min-w-full ${(values.workAddress === initialValues.workAddress && !touched.workAddress) ? '' : (errors.workAddress ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
      </div>

    </div>
  )
}

const Address = ({ values, initialValues, touched, errors }) => {
  return (
    <div className="">
      <div className='w-11/12 justify-self-center self-center mb-5'>
        <p className='font-semibold text-2xl'>Barrio o Colonia</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex flex-wrap w-full justify-evenly align-middle'>
          <div className='flex-grow ml-2 mb-2'>
            <div className='flex flex-row space-x-2'>
              <label htmlFor='neighborhood'><span className='text-red-600'>*</span>Street address</label>
              {(values.neighborhood === initialValues.neighborhood && !touched.neighborhood) ? null : (errors.neighborhood ? (<div className='text-red-600'>{errors.neighborhood}</div>) : <FcCheckmark />)}
            </div>
            <Field
              name='neighborhood'
              placeholder={!touched.neighborhood ? 'Pedro' : ''}
              className={`min-w-full ${(values.neighborhood === initialValues.neighborhood && !touched.neighborhood) ? '' : (errors.neighborhood ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-2'>
            <div className='flex flex-row space-x-2'>
              <label htmlFor='avenue'><span className='text-red-600'>*</span>Avenida</label>
              {(values.avenue === initialValues.avenue && !touched.avenue) ? null : (errors.avenue ? (<div className='text-red-600'>{errors.avenue}</div>) : <FcCheckmark />)}
            </div>
            <Field
              name='avenue'
              placeholder={!touched.avenue ? 'Pedro' : ''}
              className={`min-w-full ${(values.avenue === initialValues.avenue && !touched.avenue) ? '' : (errors.avenue ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-2'>
            <div className='flex flex-row space-x-2'>
              <label htmlFor='street'><span className='text-red-600'>*</span>Calle</label>
              {(values.street === initialValues.street && !touched.street) ? null : (errors.street ? (<div className='text-red-600'>{errors.street}</div>) : <FcCheckmark />)}
            </div>
            <Field
              name='street'
              placeholder={!touched.street ? 'Pedro' : ''}
              className={`min-w-full ${(values.street === initialValues.street && !touched.street) ? '' : (errors.street ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow-0 ml-2 mb-2 w-full sm:w-auto'>
            <div className='flex flex-row space-x-2'>
              <label htmlFor='block'>Bloque</label>
            </div>
            <Field
              name='block'
              placeholder={!touched.block ? 'Pedro' : ''}
              className={`min-w-full p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow-0 ml-2 mb-2 w-full sm:w-auto'>
            <div className='flex flex-row space-x-2'>
              <label htmlFor='houseNumber'>No. de Casa</label>
            </div>
            <Field
              name='houseNumber'
              placeholder={!touched.houseNumber ? 'Pedro' : ''}
              className={`min-w-full p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
              style={{ outline: 'none' }}
            />
          </div>
        </div>
        {/* <div className='flex flex-wrap w-full justify-evenly align-middle'>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
                  <label htmlFor='countryId'>Country</label>
                  <Field name='countryId' className='min-w-full'
                    children={({ field }) => (
                      <Select {...field} value={values.countryId} menuPlacement='auto'
                        onChange={(v) => {
                          setFieldValue(field.name, v);
                          setSelectedCountry(v.value);
                          setFieldValue('stateId', '');
                          setFieldValue('cityId', '');
                        }}
                        options={countries ?? []} placeholder='Select a country' label='Country'
                        onTouch={() => setTouched({ ...touched, countryId: true })}
                      />
                    )}
                  />
                </div>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
                  <label htmlFor='stateId'>State</label>
                  <Field name='stateId'
                    children={({ field }) => (
                      <Select {...field} isDisabled={!(selectedCountry > 0)} value={values.stateId}
                        onChange={(v) => {
                          setFieldValue(field.name, v);
                          setSelectedState(v.value);
                          setFieldValue('cityId', '');
                        }} menuPlacement='auto'
                        options={states ?? []} placeholder='Select a state' label='State'
                        onTouch={() => setTouched({ ...touched, stateId: true })}
                      />
                    )}
                  />
                </div>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
                  <label htmlFor='cityId'>City</label>
                  <Field name='cityId'
                    children={({ field }) => (
                      <Select {...field} isDisabled={!(selectedState > 0)} value={values.cityId}
                        onChange={(v) => {
                          setFieldValue(field.name, v)
                        }} menuPlacement='auto'
                        options={cities ?? []} placeholder='Select a city' label='City'
                        onTouch={() => setTouched({ ...touched, cityId: true })}
                      />
                    )}
                  />
                </div>
              </div> */}
      </div>
    </div>
  )
}

const IdentificationDocument = ({ values, initialValues, touched, errors }) => {
  return (
    <div className="">
      <div className='w-11/12 justify-self-center self-center mb-5'>
        <p className='font-semibold text-2xl'>Identificación</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='identificationDocument'><span className='text-red-600'>*</span>Documento de Identificación</label>
            {(values.identificationDocument === initialValues.identificationDocument && !touched.identificationDocument) ? null : (errors.identificationDocument ? (<div className='text-red-600'>{errors.identificationDocument}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='identificationDocument'
            placeholder={!touched.identificationDocument ? 'Pedro' : ''}
            className={`min-w-full ${(values.identificationDocument === initialValues.identificationDocument && !touched.identificationDocument) ? '' : (errors.identificationDocument ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='identificationDocumentType'><span className='text-red-600'>*</span>Tipo de Documento de Identificación</label>
            {(values.identificationDocumentType === initialValues.identificationDocumentType && !touched.identificationDocumentType) ? null : (errors.identificationDocumentType ? (<div className='text-red-600'>{errors.identificationDocumentType}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='identificationDocumentType'
            placeholder={!touched.identificationDocumentType ? 'Pedro' : ''}
            className={`min-w-full ${(values.identificationDocumentType === initialValues.identificationDocumentType && !touched.identificationDocumentType) ? '' : (errors.identificationDocumentType ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}

const Contact = ({ values, initialValues, touched, errors }) => {
  return (
    <div className="">
      <div className='w-11/12 justify-self-center self-center mb-5'>
        <p className='font-semibold text-2xl'>Contacto</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='phoneNumber'><span className='text-red-600'>*</span>Número de teléfono</label>
            {(values.phoneNumber === initialValues.phoneNumber && !touched.phoneNumber) ? null : (errors.phoneNumber ? (<div className='text-red-600'>{errors.phoneNumber}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='phoneNumber'
            placeholder={!touched.phoneNumber ? 'Pedro' : ''}
            className={`min-w-full ${(values.phoneNumber === initialValues.phoneNumber && !touched.phoneNumber) ? '' : (errors.phoneNumber ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2'>
            <label htmlFor='phoneNumberType'><span className='text-red-600'>*</span>Tipo de número de teléfono</label>
            {(values.phoneNumberType === initialValues.phoneNumberType && !touched.phoneNumberType) ? null : (errors.phoneNumberType ? (<div className='text-red-600'>{errors.phoneNumberType}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='phoneNumberType'
            placeholder={!touched.phoneNumberType ? 'Pedro' : ''}
            className={`min-w-full ${(values.phoneNumberType === initialValues.phoneNumberType && !touched.phoneNumberType) ? '' : (errors.phoneNumberType ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} p-2 shadow-sm rounded-sm h-10 border border-gray-300`}
            style={{ outline: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}