import FeatherIcon from 'feather-icons-react';
import { useEffect, useState } from 'react';

const Button = (props) => {
  const [_icon, _setIcon] = useState<string>('plus')

  useEffect(() => {
    switch (props.type) {
      case 'create':
        _setIcon('plus')
        break
      case 'edit':
        _setIcon('edit')
        break
      case 'disable':
        _setIcon('minus-square')
        break
      default:
        _setIcon('plus')
    }

  })

  return (
    <div
      style={{ backgroundColor: `${props.type === 'create' ? '#00d0f1' : (props.type === 'edit' ? 'lightGray' : (props.type === 'disable' && 'red'))}` }}
      className={`px-2 py-1 rounded-md text-white cursor-pointer`}
    >
      <div className='flex flex-row space-x-2'>
        <div className='self-center'>
          <FeatherIcon icon={_icon} size={16} />
        </div>
        <div>
          {props.title}
        </div>

      </div>
    </div>
  )
}

export default Button