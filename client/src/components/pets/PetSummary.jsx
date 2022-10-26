import React, { useEffect, useState } from 'react'
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

   return (<>
      <PetProfile pet={pet} />
      <VisitsList visits={visits} />
   </>)
}

export default PetSummary