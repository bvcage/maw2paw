import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NewVisitForm from './NewVisitForm'
import VisitsList from './VisitsList'
import VisitSummary from './VisitSummary'

function VisitsPage (props) {

   const [visits, setVisits] = useState([])

   useEffect(() => {
      fetch('/visits').then(r=>r.json()).then(data=>setVisits(data))
   }, [])

   function onNewVisit (newVisit) {
      setVisits([...visits, newVisit])
   }

   return (
      <Routes>
         <Route index element={<VisitsList visits={visits} />} />
         <Route path="new" element={<NewVisitForm onNewVisit={onNewVisit} />} />
         <Route path=":id" element={<VisitSummary />} />
      </Routes>
   )
}

export default VisitsPage