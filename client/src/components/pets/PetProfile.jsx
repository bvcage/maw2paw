import React from 'react'

function PetProfile (props) {
   const { pet } = props
   const { id, name, species, breed, color, birthday } = pet

   return (
      <div id="pet-profile-container">
         <h2>{pet.name}</h2>
         <div id="pet-profile">
            <p>
               species: {!!species ? species.toLowerCase() : null}
               <br />
               breed: {!!breed ? breed : "unspecified"}
               <br />
               birthday: {!!birthday ? birthday : "unknown"}
               <br />
               color: {!!color ? color : "unspecified"}
            </p>
         </div>
      </div>
   )
}

export default PetProfile