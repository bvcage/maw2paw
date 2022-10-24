import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

function App() {
   const [user, setUser] = useState()
   const navigate = useNavigate()

   useEffect(() => {
      fetch('/me').then(r=>{
         if (r.ok) {
            r.json().then(user => {
               setUser(user)
               // navigate('/main')
            })
         } else {
            console.log(r)
         }
      })
   }, [])

   function onLogin (user) {
      setUser(user)
      // navigate('/main')
   }

   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={onLogin} />} />
         </Routes>
      </div>
   )
}

export default App