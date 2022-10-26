import React, { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import VisitsList from '../visits/VisitsList'
import PetProfile from './PetProfile'

function PetSummary (props) {
   const params = useParams()
   const [pet, setPet] = useState({})
   const [visits, setVisits] = useState([])

   useEffect(() => {
      fetch(`/pets/${params.id}`).then(r=>r.json()).then(setPet)
      fetch(`/pets/${params.id}/visits`).then(r=>r.json()).then(setVisits)
   }, [params.id])
   if (!pet) {return (<div>no pet with id {params.id}</div>)}

   return (<>
      <PetProfile pet={pet} />
      <VisitsList visits={visits} />
      <Routes>
         <Route path="profile" element={<PetProfile pet={pet} />} />
      </Routes>
   </>)
}

export default PetSummary