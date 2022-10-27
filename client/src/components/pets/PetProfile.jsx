import React from 'react'
import { useNavigate } from 'react-router-dom'

function PetProfile (props) {
   const { pet } = props
   const { id, name, species, breed, color, birthday } = pet

   const navigate = useNavigate()

   return (
      <div id="pet-profile">
         <p>
            {species.toLowerCase()} | {breed}
            <br />
            birthday: {birthday}
            <br />
            color: {color}
         </p>
         <button onClick={() => navigate(`/main/pets/${id}/edit`)}>edit</button>
      </div>
   )
}

export default PetProfile