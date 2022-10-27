import React from 'react'

function PetProfile (props) {
   const { pet } = props
   const { id, name, species, breed, color, birthday } = pet

   return (
      <div id="pet-profile-container">
         <h2>{pet.name}</h2>
         <div id="pet-profile">
            <p>
               {!!species ? species.toLowerCase() : null} | {breed}
               <br />
               birthday: {birthday}
               <br />
               color: {color}
            </p>
         </div>
      </div>
   )
}

export default PetProfile