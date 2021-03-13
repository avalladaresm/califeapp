import { Municipalities } from "../utils/Minucipalities"

interface MunicipalityDropdown {
  region: string
  municipalities: string[]
}

const MunicipalityDropdown = (props) => {
  const municipalities = Municipalities

  return (
    <select name='municipalities' id='municipalities' className={props.className}>
      {!props.region && !props.country ? <option value=''>-</option> :
        municipalities.filter(m => m.region === props.region)[0]?.municipalities.map(m => <option value={m}>{m}</option>)
      }
    </select>
  )
}

export default MunicipalityDropdown