import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login (props) {
   const { onLogin } = props

   const [errors, setErrors] = useState([])
   const [password, setPassword] = useState("")
   const [username, setUsername] = useState("")

   const navigate = useNavigate()

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
                  navigate('/signup')
                  break;
               case 401:
                  // 3 tries to login
                  break;
               default:
                  r.json().then(err => setErrors(Object.entries(err.error).flat()))
                  break;
            }
         }
      })
   }

   return (
      <div className='container'>
         <form className="login" onSubmit={handleSubmit}>
            <div className="form-floating form-input">
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
            <div className="form-floating form-input">
               <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <label>password</label>
            </div>
            <button type="submit">login</button>
         </form>
      </div>
   )
}

export default Login