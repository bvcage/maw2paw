import React from 'react'
import { Link } from 'react-router-dom'

function NavBar (props) {
   const { onLogout } = props

   function handleLogout () {
      fetch('/logout', {
         method: 'DELETE'
      }).then(onLogout)
   }

   return (
      <nav className="navbar">
         <Link to="../dash">DASH</Link>
         <Link to="visits">VISITS</Link>
         <button type="button" onClick={() => handleLogout()}>logout</button>
      </nav>
   )
}

export default NavBar