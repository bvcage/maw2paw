import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from '../Header'
import Dashboard from '../Dashboard'
import OwnersPage from '../owners/OwnersPage'
import PetsPage from '../pets/PetsPage'
import VisitsPage from '../visits/VisitsPage'

function Main (props) {
   const { onLogout, user } = props

   const [owners, setOwners] = useState([])
   const [pets, setPets] = useState([])

   const navigate = useNavigate()

   useEffect(() => {
      fetch('/owners').then(r=>r.json()).then(setOwners)
      fetch('/pets').then(r=>r.json()).then(setPets)
   }, [])

   function onNewOwner (newOwner) {
      setOwners([...owners, newOwner])
      navigate(`owners/${newOwner.id}`)
   }

   function onNewPet (newPet) {
      setPets([...pets, newPet])
      navigate(`pets/${newPet.id}`)
   }

   return (<>
      <Header onLogout={onLogout} />
      <Routes>
         <Route path="dashboard" element={<Dashboard onLogout={onLogout} user={user} />} />
         <Route path="owners/*" element={<OwnersPage onNewOwner={onNewOwner} owners={owners} />} />
         <Route path="pets/*"
            element={<PetsPage
               onNewPet={onNewPet}
               owners={owners}
               pets={pets} />} />
         <Route path="visits/*" element={<VisitsPage owners={owners} pets={pets} />} />
      </Routes>
   </>)
}

export default Main