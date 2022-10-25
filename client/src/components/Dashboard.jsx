import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

function Dashboard (props) {
   const { onLogout } = props
   return (<>
      <Header onLogout={onLogout} />
      <Outlet />
   </>)
}

export default Dashboard