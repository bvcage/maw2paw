import React from 'react'

function PetProfile (props) {
   const { pet } = props
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