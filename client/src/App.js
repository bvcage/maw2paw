import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Login from './components/Login'
import Main from './components/Main'

function App () {
   const [user, setUser] = useState()
   const navigate = useNavigate()

   useEffect(() => {
      fetch('/me').then(r=>{
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

   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route element={<Main onLogout={onLogout} />}>
               <Route path="/dash" element={<Dashboard user={user} />} />
            </Route>
         </Routes>
      </div>
   )
}

export default App