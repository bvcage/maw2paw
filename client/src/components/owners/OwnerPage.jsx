import React, { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import PetOwnerForm from '../petowners/PetOwnerForm'
import OwnerForm from './OwnerForm'
import OwnerSummary from './OwnerSummary'

function OwnerPage (props) {

   const { onEditOwner, onNewPet } = props

   const [owner, setOwner] = useState({})
   const params = useParams()

   useEffect(() => {
      fetch(`/owners/${params.id}`).then(r=>r.json()).then(setOwner)
   }, [params])

   function handleEditOwner (edits) {
      setOwner(edits)
      onEditOwner(edits)
   }

   function handleNewPetForOwner (newPet, isNew = true) {
      const edits = {...owner,
         pets: [...owner.pets, newPet]
      }
      setOwner(edits)
      onEditOwner(edits)
      if (isNew) onNewPet(newPet, false)
   }
   
   return (
      <Routes>
         <Route index element={<OwnerSummary owner={owner} />} />
         <Route path="edit" element={<OwnerForm owner={owner} onEditOwner={handleEditOwner} />} />
         <Route path="pets" element={<PetOwnerForm owner={owner} onNewPetForOwner={handleNewPetForOwner} />} />
      </Routes>
   )
}

export default OwnerPage