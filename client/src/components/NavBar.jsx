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
         <Link to="../dash">dashboard</Link>
         <Link to="visits">today's visits</Link>
         <Link to="visits/new">new visit</Link>
         <button type="button" onClick={() => handleLogout()}>logout</button>
      </nav>
   )
}

export default NavBar