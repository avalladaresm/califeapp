const PlanDescription = (props) => {

  const description = [
    {
      header: 'Cobertura',
      data: [`L. ${props.planDescription?.coverage.toLocaleString('en-US')}`]
    }, {
      header: 'Maternidad',
      data: [
        `Precio: L. ${props.planDescription?.maternityPrice.toLocaleString('en-US')}`,
        `Cobertura por cesárea: L. ${props.planDescription?.maternityCesareaCober.toLocaleString('en-US')}`,
        `Cobertura por parto: L. ${props.planDescription?.maternityPartoCober.toLocaleString('en-US')}`
      ]
    }, {
      header: 'Beneficios',
      data: [
        props.planDescription?.notesRTFBenefits
      ]
    }

  ]

  return (
    <div className='bg-white overflow-hidden sm:rounded-sm border border-gray-300'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-xl font-medium'>
          Información del Plan
        </h3>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          {description.map((d, i) => (
            <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <dt className='text-base font-medium'>
                {d.header}
              </dt>
              <dd className='flex flex-row text-base sm:mt-0 sm:col-span-2 space-x-7'>
                {d.data.map((dd, j) => <div>{dd}</div>)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default PlanDescription