import React from 'react'
import { useNavigate } from 'react-router-dom'

function PetCard (props) {
   const { pet } = props
   const { id, name, species, breed, color, birthday } = pet

   const navigate = useNavigate()

   return (
      <div className="card" onClick={() => navigate(`/main/pets/${id}`)}>
         <img src="https://via.placeholder.com/250" alt="..." className="card-img-top" />
         <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle">{species.toLowerCase()}</h6>
         </div>
      </div>
   )
}

export default PetCard