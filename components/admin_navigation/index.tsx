import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { LoggedInUser } from '../../pages/auth/AuthModel'
import { useAuth } from '../../pages/auth/AuthService'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import { Sidebar } from './Sidebar'

const MainContainer = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [_isMobile, _setIsMobile] = useState<boolean>(props._isMobile)

  const queryClient = useQueryClient()
  const auth: LoggedInUser = useAuth(queryClient)

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth >= 640 ? _setIsMobile(false) : _setIsMobile(true)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='flex flex-col place-content-between'>
      <Header collapsed={collapsed} isMobile={_isMobile} onClick={() => setCollapsed(!collapsed)} />
      <Content {...props} collapsed={collapsed}>
        {collapsed && <Sidebar {...props} onClick={() => setCollapsed(!collapsed)} />}
        {props.children}
      </Content>
      {!auth?.a_t && <Footer />}
    </div>
  )
}

export default MainContainer