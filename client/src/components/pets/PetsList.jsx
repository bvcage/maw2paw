import React from 'react'
import { useLocation } from 'react-router-dom'
import PetCard from './PetCard'

function PetsList (props) {
   const { pets } = props
   const location = useLocation()
   const path = location.pathname.split('/')

   const cards = !!pets ? pets.map(pet => {
      return (
         <PetCard key={pet.id} pet={pet} />
      )
   }) : null

   return (
      <div id="pets-list-container">
         {path.length > 3 ? null : <h2>pets</h2>}
         <div id="pets-list">{cards}</div>
      </div>
   )
}

export default PetsList