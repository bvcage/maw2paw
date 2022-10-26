import React from 'react'
import { useNavigate } from 'react-router-dom'

function PetProfile (props) {
   const { pet } = props
   const { id, name, species, breed, color, birthday } = pet

   const navigate = useNavigate()

   return (
      <div>
         <h2>{name}</h2>
         <h3>{birthday}</h3>
         <h3>{species} | {breed}</h3>
         <h3>{color}</h3>
         <button onClick={() => navigate(`/main/pets/${id}/edit`)}>edit</button>
      </div>
   )
}

export default PetProfile