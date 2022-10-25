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
         <div className="form-floating">
            <input
               name="username"
               type="text"
               className="form-control"
               placeholder="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            <label>username</label>
         </div>
         <div className="form-floating">
            <input
               name="password"
               type="password"
               className="form-control"
               placeholder="username"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <label>password</label>
         </div>
         <div className="form-floating">
            <input
               name="confirmation"
               type="password"
               className="form-control"
               placeholder="username"
               value={confirmation}
               onChange={(e) => setConfirmation(e.target.value)}
            />
            <label>confirm password</label>
         </div>
         <button type="submit">sign-up</button>
      </form>
   )
}

export default SignUp