import React from 'react'
import { useNavigate } from 'react-router-dom'

const LOCATIONS = ["", "waiting", "exam room 1", "exam room 2", "exam room 3", "exam room 4", "exam room 5"]
const VISIT_STATUS = ["", "scheduled", "confirmed", "checked in", "in progress", "pending discharge", "complete"]

function VisitsTable (props) {
   const { showAll, visits, onEditVisit } = props

   const navigate = useNavigate()

   const rows = visits.map(visit => {
      let apptDisplay
      const appt = new Date(visit.scheduled_for)
      if (showAll) apptDisplay = appt.toLocaleDateString("en-US", {year:'numeric', month:'short', day:'numeric'})
      else apptDisplay = appt.toLocaleTimeString("en-US", {hour:'numeric', minute:'numeric'})

      const locationDisplay = (<div className="button"
         onClick={(e) => handleClick(e, visit, "location")}
         >{!!visit.location ? LOCATIONS[visit.location] : null}
         </div>)
      const locationOptions = LOCATIONS.map((loc, i) => {
         return (
            <div key={`loc${i}`} onClick={(e) => handleClick(e, visit, "location", i)}>{loc}</div>
         )
      })

      const ownersList = visit.owners.map(owner => owner.full_name).join(', ')

      const reasonDisplay = !!visit.reason && visit.reason.length > 20 ? visit.reason.slice(0,20) + '...' : visit.reason

      const statusDisplay = <div className="button" onClick={(e) => handleClick(e, visit, "status")}>{!!visit.status ? VISIT_STATUS[visit.status] : VISIT_STATUS[1]}</div>
      const statusOptions = VISIT_STATUS.map((status, i) => {
         return (
            <div key={`status${i}`} onClick={(e) => handleClick(e, visit, "status", i)}>{status}</div>
         )
      })

      return (
         <tr key={visit.id} onClick={() => navigate(`/main/visits/${visit.id}`)}>
            <th scope="row">{apptDisplay}</th>
            <td>{visit.pet.name}</td>
            <td>{ownersList}</td>
            <td>{reasonDisplay}</td>
            <td>
               <div className="dropdown">
                  {statusDisplay}
                  <div id={`visitStatusDropdown${visit.id}`} className="dropdown-content">
                     {statusOptions}
                  </div>
               </div>
            </td>
            <td>
               <div className='dropdown'>
                  {!!visit.location ? locationDisplay : null}
                  <div id={`locationDropdown${visit.id}`} className="dropdown-content">
                     {locationOptions}
                  </div>
               </div>
            </td>
            <td>{visit.vet.initials}</td>
         </tr>
      )
   })

   function handleClick (e, visit, name, value) {
      e.stopPropagation()
      switch (name) {
         case "location":
            document.getElementById(`locationDropdown${visit.id}`).classList.toggle("show")
            if (!!value) {
               if (value > 2) onEditVisit({...visit, location: value, status: 4})
               else onEditVisit({...visit, location: value})
            }
            break
         case "status":
            document.getElementById(`visitStatusDropdown${visit.id}`).classList.toggle("show")
            if (!!value) {
               switch (VISIT_STATUS[value]) {
                  case "complete":
                     onEditVisit({...visit, status: value, location: null, departed_at: new Date().toISOString()})
                     break
                  case "checked in":
                     onEditVisit({...visit, status: value, location: 1, arrived_at: new Date().toISOString()})
                     break
                  default:
                     onEditVisit({...visit, status: value})
               }
            }
            break
         default:
            break
      }
   }

   return (
      <table className="table">
         <thead>
            <tr>
               <th scope="col">date / time</th>
               <th scope="col">pet</th>
               <th scope="col">owner(s)</th>
               <th scope="col">reason</th>
               <th scope="col">status</th>
               <th scope="col">location</th>
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