import React, { useEffect, useState } from 'react'
import OwnersList from '../owners/OwnersList'
import PetProfile from './PetProfile'
import VisitsList from '../visits/VisitsList'

function PetSummary (props) {
   const { pet } = props
   const [visits, setVisits] = useState([])
   useEffect(() => {
      if (pet.id) {
         fetch(`/pets/${pet.id}/visits`).then(r=>{
            if (r.ok) r.json().then(setVisits)
            else console.log('error')
         })
      }
   }, [pet])

   return (
      <div id="pet-summary">
         <h2>{pet.name}</h2>
         <PetProfile pet={pet} />
         <OwnersList owners={pet.owners} />
         <VisitsList visits={visits} />
      </div>
   )
}

export default PetSummary