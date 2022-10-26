import React from 'react'
import { useParams } from 'react-router-dom'

function PetProfile (props) {
   const { pets } = props
   const params = useParams()
   const pet = pets.find(pet => pet.id === parseInt(params.id))
   if (!pet) {return (<div>no pet with id {params.id}</div>)}
   const { name, species, breed, color, birthday } = pet

   return (
      <div>
         <h2>{name}</h2>
         <h3>{birthday}</h3>
         <h3>{species} | {breed}</h3>
         <h3>{color}</h3>
      </div>
   )
}

export default PetProfile