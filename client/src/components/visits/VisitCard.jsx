import React from 'react'
import { useNavigate } from 'react-router-dom'

function VisitCard (props) {
   const { visit } = props
   const { pet, schedule, vet } = visit

   const appt = new Date(schedule)
   const navigate = useNavigate()

   const diagnosis = visit.diagnosis ? (<>seen for: {visit.diagnosis}<br /></>) : null
   
   return (
      <div className="card" onClick={() => navigate(`/main/visits/${visit.id})`)}>
         <div className="card-body">
            <h5 className="card-title">{`${appt.toLocaleString("en-us", { year:'numeric', month:'short', day:'numeric' })}`}</h5>
            <p className="mb-0">
               {diagnosis}
               {appt > Date.now() ? 'will be ' : '' }seen by: Dr. {vet.last_name}
            </p>
         </div>
      </div>
   )
}

export default VisitCard