import React, { FC } from 'react'
import { LoginSettings } from '../logincard/LoginSettings'
import Spin from '../Spin'
import { TempLogo } from '../TempLogo'
import { useRouter } from 'next/router'
import { object, string, number } from 'yup'
import { Field, Formik } from 'formik'
import { FcCheckmark } from 'react-icons/fc'
import { AccountSignUp } from '../../pages/auth/AuthModel'
import { CountryDropdown } from 'react-country-region-selector'

interface OptionType {
  label: string
  value: number | string
}

export const SignupCard: FC<LoginSettings> = () => {
  const router = useRouter();

  const SignupSchema = object().shape({
    name: string()
      .min(2, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    surname: string()
      .min(2, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    username: string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    password: string()
      .min(8, '8 characters minimum')
      .max(255, 'Woah! Will you remember that???')
      .required('Required'),
    email: string().email('Invalid email').required('Required'),
    accountTypeId: number()
      .required('Required')
  });

  const initialValues: AccountSignUp = {
    firstname: '',
    surname: '',
    phoneNumber: '',
    dob: new Date(),
    country: '',
    email: '',
    password: '',
  }

  return (
    <div style={{ height: '42rem', backgroundColor: '#fff' }} className='w-96 place-self-center rounded-sm border border-blueGray-200 px-7 py-7 space-y-3'>
      <div className='flex flex-col space-y-3'>
        <p className='font-sans font-semibold text-xl'>
          Registro
			  </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            resetForm()
            console.log('exito', values)
          }
          catch (e) {
            console.log('error', e)
          }
        }}
      >
        {({ errors, touched, initialValues, values, handleSubmit, isSubmitting, setFieldValue, setTouched }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col space-y-2 '>
              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='name'><span className='text-red-600'>*</span>Name</label>
                  {(values.firstname === initialValues.firstname && !touched.firstname) ?
                    null :
                    (errors.firstname ? (
                      <div className='text-red-600'>{errors.firstname}</div>
                    ) :
                      <FcCheckmark />)
                  }
                </div>
                <Field
                  name='firstname'
                  placeholder={!touched.firstname ? 'Pedro' : ''}
                  className={`min-w-full ${(
                    values.firstname === initialValues.firstname && !touched.firstname
                  ) ? '' : (
                      errors.firstname ?
                        'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                        'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='surname'><span className='text-red-600'>*</span>Surname</label>
                  {(values.surname === initialValues.surname && !touched.surname) ?
                    null :
                    (errors.surname ? (
                      <div className='text-red-600'>{errors.surname}</div>
                    ) :
                      <FcCheckmark />)
                  }
                </div>
                <Field
                  name='surname'
                  placeholder={!touched.surname ? 'Ramirez' : ''}
                  className={`min-w-full ${(
                    values.surname === initialValues.surname && !touched.surname
                  ) ? '' : (
                      errors.surname ?
                        'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                        'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='phoneNumber'><span className='text-red-600'>*</span>Phone number</label>
                  {(values.phoneNumber === initialValues.phoneNumber && !touched.phoneNumber) ?
                    null :
                    (errors.phoneNumber ? (
                      <div className='text-red-600'>{errors.phoneNumber}</div>
                    ) :
                      <FcCheckmark />)
                  }
                </div>
                <Field
                  name='phoneNumber'
                  placeholder={!touched.phoneNumber ? '98302037' : ''}
                  className={`min-w-full ${(
                    values.phoneNumber === initialValues.phoneNumber && !touched.phoneNumber
                  ) ? '' : (
                      errors.phoneNumber ?
                        'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                        'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='dob'><span className='text-red-600'>*</span>Date of birth</label>
                  {(values.dob === initialValues.dob && !touched.dob) ?
                    null :
                    (errors.dob ? (
                      <div className='text-red-600'>{errors.dob}</div>
                    ) :
                      <FcCheckmark />)
                  }
                </div>
                <Field
                  name='dob'
                  placeholder={!touched.dob ? 'Ramirez' : ''}
                  className={`min-w-full ${(
                    values.dob === initialValues.dob && !touched.dob
                  ) ? '' : (
                      errors.dob ?
                        'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                        'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='country'><span className='text-red-600'>*</span>Country</label>
                  {(values.country === initialValues.country && !touched.country) ?
                    null :
                    (errors.country ? (
                      <div className='text-red-600'>{errors.country}</div>
                    ) :
                      <FcCheckmark />)
                  }
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
                      className={`min-w-full ${(
                        values.country === initialValues.country && !touched.country
                      ) ? '' : (
                          errors.country ?
                            'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                            'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                        )} text-center shadow-sm rounded-sm h-10`}
                      onBlur={() => setTouched({ ...touched, country: true })}
                    />
                  )}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='email'><span className='text-red-600'>*</span>Email</label>
                  {(values.email === initialValues.email && !touched.email) ?
                    null :
                    (errors.email ? (
                      <div className='text-red-600'>{errors.email}</div>
                    ) :
                      <FcCheckmark />)
                  }
                </div>
                <Field
                  name='email'
                  placeholder={!touched.email ? 'pramirez_01@gmail.com' : ''}
                  className={`min-w-full ${(
                    values.email === initialValues.email && !touched.email
                  ) ? '' : (
                      errors.email ?
                        'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                        'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-full'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='password'><span className='text-red-600'>*</span>Password</label>
                  {(values.password === initialValues.password && !touched.password) ?
                    null :
                    (errors.password ? (
                      <div className='text-red-600'>{errors.password}</div>
                    ) :
                      <FcCheckmark />)
                  }
                </div>
                <Field
                  name='password' type='password'
                  placeholder={!touched.password ? '************' : ''}
                  className={`min-w-full ${(
                    values.password === initialValues.password && !touched.password
                  ) ? '' : (
                      errors.password ?
                        'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                        'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-6/12 space-y-3 pt-3'>
                {isSubmitting ?
                  <button disabled type='button' className='h-12 rounded-md bg-blueGray-400 text-md font-semibold disabled:opacity-75 text-coolGray-50 flex flex-row justify-center items-center cursor-wait'>
                    <Spin /> procesando...
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
        Already have an account? <a onClick={() => router.push('/auth/login')} className='pl-1 text-blue-800 hover:text-blue-800 hover:underline'>Login</a>
      </div>
    </div>
  )
}