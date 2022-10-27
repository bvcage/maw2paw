import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar (props) {
   const { onLogout } = props

   const navigate = useNavigate()

   function handleLogout () {
      fetch('/logout', {
         method: 'DELETE'
      }).then(onLogout)
   }

   return (
      <nav className="navbar">
         <button onClick={() => navigate("dashboard")}>dashboard</button>
         <button onClick={() => navigate("owners")}>owners</button>
         <button onClick={() => navigate("owners/new")}>new owner</button>
         <button onClick={() => navigate("pets")}>pets</button>
         <button onClick={() => navigate("pets/new")}>new pet</button>
         <button onClick={() => navigate("visits")}>today's visits</button>
         <button onClick={() => navigate("visits/new")}>new visit</button>
         <button type="button" onClick={() => handleLogout()}>logout</button>
      </nav>
   )
}

export default NavBar