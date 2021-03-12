import Table from '../Table'

const PeopleAged50Exams = () => {
  const exams = [
    {
      category: 'Hematología y Coagulación',
      exams: {
        examName: [
          'Hemograma Completo',
          'Eritrosedimentación (VES)',
        ]
      }
    },
    {
      category: 'Química Sanguínea',
      exams: {
        examName: [
          'Glucosa en Ayunas',
          'Urea Nitrogenada (BUN)',
          'Creatinina',
          'Ácido Úrico',
          'Triglicéridos',
          'Colesterol Total',
          'Colesterol HDL',
          'Colesterol LDL',
          'T.S.G.O',
          'T.S.G.P'
        ]
      }
    },
    {
      category: 'Uroanálisis',
      exams: {
        examName: [
          'General de Orina',
        ]
      }
    },
    {
      category: 'Marcadores Tumorales',
      exams: {
        examName: [
          'Antígeno Prostático Específico (PSA)'
        ]
      }
    },
    {
      category: 'Hormonas',
      exams: {
        examName: []
      }

    },
  ]

  const columns = [
    {
      id: 'number',
      accessor: 'number',
      Header: '#',
      Cell: ({ cell }) => {
        const questionNumber = Number(cell.row.id) + 1
        return (
          <div> {questionNumber} </div>
        )
      }
    },
    {
      id: 'question',
      accessor: 'question',
      Header: 'Pregunta'
    },
    {
      id: 'yes',
      accessor: 'yes',
      Header: 'Sí',
      Cell: ({ cell }) => {
        return (
          <div className='flex flex-row'>
            <input type='radio' name={`questionnaire${cell.row.id}`} />
          </div>
        )
      }
    },
    {
      id: 'no',
      accessor: 'no',
      Header: 'No',
      Cell: ({ cell }) => {
        return (
          <div className='flex flex-row'>
            <input type='radio' name={`questionnaire${cell.row.id}`} />
          </div>
        )
      }
    },
  ]

  return (
    <div className='p-4 w-full h-auto'>
      <div className='space-y-5'>
        {exams.map((e, i) => {
          return (
            <div>
              <div className='text-xl font-medium'>
                {e.category}
              </div>
              <div className='flex flex-col'>
                {e.exams.examName.map((en, j) => (
                  <div className='ml-3 space-x-2'>
                    <input type='checkbox' name={e.category} id={en} />
                    <label htmlFor={en}>{en}</label>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PeopleAged50Exams