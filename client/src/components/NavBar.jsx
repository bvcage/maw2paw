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

   function handleNav (eleId, path) {
      document.getElementById(eleId).classList.remove("show")
      navigate(path)
   }

   function toggleDropdown (eleId) {
      document.getElementById(eleId).classList.toggle("show")
   }

   return (
      <nav className="navbar">

         <div className="navbar-cell">
            <button className="navbar-button" onClick={() => navigate("dashboard")}>dashboard</button>
         </div>

         <div className="navbar-cell">
            <div className="dropdown navbar-button">
               <div className='dropdown-button'>owners</div>
               <div id='navOwnersDropdown' className='dropdown-content'>
                  <div className='dropdown-button' onClick={() => handleNav("navOwnersDropdown", "owners/new")}>new owner</div>
                  <div className='dropdown-button' onClick={() => handleNav("navOwnersDropdown", "owners")}>view all</div>
               </div>
            </div>
         </div>

         <div className="navbar-cell">
            <div className="dropdown navbar-button">
               <div className='dropdown-button' onClick={() => toggleDropdown('navPetsDropdown')}>pets</div>
               <div id='navPetsDropdown' className='dropdown-content'>
                  <div className='dropdown-button' onClick={(e) => handleNav("navPetsDropdown", "pets/new")}>new pet</div>
                  <div className='dropdown-button' onClick={(e) => handleNav("navPetsDropdown", "pets")}>view all</div>
               </div>
            </div>
         </div>

         <div className="navbar-cell">
            <div className="dropdown navbar-button">
               <div className='dropdown-button' onClick={() => toggleDropdown('navVisitsDropdown')}>visits</div>
               <div id='navVisitsDropdown' className='dropdown-content'>
                  <div className='dropdown-button' onClick={(e) => handleNav("navVisitsDropdown", "visits")}>today's visits</div>
                  <div className='dropdown-button' onClick={(e) => handleNav("navVisitsDropdown", "visits/new")}>new visit</div>
                  <div className='dropdown-button' onClick={(e) => handleNav("navVisitsDropdown", "visits/all")}>view all</div>
               </div>
            </div>
         </div>

         <div className="navbar-cell">
            <button type="navbar-button" onClick={() => handleLogout()}>logout</button>
         </div>
      </nav>
   )
}

export default NavBar