import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Login from './components/Login'
import Main from './components/Main'
import SignUp from './components/SignUp'

function App () {
   const [user, setUser] = useState()
   const navigate = useNavigate()

   useEffect(() => {
      fetch('/auth').then(r=>{
         if (r.ok) {
            r.json().then(user => {
               setUser(user)
               navigate('/dash')
            })
         }
      })
   }, [])

   function onLogin (user) {
      setUser(user)
      navigate('/dash')
   }

   function onLogout () {
      setUser(null)
      navigate('/')
   }

   function onSignup (user) {
      setUser(user)
      navigate('/dash')
   }

   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route path="/signup" element={<SignUp onSignup={onSignup} />} />
            <Route element={<Main onLogout={onLogout} />}>
               <Route path="/dash" element={<Dashboard user={user} />} />
            </Route>
         </Routes>
      </div>
   )
}

export default App