import React, { useState } from 'react'

function Login (props) {
   const { onLogin } = props

   const [username, setUsername] = useState("")

   function handleChange (e) {
      setUsername(e.target.value)
   }

   function handleSubmit (e) {
      e.preventDefault()
      fetch('/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "username": username
         })
      }).then(r=>r.json())
      .then(user => onLogin(user))
   }

   return (
      <form onSubmit={handleSubmit}>
         <input type="text" value={username} onChange={handleChange} />
         <button type="submit">login</button>
      </form>
   )
}

export default Login