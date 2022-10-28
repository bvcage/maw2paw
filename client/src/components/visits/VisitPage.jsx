import React, { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import VisitSummary from './VisitSummary'

function VisitPage (props) {
   const { user, onEndVisit } = props

   const params = useParams()
   const [visit, setVisit] = useState({})

   useEffect(() => {
      fetch(`/visits/${params.id}`).then(r=>r.json()).then(visit=>{
         if (visit.diagnosis === null) visit.diagnosis = ""
         setVisit(visit)
      })
   }, [params.id])

   function handleEndVisit (end) {
      setVisit(end)
      onEndVisit(end)
   }

   return (
      <Routes>
         <Route index element={<VisitSummary visit={visit} user={user} onEndVisit={handleEndVisit} />} />
      </Routes>
   )
}

export default VisitPage