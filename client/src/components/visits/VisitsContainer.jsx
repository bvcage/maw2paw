import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import VisitForm from './VisitForm'
import VisitsList from './VisitsList'

function VisitsContainer (props) {

   const [visits, setVisits] = useState([])

   useEffect(() => {
      fetch('/visits').then(r=>r.json()).then(data=>setVisits(data))
   }, [])

   return (
      <Routes>
         <Route index element={<VisitsList visits={visits} />} />
         <Route path="new" element={<VisitForm />} />
      </Routes>
   )
}

export default VisitsContainer