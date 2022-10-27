import React from 'react'
import PetCard from './PetCard'

function PetsList (props) {
   const { pets } = props

   const cards = !!pets ? pets.map(pet => {
      return (
         <PetCard key={pet.id} pet={pet} />
      )
   }) : null

   return (<>
      <h3>pets</h3>
      <div id="pets-list">{cards}</div>
   </>)
}

export default PetsList