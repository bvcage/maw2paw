import React, { useState } from 'react'
import PetForm from '../pets/PetForm'
import PetsTable from '../pets/PetsTable'

function PetOwnerForm (props) {
   const { owner, pet, onNewPetForOwner } = props
   const [makeNew, setMakeNew] = useState(true)

   function handleNewPetForOwner (newPet, isNew) {
      if (!!owner) fetch('/pet_owners', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            pet_id: newPet.id,
            owner_id: owner.id
         })
      }).then(r=>{
         if (r.ok) r.json().then(() => onNewPetForOwner(newPet, isNew))
         else {
            r.json().then(console.log)
         }
      })
   }

   return (
      <div id="pet-owner-form-container">
         { makeNew ? <>
               <PetForm owner={owner} pet={pet} onNewPetForOwner={handleNewPetForOwner} />
               <div className='button' onClick={() => setMakeNew(false)}>link existing</div>
            </>
            : <div id="pets-table-container">
               <PetsTable onClick={handleNewPetForOwner} />
               </div> }
      </div>
   )
}

export default PetOwnerForm