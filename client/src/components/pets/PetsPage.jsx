import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PetForm from './PetForm'
import PetPage from './PetPage'
import PetsList from './PetsList'
import PetsTable from './PetsTable'

function PetsPage (props) {

   const { pets, onEditPet, onNewPet } = props

   return (
      <div className='page-content'>
         <Routes>
            <Route index element={<PetsList pets={pets} />} />
            <Route path="all" element={<PetsTable pets={pets} />} />
            <Route path="new" element={<PetForm onNewPet={onNewPet} />} />
            <Route path=":id/*" element={<PetPage onEditPet={onEditPet} />} />
         </Routes>
      </div>
   )
}

export default PetsPage