import React, { useState } from 'react'

function Login (props) {
   const { onLogin } = props

   const [errors, setErrors] = useState([])
   const [password, setPassword] = useState("")
   const [username, setUsername] = useState("")

   function handleSubmit (e) {
      e.preventDefault()
      if (!username || !password) { return }
      fetch('/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "username": username,
            "password": password
         })
      }).then(r=>{
         if (r.ok) {
            r.json().then(user => onLogin(user))
         } else {
            switch (r.status) {
               case 404:
                  // ask if wants to sign up
                  break;
               case 401:
                  // 3 tries to login
                  break;
               default:
                  r.json.then(err => setErrors(Object.entries(err.error).flat()))
                  break;
            }
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
         <button type="submit">login</button>
      </form>
   )
}

export default Login