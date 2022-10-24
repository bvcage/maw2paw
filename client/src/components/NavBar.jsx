import React from 'react'

function NavBar (props) {
   const { onLogout } = props

   function handleLogout () {
      fetch('/logout', {
         method: 'DELETE'
      }).then(onLogout)
   }

   return (
      <button onClick={handleLogout}>logout</button>
   )
}

export default NavBar