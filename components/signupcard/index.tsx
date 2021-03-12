import React, { FC, useState } from 'react'
import { LoginSettings } from '../logincard/LoginSettings'
import { useRouter } from 'next/router'
import { object, string, date } from 'yup'
import { Field, Formik } from 'formik'
import { FcCheckmark } from 'react-icons/fc'
import { AccountSignUp } from '../../pages/auth/AuthModel'
import { CountryDropdown } from 'react-country-region-selector'
import PhoneInput from 'react-phone-number-input'
import { subYears } from 'date-fns';
import { store } from "react-notifications-component"
import { signup } from '../../pages/auth/AuthService'

interface OptionType {
  label: string
  value: number | string
}

export const SignupCard: FC<LoginSettings> = () => {
  const [_selectedDob, _setSelectedDob] = useState<Date>();
  const router = useRouter();

  const SignupSchema = object().shape({
    name: string()
      .min(2, 'Muy corto!')
      .max(255, 'Muy largo!')
      .required('Requerido!'),
    phoneNumber: string()
      .min(8, 'Muy corto!')
      .max(25, 'Muy largo!')
      .required('Requerido!'),
    dob: date()
      .max(subYears(new Date(), 18), 'Tienes que tener al menos 18 años de edad!')
      .required('Requerido!'),
    country: string()
      .required('Requerido!'),
    email: string().
      email('Correo inválido').required('Requerido!'),
    password: string()
      .min(8, 'Contraseña muy corta!')
      .required('Requerido!')
  });

  const initialValues: AccountSignUp = {
    name: '',
    phoneNumber: '',
    dob: new Date(),
    country: '',
    email: '',
    password: '',
  }

  return (
    <div className='w-112 h-auto place-self-center rounded-sm bg-white border border-blueGray-200 px-7 py-7 space-y-3'>
      <div className='flex flex-col space-y-3'>
        <p className='font-sans font-semibold text-xl'>
          Registro
			  </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            const res = await signup(values)
            if (res.status === 200) {
              store.addNotification({
                message: 'Registro exitoso! Ahora puedes ingresar a tu cuenta.',
                type: 'success',
                insert: 'bottom',
                container: 'top-center',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: { duration: 5000 }
              });
            }
            router.push('/auth/login')
          }
          catch (e) {
            store.addNotification({
              message: `Registro fallido! ${e.response.data.message}`,
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
        {({ errors, touched, initialValues, values, handleSubmit, isSubmitting, setFieldValue, setTouched }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col space-y-5 '>
              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='name'><span className='text-red-500'>*</span>Nombre</label>
                  {(values.name === initialValues.name && !touched.name) ? null : (errors.name ? (<div className='text-red-500'>{errors.name}</div>) : <FcCheckmark />)}
                </div>
                <Field
                  name='name' type='text'
                  placeholder={!touched.name ? 'Pedro Pascal' : ''}
                  className={`w-full p-2 rounded-sm h-10 ${(values.name === initialValues.name && !touched.name) ? '' : (errors.name && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='phoneNumber'><span className='text-red-500'>*</span>Número de teléfono</label>
                  {(values.phoneNumber === initialValues.phoneNumber && !touched.phoneNumber) ? null : (errors.phoneNumber ? (<div className='text-red-500'>{errors.phoneNumber}</div>) : <FcCheckmark />)}
                </div>
                <Field
                  name='phoneNumber' type='tel'
                  className={`PhoneInputInput w-full p-2 rounded-sm h-10 ${(values.phoneNumber === initialValues.phoneNumber && !touched.phoneNumber) ? '' : (errors.phoneNumber && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                  style={{ outline: 'none' }}
                  children={({ field }) => (
                    <PhoneInput
                      {...field}
                      placeholder='9900-0000'
                      value={values.phoneNumber}
                      onChange={(v) => {
                        setFieldValue(field.name, v)
                      }}
                      defaultCountry='HN'
                    />
                  )}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='dob'><span className='text-red-500'>*</span>Fecha de nacimiento</label>
                  {(values.dob === initialValues.dob && !touched.dob) ? null : (errors.dob ? (<div className='text-red-500'>{errors.dob}</div>) : <FcCheckmark />)}
                </div>
                <Field
                  name='dob' type='date'
                  placeholder={!touched.dob ? 'Ramirez' : ''}
                  className={`w-full p-2 rounded-sm h-10 ${(values.dob === initialValues.dob && !touched.dob) ? '' : (errors.dob && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                  style={{ outline: 'none' }}
                  onChange={(e) => {
                    setFieldValue('dob', e.target.value)
                    _setSelectedDob(e.target.value)
                  }}
                  value={_selectedDob}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='country'><span className='text-red-500'>*</span>País</label>
                  {(values.country === initialValues.country && !touched.country) ? null : (errors.country ? (<div className='text-red-500'>{errors.country}</div>) : <FcCheckmark />)}
                </div>
                <Field
                  name='country'
                  children={({ field }) => (
                    <CountryDropdown
                      {...field}
                      value={values.country}
                      onChange={(v: OptionType) => {
                        setFieldValue(field.name, v);
                      }}
                      priorityOptions={['HN', 'US']}
                      className={`w-full p-2 rounded-sm h-10 ${(values.country === initialValues.country && !touched.country) ? '' : (errors.country && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                      onBlur={() => setTouched({ ...touched, country: true })}
                      defaultOptionLabel='Selecciona un país'
                    />
                  )}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='email'><span className='text-red-500'>*</span>Correo electrónico</label>
                  {(values.email === initialValues.email && !touched.email) ? null : (errors.email ? (<div className='text-red-500'>{errors.email}</div>) : <FcCheckmark />)}
                </div>
                <Field
                  name='email' type='email'
                  placeholder={!touched.email ? 'pramirez_01@gmail.com' : ''}
                  className={`w-full p-2 rounded-sm h-10 ${(values.email === initialValues.email && !touched.email) ? '' : (errors.email && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='password'><span className='text-red-500'>*</span>Contraseña</label>
                  {(values.password === initialValues.password && !touched.password) ? null : (errors.password ? (<div className='text-red-500'>{errors.password}</div>) : <FcCheckmark />)}
                </div>
                <Field
                  name='password' type='password'
                  placeholder={!touched.password ? '********' : ''}
                  className={`w-full p-2 rounded-sm h-10 ${(values.password === initialValues.password && !touched.password) ? null : (errors.password && 'ring-1 focus:ring-1 ring-red-500 focus:ring-red-500')}`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-6/12 space-y-3 pt-3'>
                {isSubmitting ?
                  <button disabled type='button' className='h-12 rounded-md bg-blueGray-400 text-md font-semibold disabled:opacity-75 text-coolGray-50 flex flex-row justify-center items-center cursor-wait'>
                    procesando...
      						</button> :
                  <button type='submit' style={{ backgroundColor: '#09dca4' }} className='h-12 rounded-md flex flex-row justify-center items-center'>
                    <div className='text-xl text-white font-semibold'>
                      Registrarse
                    </div>
                  </button>
                }
              </div>
            </div>
          </form>
        )}

      </Formik>
      <div className='flex align-middle justify-center'>
        ¿Ya tienes una cuenta? <a onClick={() => router.push('/auth/login')} style={{ color: '#09dca4' }} className='pl-1 hover:underline cursor-pointer'>Inicia sesión</a>
      </div>
    </div>
  )
}