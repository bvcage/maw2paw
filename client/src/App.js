import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import About from './components/About'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import './App.css'
import VisitsContainer from './components/visits/VisitsContainer'
import TemplateMain from './components/templates/TemplateMain'
import PetsPage from './components/pets/PetsPage'

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
            <Route path="main" element={<TemplateMain />}>
               <Route path="dashboard" element={<Dashboard onLogout={onLogout} user={user} />} />
               <Route path="pets/*" element={<PetsPage />} />
               <Route path="visits/*" element={<VisitsContainer />} />
            </Route>
         </Routes>
      </div>
   )
}

export default App