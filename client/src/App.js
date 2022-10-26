import './App.css'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Login from './components/Login'
import Main from './components/templates/Main'
import SignUp from './components/SignUp'

function App () {
   const [user, setUser] = useState(null)
   const navigate = useNavigate()

   useEffect(() => {
      fetch('/auth').then(r=>{
         if (r.ok) {
            r.json().then(user => {
               setUser(user)
            })
         }
      })
   }, [])

   function onLogin (user) {
      setUser(user)
      navigate('/main/dashboard')
   }

   function onLogout () {
      setUser(null)
      navigate('/')
   }

   function onSignup (user) {
      setUser(user)
      navigate('/main/dashboard')
   }

   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login onLogin={onLogin} />} />
            <Route path="signup" element={<SignUp onSignup={onSignup} />} />
            <Route path="main/*" element={<Main onLogout={onLogout} user={user} />} />
         </Routes>
      </div>
   )
}

export default App