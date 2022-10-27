import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from '../Header'
import Dashboard from '../Dashboard'
import OwnersPage from '../owners/OwnersPage'
import PetsPage from '../pets/PetsPage'
import VisitsPage from '../visits/VisitsPage'
import Footer from '../Footer'

function Main (props) {
   const { onLogout, user } = props

   const [owners, setOwners] = useState([])
   const [pets, setPets] = useState([])

   const navigate = useNavigate()

   useEffect(() => {
      fetch('/owners').then(r=>r.json()).then(setOwners)
      fetch('/pets').then(r=>r.json()).then(setPets)
   }, [])

   function onEditOwner (editOwner) {
      const update = owners.map(owner => {
         if (owner.id === editOwner.id) return editOwner
         return owner
      })
      setOwners(update)
      navigate(`owners/${editOwner.id}`)
   }

   function onEditPet (editPet) {
      const update = pets.map(pet => {
         if (pet.id === editPet.id) return editPet
         return pet
      })
      setPets(update)
      navigate(`pets/${editPet.id}`)
   }

   function onNewOwner (newOwner) {
      const update = [...owners, newOwner].sort((a,b) => {
         const aLast = a.last_name.toUpperCase()
         const bLast = b.last_name.toUpperCase()
         const aFirst = a.first_name.toUpperCase()
         const bFirst = b.first_name.toUpperCase()
         if (aLast < bLast) return -1
         if (aLast > bLast) return 1
         if (aFirst < bFirst) return -1
         if (aFirst > bFirst) return 1
         return 0
      })
      setOwners(update)
      navigate(`owners/${newOwner.id}`)
   }

   function onNewPet (newPet, redirect = true) {
      setPets([...pets, newPet].sort((a,b) => {
         const aName = a.name.toUpperCase()
         const bName = b.name.toUpperCase()
         if (aName < bName) return -1
         if (aName > bName) return 1
         return 0
      }))
      if (redirect) navigate(`pets/${newPet.id}`)
   }

   return (<div id="main-content" className='container'>
      <Header onLogout={onLogout} />
      <div id="page-container">
      <Routes>
         <Route path="dashboard" element={<Dashboard onLogout={onLogout} user={user} />} />
         <Route path="owners/*" element={<OwnersPage owners={owners} onEditOwner={onEditOwner} onNewOwner={onNewOwner} onNewPet={onNewPet}  />} />
         <Route path="pets/*"
            element={<PetsPage pets={pets}
               onEditPet={onEditPet}
               onNewPet={onNewPet} />} />
         <Route path="visits/*" element={<VisitsPage owners={owners} pets={pets} />} />
      </Routes>
      </div>
      <Footer />
   </div>)
}

export default Main