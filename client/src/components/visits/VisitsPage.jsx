import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NewVisitForm from './NewVisitForm'
import VisitsTable from './VisitsTable'
import VisitSummary from './VisitSummary'

function VisitsPage (props) {

   const [visits, setVisits] = useState([])

   useEffect(() => {
      fetch('/visits').then(r=>r.json()).then(data=>setVisits(data))
   }, [])

   function isToday (date) {
      const today = new Date()
      return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear()
   }

   function onNewVisit (newVisit) {
      setVisits([...visits, newVisit])
   }


   const todaysVisits = !!visits ? visits.filter(visit => {
      const appt = new Date(visit.schedule)
      return isToday(appt)
   }) : null

   return (
      <Routes>
         <Route index element={<VisitsTable visits={todaysVisits} showAll={false} />} />
         <Route path="all" element={<VisitsTable visits={visits} showAll={true} />} />
         <Route path="new" element={<NewVisitForm onNewVisit={onNewVisit} />} />
         <Route path=":id" element={<VisitSummary />} />
      </Routes>
   )
}

export default VisitsPage