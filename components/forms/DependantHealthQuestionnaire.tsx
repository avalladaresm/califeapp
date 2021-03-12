import Table from '../Table'

const DependantHealthQuestionnaire = () => {
  const questions = [
    { yes: 0, no: 0, question: 'Pérdida parcial o total del conocimiento, de la fuerza muscular o de la sensibilidad en alguna parte del cuerpo, dolor de cabeza severa o neuralgia, convulsiones u otros trastornos nerviosos o mentales.' },
    { yes: 0, no: 0, question: 'Defectos en la visión uso de lentes, dolor ocular.' },
    { yes: 0, no: 0, question: 'Defectos en la audición, vértigo.' },
    { yes: 0, no: 0, question: 'Rinitis u otras alteraciones nasales.' },
    { yes: 0, no: 0, question: 'Ronquera persistente, amigdalitis a repetición.' },
    { yes: 0, no: 0, question: 'Masas o tumoraciones en el cuello.' },
    { yes: 0, no: 0, question: 'Tos con flema por más de dos semanas, flema con sangre, sensación de falta de aire, asma, bronquitis efisema, tuberculosis, pleurasia.' },
    { yes: 0, no: 0, question: 'Dolor en el pecho, palpitaciones anormales, inflamación en los pies, presión arterial alta o baja, infarto cardíaco, soplos, alteraciones en las venas, periféricaso, o arterias.' },
    { yes: 0, no: 0, question: 'Ardor de estómago crónico, vómitos persistentes o con sangre, sangrado rectal, úlceras, cálculos en la vesícula, estreñimiento o diarrea crónica, diverticulitis, hemorroides, hepatitis u otros trastornos del hígado.' },
    { yes: 0, no: 0, question: 'Dificultad para la micción u otras alteraciones urinarias, nefritis, cálculos renales, infecciones urinarias a repetición.' },
    { yes: 0, no: 0, question: 'Dolor o inflamación en una o varias articulaciones, alteraciones en la columna vertebral, alteraciones óseas o musculares.' },
    { yes: 0, no: 0, question: 'Alteraciones en la piel, tumoraciones o ulceraciones.' },
    { yes: 0, no: 0, question: 'Aumento de tamaño de ganglios en el cuello, axilas, ingles o brazo.' },
    { yes: 0, no: 0, question: 'Anemias, sangrados o infecciones a repetición.' },
    { yes: 0, no: 0, question: 'Alergias, inmunodeficiencias adquiridas o congénitas' },
    { yes: 0, no: 0, question: 'Diábetes, alteraciones en tiroides, elevación de niveles de colesterol y/o triglicéridos.' },
    { yes: 0, no: 0, question: 'Alteraciones en el aparato reproductor; útero, ovarios y testiculos.' },
    { yes: 0, no: 0, question: 'Ha tenido otra enfermedad que no haya sido mencionada.' },
    { yes: 0, no: 0, question: 'Ha sido intervenido (a) quirurgicamente.' },
    { yes: 0, no: 0, question: 'Ha sufrido un traumatismo importante por el que haya requerido tratamiento.' },
    { yes: 0, no: 0, question: 'Ha sido hospitalizado (a) por razones de diagnóstico o tratamiento.' },
    { yes: 0, no: 0, question: 'Ha usado barbitúricos, anfetaminas, alucinógenos o narcóticos.' },
    { yes: 0, no: 0, question: 'Ingiere alcohol.' },
    { yes: 0, no: 0, question: 'Es fumador (a).' },
    { yes: 0, no: 0, question: 'Padece de alguna enfermedad congénita y/o hereditaria.' },
    { yes: 0, no: 0, question: 'Ha tenido alteraciones en la menstruación o en los senos.' },
    { yes: 0, no: 0, question: 'Problemas en el embarazo, cesáreas o abortos.' },
    { yes: 0, no: 0, question: 'Se encuentra embarazada actualmente.' },
    { yes: 0, no: 0, question: 'Se ha realizado citología vaginal en los últimos 6 meses.' },
    { yes: 0, no: 0, question: 'Se ha realizado mamografía alguna vez.' },
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
            <input type='radio' name={`dquestionnaire${cell.row.id}`} />
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
            <input type='radio' name={`dquestionnaire${cell.row.id}`} />
          </div>
        )
      }
    },
  ]

  return (
    <div className='p-4 w-full h-auto'>
      <div className=''>
        <Table columns={columns} data={questions} />
      </div>
    </div>
  )
}

export default DependantHealthQuestionnaire