import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from '../Header'
import Dashboard from '../Dashboard'
import PetsPage from '../pets/PetsPage'
import VisitsContainer from '../visits/VisitsContainer'

function Main (props) {
   const { onLogout, user } = props

   const [owners, setOwners] = useState([])
   const [pets, setPets] = useState([])

   const navigate = useNavigate()

   useEffect(() => {
      fetch('/owners').then(r=>r.json()).then(setOwners)
      fetch('/pets').then(r=>r.json()).then(setPets)
   }, [])

   function onNewPet (newPet) {
      setPets([...pets, newPet])
      navigate('pets')
   }

   return (<>
      <Header onLogout={onLogout} />
      <Routes>
         <Route path="dashboard" element={<Dashboard onLogout={onLogout} user={user} />} />
         <Route path="pets/*"
            element={<PetsPage
               onNewPet={onNewPet}
               owners={owners}
               pets={pets} />} />
         <Route path="visits/*" element={<VisitsContainer owners={owners} pets={pets} />} />
      </Routes>
   </>)
}

export default Main