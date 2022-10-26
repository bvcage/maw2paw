import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NewPetForm from './NewPetForm'
import PetProfile from './PetProfile'
import PetsList from './PetsList'

function PetsPage (props) {

   const { onNewPet, owners, pets } = props

   const [breeds, setBreeds] = useState({})

   useEffect(() => {
      fetch('/pets/breeds').then(r=>r.json()).then(setBreeds)
   }, [])

   return (
      <Routes>
         <Route index element={<PetsList pets={pets} />} />
         <Route path="new"
            element={<NewPetForm
               onNewPet={onNewPet}
               breeds={breeds} />} />
         <Route path=":id" element={<PetProfile pets={pets} />} />
      </Routes>
   )
}

export default PetsPage