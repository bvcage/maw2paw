import React, { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import PetForm from './PetForm'
import PetSummary from './PetSummary'

function PetPage (props) {
   const { onEditPet } = props

   const [pet, setPet] = useState({})
   const params = useParams()
   useEffect(() => {
      fetch(`/pets/${params.id}`).then(r=>r.json()).then(setPet)
   }, [params])

   function handleEditPet (edits) {
      setPet(edits)
      onEditPet(edits)
   }

   return (
      <Routes>
         <Route index element={<PetSummary pet={pet} />} />
         <Route path="edit" element={<PetForm pet={pet} onEditPet={handleEditPet} />} />
      </Routes>
   )
}

export default PetPage