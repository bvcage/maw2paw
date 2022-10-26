import React from 'react'

function PetCard (props) {
   const { pet } = props
   const { id, name, species, breed, color, birthday } = pet
   return (
      <div className="card">
         <img src="https://via.placeholder.com/250" alt="..." className="card-img-top" />
         <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle">{species.toLowerCase()}</h6>
         </div>
      </div>
   )
}

export default PetCard