import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NewVisitForm from './NewVisitForm'
import VisitPage from './VisitPage'
import VisitsTable from './VisitsTable'

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

   function onEditVisit (editVisit) {
      const update = visits.map(visit => {
         if (visit.id === editVisit.id) return editVisit
         return visit
      })
      setVisits(update)
   }

   function onNewVisit (newVisit) {
      setVisits([...visits, newVisit])
   }

   const todaysVisits = !!visits ? visits.filter(visit => {
      const appt = new Date(visit.scheduled_for)
      return isToday(appt)
   }) : null

   return (
      <div className='page-content'>
         <Routes>
            <Route index element={<VisitsTable visits={todaysVisits} showAll={false} onEditVisit={onEditVisit} />} />
            <Route path="all" element={<VisitsTable visits={visits} showAll={true} />} />
            <Route path="new" element={<NewVisitForm onNewVisit={onNewVisit} />} />
            <Route path=":id/*" element={<VisitPage onEndVisit={onEditVisit} />} />
         </Routes>
      </div>
   )
}

export default VisitsPage