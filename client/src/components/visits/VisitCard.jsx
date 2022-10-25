import React from 'react'

function VisitCard (props) {
   const { visit } = props
   const { pet, schedule, vet } = visit

   console.log(vet)

   const appt = new Date(schedule)
   
   return (
      <div className="card">
         <div className="card-body">
            <h5 className="card-title">{`${appt.toLocaleString("en-us", { hour: 'numeric', minute: 'numeric' })}`}</h5>
            <h6 className="card-subtitle">{pet.name} | Dr. {vet.last_name}</h6>
            <p>{pet.name} ({pet.species.toLowerCase()})</p>
            <ul className="list-group list-group-flush">
               <li className="list-group-item">{pet.name}</li>
               <li className="list-group-item">{pet.species.toLowerCase()}</li>
               <li className="list-group-item">Dr. {vet.last_name}</li>
            </ul>
         </div>
      </div>
   )
}

export default VisitCard