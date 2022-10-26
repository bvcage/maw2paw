import React from 'react'
import VisitCard from './VisitCard'

function VisitsList (props) {
   const { visits } = props

   const cards = !!visits ? visits.map(visit => {
      return (
         <VisitCard key={visit.id} visit={visit} />
      )
   }) : null

   return (
      <div>
         <h3>visit history</h3>
         {cards}
      </div>
   )
}

export default VisitsList