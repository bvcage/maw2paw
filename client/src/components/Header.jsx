import React from 'react'
import NavBar from './NavBar'

function Header (props) {
   const { onLogout } = props
   return (
      <NavBar onLogout={onLogout} />
   )
}

export default Header