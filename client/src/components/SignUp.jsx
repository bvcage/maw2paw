import React, { useState } from 'react'

function SignUp (props) {
   const { onSignup } = props

   const [confirmation, setConfirmation] = useState("")
   const [password, setPassword] = useState("")
   const [username, setUsername] = useState("")

   function handleSubmit (e) {
      e.preventDefault()
      fetch('/users', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "username": username,
            "password": password,
            "password_confirmation": confirmation
         })
      }).then(r => {
         if (r.ok) {
            r.json().then(user => onSignup(user))
         } else {
            console.log(r)
         }
      })
   }

   return (
      <form onSubmit={handleSubmit}>
         <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
         />
         <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <input
            name="confirmation"
            type="password"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
         />
         <button type="submit">sign-up</button>
      </form>
   )
}

export default SignUp