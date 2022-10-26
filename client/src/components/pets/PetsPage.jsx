import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PetForm from './PetForm'
import PetPage from './PetPage'
import PetsList from './PetsList'

function PetsPage (props) {

   const { onNewPet, owners, pets } = props

   return (
      <Routes>
         <Route index element={<PetsList pets={pets} />} />
         <Route path="new" element={<PetForm onNewPet={onNewPet} />} />
         <Route path=":id/*" element={<PetPage />} />
      </Routes>
   )
}

export default PetsPage