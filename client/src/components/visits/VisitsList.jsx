import React, { useEffect, useState } from 'react'
import VisitCard from './VisitCard'

function VisitsList (props) {
   const { visits } = props

   function isToday (date) {
      const today = new Date()
      return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear()
   }

   const rows = visits
   .sort((a,b) => {
      if (a.schedule < b.schedule) { return -1 }
      if (a.schedule > b.schedule) { return 1 }
      return 0
   })
   .filter(visit => {
      const appt = new Date(visit.schedule)
      return isToday(appt)
   })
   .map(visit => {
      const appt = new Date(visit.schedule)
      return (
         <tr key={visit.id}>
            <th scope="row">{appt.toLocaleTimeString("en-US", {hour:'numeric', minute:'numeric'})}</th>
            <td>{visit.pet.name}</td>
            <td>{visit.vet.last_name}</td>
         </tr>
      )
   })

   return (
      <table className="table">
         <thead>
            <tr>
               <th scope="col">time</th>
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

export default VisitsList