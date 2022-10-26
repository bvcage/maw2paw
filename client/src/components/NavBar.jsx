import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function NavBar (props) {
   const { onLogout } = props

   const location = useLocation()

   function handleLogout () {
      fetch('/logout', {
         method: 'DELETE'
      }).then(onLogout)
   }

   return (
      <nav className="navbar">
         <Link to="dashboard">dashboard</Link>
         <Link to="owners">owners</Link>
         <Link to="owners/new">new owner</Link>
         <Link to="pets">pets</Link>
         <Link to="pets/new">new pet</Link>
         <Link to="visits">today's visits</Link>
         <Link to="visits/new">new visit</Link>
         <button type="button" onClick={() => handleLogout()}>logout</button>
      </nav>
   )
}

export default NavBar