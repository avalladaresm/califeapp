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
import { store } from 'react-notifications-component'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import MunicipalityDropdown from '../MunicipalityDropdown';

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
  city: string,
  state: string,
  country: string,

  identificationDocument: string,
  identificationDocumentType: string,

  cellphoneNumber: string,
  telephoneNumber: string,
  faxNumber: string,
}

export interface OptionType {
  label: string
  value: number | string
}

const NewCustomer = () => {
  const [selectedDob, setSelectedDob] = useState<Date>();

  const queryClient = useQueryClient()
  const auth: LoggedInUserCookieData = useAuth(queryClient)

  const NewCustomerSchema = object().shape({
    firstname: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    middlename: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    firstSurname: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    secondSurname: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    surnameAfterMarried: string().min(2, 'Muy corto!').max(255, 'Muy largo!'),
    email: string().email('Correo inválido'),
    gender: string().required('Requerido!'),
    birthDate: date().max(subYears(new Date(), 18), 'Tienes que tener al menos 18 años de edad!').required('Requerido!'),
    maritalStatus: string().required('Requerido!'),
    occupation: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    weight: number().typeError('Solo se aceptan números!').positive('Debe ser un número positivo!').required('Requerido!'),
    height: number().typeError('Solo se aceptan números!').positive('Debe ser un número positivo!').max(3, 'Estatura debe ser en metros!').required('Requerido!'),
    worksAt: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    workAddress: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    neighborhood: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    avenue: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    street: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    block: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    houseNumber: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    addressType: string().min(2, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    city: string().required('Requerido!'),
    state: string().required('Requerido!'),
    country: string().required('Requerido!'),
    identificationDocument: string().min(6, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    identificationDocumentType: string().min(6, 'Muy corto!').max(255, 'Muy largo!').required('Requerido!'),
    cellphoneNumber: string().min(6, 'Muy corto!').max(25, 'Muy largo!').required('Requerido!'),
    telephoneNumber: string().min(6, 'Muy corto!').max(25, 'Muy largo!').required('Requerido!'),
    faxNumber: string().min(6, 'Muy corto!').max(25, 'Muy largo!')
  });

  const initialValues = {
    uid: auth.uid ?? null,
    firstname: '',
    middlename: '',
    firstSurname: '',
    secondSurname: '',
    surnameAfterMarried: '',
    email: '',
    gender: '',
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
    city: '',
    state: '',
    country: '',

    identificationDocument: '',
    identificationDocumentType: '',

    cellphoneNumber: '',
    telephoneNumber: '',
    faxNumber: ''

    /*beneficiaryFullName: '',
   beneficiaryKin: '',
   beneficiaryIdentificationDocument: '',
   beneficiaryPercentage: null, */
  }

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={NewCustomerSchema}
      onSubmit={async (values, { resetForm }) => {
        console.log('v', values)
        try {
          values.uid = auth.uid
          values.addressType = 'Casa'
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
          store.addNotification({
            message: `El cliente no se pudo crear debido a un error. Inténtalo más tarde.`,
            type: 'danger',
            insert: 'bottom',
            container: 'top-center',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: { duration: 5000 }
          });
        }
      }}
    >
      {({ errors, touched, initialValues, values, resetForm, setFieldValue, setTouched, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <div className='flex flex-col w-full h-auto rounded-md border border-blueGray-300 bg-white'>
            <div className='flex flex-col p-4 max-w-7xl xl:w-4/5 lg:w-11/12 w-full justify-self-center self-center space-y-10'>
              <ActionButtons
                initialValues={initialValues}
                isSubmitting={isSubmitting}
                resetForm={resetForm}
              />
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
                setFieldValue={setFieldValue}
                setTouched={setTouched}
              />
              <IdentificationDocument
                values={values}
                initialValues={initialValues}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
                setTouched={setTouched}
              />
              <Contact
                values={values}
                initialValues={initialValues}
                touched={touched}
                errors={errors}
              />

              {/* Beneficiarios */}
              {/* <div className='w-11/12 justify-self-center self-center mb-5' >
                <p className='font-semibold text-2xl'>Beneficiarios</p>
              </div>
              <div className='flex flex-wrap mx-2 justify-evenly self-center'>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-96'>
                  <div className='flex flex-row space-x-2 font-medium'>
                    <label htmlFor='beneficiaryFullName'><span className='text-red-500'>*</span>Nombre Completo</label>
                    {(values.beneficiaryFullName === initialValues.beneficiaryFullName && !touched.beneficiaryFullName) ? null : (errors.beneficiaryFullName ? (<div className='text-red-500'>{errors.beneficiaryFullName}</div>) : <FcCheckmark />)}
                  </div>
                  <Field
                    name='beneficiaryFullName'
                    placeholder={!touched.beneficiaryFullName ? 'Pedro' : ''}
                    className={`min-w-full p-2 rounded-sm h-10 ${(values.beneficiaryFullName === initialValues.beneficiaryFullName && !touched.beneficiaryFullName) ? '' : (errors.beneficiaryFullName && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                    style={{ outline: 'none' }}
                  />
                </div>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
                  <div className='flex flex-row space-x-2 font-medium'>
                    <label htmlFor='beneficiaryKin'><span className='text-red-500'>*</span>Parentesco</label>
                    {(values.beneficiaryKin === initialValues.beneficiaryKin && !touched.beneficiaryKin) ? null : (errors.beneficiaryKin ? (<div className='text-red-500'>{errors.beneficiaryKin}</div>) : <FcCheckmark />)}
                  </div>
                  <Field
                    name='beneficiaryKin'
                    placeholder={!touched.beneficiaryKin ? 'Ramirez' : ''}
                    className={`min-w-full p-2 rounded-sm h-10 ${(values.beneficiaryKin === initialValues.beneficiaryKin && !touched.beneficiaryKin) ? '' : (errors.beneficiaryKin && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                    style={{ outline: 'none' }}
                  />
                </div>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-64'>
                  <div className='flex flex-row space-x-2 font-medium'>
                    <label htmlFor='beneficiaryIdentificationDocument'><span className='text-red-500'>*</span>Documento de Identificación</label>
                    {(values.beneficiaryIdentificationDocument === initialValues.beneficiaryIdentificationDocument && !touched.beneficiaryIdentificationDocument) ? null : (errors.beneficiaryIdentificationDocument ? (<div className='text-red-500'>{errors.beneficiaryIdentificationDocument}</div>) : <FcCheckmark />)}
                  </div>
                  <Field
                    name='beneficiaryIdentificationDocument'
                    placeholder={!touched.beneficiaryIdentificationDocument ? 'Ramirez' : ''}
                    className={`min-w-full p-2 rounded-sm h-10 ${(values.beneficiaryIdentificationDocument === initialValues.beneficiaryIdentificationDocument && !touched.beneficiaryIdentificationDocument) ? '' : (errors.beneficiaryIdentificationDocument && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                    style={{ outline: 'none' }}
                  />
                </div>
                <div className='flex-grow ml-2 mb-2 2xl:w-64 w-28'>
                  <div className='flex flex-row space-x-2 font-medium'>
                    <label htmlFor='beneficiaryPercentage'><span className='text-red-500'>*</span>Porcentaje</label>
                    {(values.beneficiaryPercentage === initialValues.beneficiaryPercentage && !touched.beneficiaryPercentage) ? null : (errors.beneficiaryPercentage ? (<div className='text-red-500'>{errors.beneficiaryPercentage}</div>) : <FcCheckmark />)}
                  </div>
                  <Field
                    name='beneficiaryPercentage'
                    placeholder={!touched.beneficiaryPercentage ? 'Ramirez' : ''}
                    className={`min-w-full p-2 rounded-sm h-10 ${(values.beneficiaryPercentage === initialValues.beneficiaryPercentage && !touched.beneficiaryPercentage) ? '' : (errors.beneficiaryPercentage && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
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
          className='xl:w-1/12 md:w-1/6 sm:w-1/5 w-1/2 sm px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
          type='submit'
        >
          Guardar
        </button>}
    </div>
  )
}


const GeneralInfo = ({ values, initialValues, touched, errors, selectedDob, setSelectedDob, setFieldValue, setTouched }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2' >
        <p className='font-semibold text-2xl'>Datos Personales</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='firstname'><span className='text-red-500'>*</span>Primer nombre</label>
            {(values.firstname === initialValues.firstname && !touched.firstname) ? null : (errors.firstname ? (<div className='text-red-500'>{errors.firstname}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='firstname' type='text'
            placeholder={!touched.firstname ? 'Pedro' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.firstname === initialValues.firstname && !touched.firstname) ? '' : (errors.firstname && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='middlename'><span className='text-red-500'>*</span>Segundo nombre</label>
            {(values.middlename === initialValues.middlename && !touched.middlename) ? null : (errors.middlename ? (<div className='text-red-500'>{errors.middlename}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='middlename' type='text'
            placeholder={!touched.middlename ? 'Alberto' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.middlename === initialValues.middlename && !touched.middlename) ? '' : (errors.middlename && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='firstSurname'><span className='text-red-500'>*</span>Primer apellido</label>
            {(values.firstSurname === initialValues.firstSurname && !touched.firstSurname) ? null : (errors.firstSurname ? (<div className='text-red-500'>{errors.firstSurname}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='firstSurname' type='text'
            placeholder={!touched.firstSurname ? 'Pascal' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.firstSurname === initialValues.firstSurname && !touched.firstSurname) ? '' : (errors.firstSurname && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='secondSurname'><span className='text-red-500'>*</span>Segundo apellido</label>
            {(values.secondSurname === initialValues.secondSurname && !touched.secondSurname) ? null : (errors.secondSurname ? (<div className='text-red-500'>{errors.secondSurname}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='secondSurname' type='text'
            placeholder={!touched.secondSurname ? 'Figueroa' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.secondSurname === initialValues.secondSurname && !touched.secondSurname) ? '' : (errors.secondSurname && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='surnameAfterMarried'>Apellido de casada</label>
            {(values.surnameAfterMarried === initialValues.surnameAfterMarried && !touched.surnameAfterMarried) ? null : (errors.surnameAfterMarried ? (<div className='text-red-500'>{errors.surnameAfterMarried}</div>) : values.surnameAfterMarried?.length > 0 && <FcCheckmark />)}
          </div>
          <Field
            name='surnameAfterMarried' type='text'
            placeholder={!touched.surnameAfterMarried ? 'López' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.surnameAfterMarried === initialValues.surnameAfterMarried && !touched.surnameAfterMarried) ? '' : (errors.surnameAfterMarried && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='email'>Email</label>
            {(values.email === initialValues.email && !touched.email) ? null : (errors.email ? (<div className='text-red-500'>{errors.email}</div>) : values.email?.length > 0 && <FcCheckmark />)}
          </div>
          <Field
            name='email' type='email'
            placeholder={!touched.email ? 'pedro@gmail.com' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.email === initialValues.email && !touched.email) ? '' : (errors.email && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='gender'><span className='text-red-500'>*</span>Sexo</label>
            {(values.gender === initialValues.gender && !touched.gender) ? null : (errors.gender ? (<div className='text-red-500'>{errors.gender}</div>) : <FcCheckmark />)}
          </div>
          <Field name='gender'
            className={`min-w-full p-2 rounded-sm h-10 ${(values.gender === initialValues.gender && !touched.gender) ? '' : (errors.gender && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
            children={({ field }) => (
              <select name='gender' id='gender'
                className={`min-w-full rounded-sm h-10 ${(values.gender === initialValues.gender && !touched.gender) ? '' : (errors.gender && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                onChange={v => {
                  setFieldValue(field.name, v.target.value);
                }}
                onBlur={() => setTouched({ ...touched, gender: true })}
              >
                <option value=''>Seleccione su sexo</option>
                <option value='Femenino'>Femenino</option>
                <option value='Masculino'>Masculino</option>
              </select>
            )}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='maritalStatus'><span className='text-red-500'>*</span>Estado Civil</label>
            {(values.maritalStatus === initialValues.maritalStatus && !touched.maritalStatus) ? null : (errors.maritalStatus ? (<div className='text-red-500'>{errors.maritalStatus}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='maritalStatus'
            className={`min-w-full p-2 rounded-sm h-10 ${(values.maritalStatus === initialValues.maritalStatus && !touched.maritalStatus) ? '' : (errors.maritalStatus && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
            children={({ field }) => (
              <select name='maritalStatus' id='maritalStatus'
                className={`min-w-full rounded-sm h-10 ${(values.maritalStatus === initialValues.maritalStatus && !touched.maritalStatus) ? '' : (errors.maritalStatus && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                onChange={v => {
                  setFieldValue(field.name, v.target.value);
                }}
                onBlur={() => setTouched({ ...touched, maritalStatus: true })}
              >
                <option value=''>Seleccione su estado civil</option>
                <option value='Casado'>Casado (a)</option>
                <option value='Soltero'>Soltero (a)</option>
                <option value='Otro'>Otro (s)</option>
              </select>
            )}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='occupation'><span className='text-red-500'>*</span>Ocupación</label>
            {(values.occupation === initialValues.occupation && !touched.occupation) ? null : (errors.occupation ? (<div className='text-red-500'>{errors.occupation}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='occupation' type='text'
            placeholder={!touched.occupation ? 'Ingeniero' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.occupation === initialValues.occupation && !touched.occupation) ? '' : (errors.occupation && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='birthDate'><span className='text-red-500'>*</span>Fecha de Nacimiento</label>
            {(values.birthDate === initialValues.birthDate && !touched.birthDate) ? null : (errors.birthDate ? (<div className='text-red-500'>{errors.birthDate}</div>) : <FcCheckmark />)}
          </div>
          <Field name='birthDate' type='date'
            className={`min-w-full rounded-sm h-10 p-2 ${(values.birthDate === initialValues.birthDate && !touched.birthDate) ? '' : (errors.birthDate && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            onChange={(e) => {
              setFieldValue('birthDate', (date && format(e.target.value, 'P')) ?? '');
              setSelectedDob(e.target.value)
            }}
            value={selectedDob}
            onBlur={() => setTouched({ ...touched, birthDate: true })}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='weight'><span className='text-red-500'>*</span>Peso (en lb)</label>
            {(values.weight === initialValues.weight && !touched.weight) ? null : (errors.weight ? (<div className='text-red-500'>{errors.weight}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='weight' type='number'
            placeholder={!touched.weight ? 'Ingeniero' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.weight === initialValues.weight && !touched.weight) ? '' : (errors.weight && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='height'><span className='text-red-500'>*</span>Estatura (en m)</label>
            {(values.height === initialValues.height && !touched.height) ? null : (errors.height ? (<div className='text-red-500'>{errors.height}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='height' type='number'
            placeholder={!touched.height ? 'Ingeniero' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.height === initialValues.height && !touched.height) ? '' : (errors.height && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='worksAt'><span className='text-red-500'>*</span>Lugar de Trabajo</label>
            {(values.worksAt === initialValues.worksAt && !touched.worksAt) ? null : (errors.worksAt ? (<div className='text-red-500'>{errors.worksAt}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='worksAt' type='text'
            placeholder={!touched.worksAt ? 'Eterna S.A.' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.worksAt === initialValues.worksAt && !touched.worksAt) ? '' : (errors.worksAt && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='workAddress'><span className='text-red-500'>*</span>Dirección de Trabajo</label>
            {(values.workAddress === initialValues.workAddress && !touched.workAddress) ? null : (errors.workAddress ? (<div className='text-red-500'>{errors.workAddress}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='workAddress' type='text'
            placeholder={!touched.workAddress ? 'San Pedro Sula' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.workAddress === initialValues.workAddress && !touched.workAddress) ? '' : (errors.workAddress && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
      </div>

    </div>
  )
}

const Address = ({ values, initialValues, touched, errors, setFieldValue, setTouched }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2'>
        <p className='font-semibold text-2xl'>Barrio o Colonia</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex flex-wrap w-full justify-evenly align-middle'>
          <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor='neighborhood'><span className='text-red-500'>*</span>Colonia o Barrio</label>
              {(values.neighborhood === initialValues.neighborhood && !touched.neighborhood) ? null : (errors.neighborhood ? (<div className='text-red-500'>{errors.neighborhood}</div>) : <FcCheckmark />)}
            </div>
            <Field
              name='neighborhood' type='text'
              placeholder={!touched.neighborhood ? 'Colonia Las Flores' : ''}
              className={`min-w-full p-2 rounded-sm h-10 ${(values.neighborhood === initialValues.neighborhood && !touched.neighborhood) ? '' : (errors.neighborhood && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor='street'><span className='text-red-500'>*</span>Calle</label>
              {(values.street === initialValues.street && !touched.street) ? null : (errors.street ? (<div className='text-red-500'>{errors.street}</div>) : <FcCheckmark />)}
            </div>
            <Field
              name='street' type='text'
              placeholder={!touched.street ? 'Pedro' : ''}
              className={`min-w-full p-2 rounded-sm h-10 ${(values.street === initialValues.street && !touched.street) ? '' : (errors.street && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor='avenue'><span className='text-red-500'>*</span>Avenida</label>
              {(values.avenue === initialValues.avenue && !touched.avenue) ? null : (errors.avenue ? (<div className='text-red-500'>{errors.avenue}</div>) : <FcCheckmark />)}
            </div>
            <Field
              name='avenue' type='text'
              placeholder={!touched.avenue ? 'Pedro' : ''}
              className={`min-w-full p-2 rounded-sm h-10 ${(values.avenue === initialValues.avenue && !touched.avenue) ? '' : (errors.avenue && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor='block'>Bloque</label>
            </div>
            <Field
              name='block' type='text'
              placeholder={!touched.block ? 'Pedro' : ''}
              className={`min-w-full p-2 rounded-sm h-10`}
              style={{ outline: 'none' }}
            />
          </div>
          <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor='houseNumber'>No. de Casa</label>
            </div>
            <Field
              name='houseNumber' type='text'
              placeholder={!touched.houseNumber ? 'Pedro' : ''}
              className={`min-w-full p-2 rounded-sm h-10`}
              style={{ outline: 'none' }}
            />
          </div>
        </div>
        <div className='flex flex-wrap w-full justify-evenly align-middle'>
          <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor='country'><span className='text-red-500'>*</span>País</label>
            </div>
            <Field
              name='country'
              onTouch={() => setTouched({ ...touched, country: true })}
              children={({ field }) => (
                <CountryDropdown
                  {...field}
                  value={values.country}
                  priorityOptions={['HN']}
                  className={`w-full p-2 rounded-sm h-10 ${(values.country === initialValues.country && !touched.country) ? '' : (errors.country && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                  onChange={(v) => setFieldValue(field.name, v)}
                />
              )}
            />
          </div>
          <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor='state'><span className='text-red-500'>*</span>Departamento</label>
            </div>
            <Field
              name='state'
              onTouch={() => setTouched({ ...touched, state: true })}
              children={({ field }) => (
                <RegionDropdown
                  {...field}
                  country={values.country}
                  value={values.state}
                  className={`w-full p-2 rounded-sm h-10 ${(values.state === initialValues.state && !touched.state) ? '' : (errors.state && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                  onChange={(v) => setFieldValue(field.name, v)}
                />
              )}
            />
          </div>
          <div className='flex-grow ml-2 mb-5 w-full sm:w-auto'>
            <div className='flex flex-row space-x-2 font-medium'>
              <label htmlFor='city'><span className='text-red-500'>*</span>Municipio</label>
            </div>
            <Field
              name='city'
              onTouch={() => setTouched({ ...touched, city: true })}
              children={({ field }) => (
                <MunicipalityDropdown
                  {...field}
                  country={values.country}
                  region={values.state}
                  value={values.city}
                  className={`w-full p-2 rounded-sm h-10 ${(values.city === initialValues.city && !touched.city) ? '' : (errors.city && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                  onChange={(v) => setFieldValue(field.name, v)}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const IdentificationDocument = ({ values, initialValues, touched, errors, setFieldValue, setTouched }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2'>
        <p className='font-semibold text-2xl'>Identificación</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='identificationDocument'><span className='text-red-500'>*</span>Documento de Identificación</label>
            {(values.identificationDocument === initialValues.identificationDocument && !touched.identificationDocument) ? null : (errors.identificationDocument ? (<div className='text-red-500'>{errors.identificationDocument}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='identificationDocument' type='text'
            placeholder={!touched.identificationDocument ? '0501983484839' : '0501983484839'}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.identificationDocument === initialValues.identificationDocument && !touched.identificationDocument) ? '' : (errors.identificationDocument && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='identificationDocumentType'><span className='text-red-500'>*</span>Tipo de Documento de Identificación</label>
            {(values.identificationDocumentType === initialValues.identificationDocumentType && !touched.identificationDocumentType) ? null : (errors.identificationDocumentType ? (<div className='text-red-500'>{errors.identificationDocumentType}</div>) : <FcCheckmark />)}
          </div>
          <Field name='identificationDocumentType'
            className={`min-w-full p-2 rounded-sm h-10 ${(values.identificationDocumentType === initialValues.identificationDocumentType && !touched.identificationDocumentType) ? '' : (errors.identificationDocumentType && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
            children={({ field }) => (
              <select name='identificationDocumentType' id='identificationDocumentType'
                className={`min-w-full rounded-sm h-10 ${(values.identificationDocumentType === initialValues.identificationDocumentType && !touched.identificationDocumentType) ? '' : (errors.identificationDocumentType && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                onChange={v => {
                  setFieldValue(field.name, v.target.value);
                }}
                onBlur={() => setTouched({ ...touched, identificationDocumentType: true })}
              >
                <option value=''>Seleccione el tipo de ID</option>
                <option value='Cédula de Identidad'>Cédula de Identidad</option>
                <option value='Pasaporte'>Pasaporte</option>
              </select>
            )}
          />
        </div>
      </div>
    </div>
  )
}

const Contact = ({ values, initialValues, touched, errors }) => {
  return (
    <div>
      <div className='w-11/12 justify-self-center self-center mb-2'>
        <p className='font-semibold text-2xl'>Contacto</p>
      </div>
      <div className='flex flex-wrap mx-2 justify-evenly self-center'>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='cellphoneNumber'><span className='text-red-500'>*</span>Número de celular</label>
            {(values.cellphoneNumber === initialValues.cellphoneNumber && !touched.cellphoneNumber) ? null : (errors.cellphoneNumber ? (<div className='text-red-500'>{errors.cellphoneNumber}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='cellphoneNumber' type='tel'
            placeholder={!touched.cellphoneNumber ? '98190572' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.cellphoneNumber === initialValues.cellphoneNumber && !touched.cellphoneNumber) ? '' : (errors.cellphoneNumber && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='telephoneNumber'><span className='text-red-500'>*</span>Teléfono de casa</label>
            {(values.telephoneNumber === initialValues.telephoneNumber && !touched.telephoneNumber) ? null : (errors.telephoneNumber ? (<div className='text-red-500'>{errors.telephoneNumber}</div>) : <FcCheckmark />)}
          </div>
          <Field
            name='telephoneNumber' type='tel'
            placeholder={!touched.telephoneNumber ? '25029039' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.telephoneNumber === initialValues.telephoneNumber && !touched.telephoneNumber) ? '' : (errors.telephoneNumber && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
        <div className='flex-grow ml-2 mb-5 2xl:w-64 w-64'>
          <div className='flex flex-row space-x-2 font-medium'>
            <label htmlFor='faxNumber'>Número de fax</label>
            {(values.faxNumber === initialValues.faxNumber && !touched.faxNumber) ? null : (errors.faxNumber ? (<div className='text-red-500'>{errors.faxNumber}</div>) : values.faxNumber?.length > 0 && <FcCheckmark />)}
          </div>
          <Field
            name='faxNumber' type='tel'
            placeholder={!touched.faxNumber ? '22903902' : ''}
            className={`min-w-full p-2 rounded-sm h-10 ${(values.faxNumber === initialValues.faxNumber && !touched.faxNumber) ? '' : (errors.faxNumber && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
            style={{ outline: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}