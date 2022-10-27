import React from 'react'
import PetCard from './PetCard'

function PetsList (props) {
   const { pets } = props

   const cards = !!pets ? pets.map(pet => {
      return (
         <PetCard key={pet.id} pet={pet} />
      )
   }) : null

   return (
      <div>
         <h3>pets list</h3>
         {cards}
      </div>
   )
}

export default PetsList