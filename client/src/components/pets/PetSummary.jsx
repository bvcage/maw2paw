import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OwnersList from '../owners/OwnersList'
import PetProfile from './PetProfile'
import VisitsList from '../visits/VisitsList'

function PetSummary (props) {
   const { pet } = props
   const navigate = useNavigate()
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
         <PetProfile pet={pet} />
         <OwnersList owners={pet.owners} />
         <VisitsList visits={visits} />
         <button onClick={() => navigate(`/main/pets/${pet.id}/edit`)}>edit</button>
      </div>
   )
}

export default PetSummary