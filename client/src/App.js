import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App () {
   const [user, setUser] = useState(null)
   const navigate = useNavigate()

   useEffect(() => {
      fetch('/auth').then(r=>{
         if (r.ok) {
            r.json().then(user => {
               setUser(user)
               navigate('/dashboard')
            })
         }
      })
   }, [])

   function onLogin (user) {
      setUser(user)
      navigate('/dashboard')
   }

   function onLogout () {
      setUser(null)
      navigate('/')
   }

   function onSignup (user) {
      setUser(user)
      navigate('/dashboard')
   }

   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route path="/signup" element={<SignUp onSignup={onSignup} />} />
            <Route path="/dashboard" element={<Dashboard onLogout={onLogout} />}>
               
            </Route>
         </Routes>
      </div>
   )
}

export default App