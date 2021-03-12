const PlanDescription = (props) => {

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium">
          Información del Plan
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">
              Cobertura
            </dt>
            <dd className="text-sm sm:mt-0 sm:col-span-2">
              L. {props.planDescription?.coverage.toLocaleString('en-US')}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">
              Maternidad
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <ul>
                <li>Precio: {props.planDescription?.maternityPrice.toLocaleString('en-US')}</li>
                <li>Cobertura por cesárea: {props.planDescription?.maternityCesareaCober.toLocaleString('en-US')}</li>
                <li>Cobertura por parto: {props.planDescription?.maternityPartoCober.toLocaleString('en-US')}</li>
              </ul>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">
              Beneficios
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              {props.planDescription?.notesRTFBenefits}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default PlanDescription