import React from 'react'
import PetCard from '../pets/PetCard'

function PetOwnerList (props) {
   const { owner } = props
   console.log(owner.pets)

   const cards = !!owner.pets ? 
      owner.pets.map(pet => {
         return (
            <PetCard key={pet.id} pet={pet} />
         )
      }) : null

   return (
      <div id="pet-owner-list-container">
         { !!owner ? <h2>{owner.full_name}'s Pets</h2> : null}
         <div id="pet-owner-list">
            { !!cards ? cards : "no relationships :("}
         </div>
      </div>
   )
}

export default PetOwnerList