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
      <div>{cards}</div>
   )
}

export default VisitsList