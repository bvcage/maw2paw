import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NewPetForm from './NewPetForm'
import PetsList from './PetsList'

function PetsPage (props) {

   const [pets, setPets] = useState([])

   useEffect(() => {
      fetch('/pets').then(r=>r.json()).then(data=>setPets(data))
   }, [])

   return (
      <Routes>
         <Route index element={<PetsList pets={pets} />} />
         <Route path="new" element={<NewPetForm />} />
      </Routes>
   )
}

export default PetsPage