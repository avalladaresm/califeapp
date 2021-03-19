import { useState } from 'react';

const Tabs = (props) => {
  const [_activeTab, _setActiveTab] = useState<number>(0);

  return (
    <div className='flex flex-col h-auto rounded-sm border border-blueGray-300 max-w-8xl'>
      <div className='bg-white border-b border-gray-300'>
        <nav className='flex flex-col sm:flex-row'>
          {props.tabs.map((t, i) => {
            return (
              <div
                className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none cursor-pointer ${_activeTab === i && 'text-blue-500 border-b-2 font-medium border-blue-500 bg-gray-100 shadow-inner'}`}
                onClick={() => _setActiveTab(i)}
              >
                {t.tabeName}
              </div>
            )
          })}
        </nav>
      </div>
      <div className='h-auto p-6'>
        {props.tabs[_activeTab].children}
      </div>
    </div>
  )
}

export default Tabs