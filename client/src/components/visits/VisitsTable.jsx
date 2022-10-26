import React from 'react'
import { useNavigate } from 'react-router-dom'

function VisitsTable (props) {
   const { showAll, visits } = props

   const navigate = useNavigate()

   const rows = visits.map(visit => {
      const appt = new Date(visit.schedule)
      let apptDisplay
      if (showAll) apptDisplay = appt.toLocaleDateString("en-US", {year:'numeric', month:'short', day:'numeric'})
      else apptDisplay = appt.toLocaleTimeString("en-US", {hour:'numeric', minute:'numeric'})
      const ownersList = visit.owners.map(owner => <tr>{owner.full_name}</tr>)
      return (
         <tr key={visit.id} onClick={() => navigate(`/main/visits/${visit.id}`)}>
            <th scope="row">{apptDisplay}</th>
            <td>{ownersList}</td>
            <td>{visit.pet.name}</td>
            <td>{visit.vet.last_name}</td>
         </tr>
      )
   })

   return (
      <table className="table">
         <thead>
            <tr>
               <th scope="col">date / time</th>
               <th scope="col">owner(s)</th>
               <th scope="col">pet</th>
               <th scope="col">vet</th>
            </tr>
         </thead>
         <tbody>
            {rows}
         </tbody>
      </table>
   )
}

export default VisitsTable