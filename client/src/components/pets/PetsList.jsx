import React from 'react'
import PetCard from './PetCard'

function PetsList (props) {
   const { pets } = props

   const cards = pets.map(pet => {
      return (
         <PetCard key={pet.id} pet={pet} />
      )
   })

   return (
      <div>{cards}</div>
   )
}

export default PetsList