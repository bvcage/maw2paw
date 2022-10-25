import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'

function Dashboard (props) {
   const { onLogout, user } = props

   const navigate = useNavigate()

   useEffect(() => {
      if (!user) { navigate('/') }
   }, [])

   return (<>
      <Header onLogout={onLogout} />
      <Outlet />
   </>)
}

export default Dashboard