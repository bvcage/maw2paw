import React from 'react'
import VisitCard from './VisitCard'

function VisitsList (props) {
   const { visits } = props

   const cards = visits.map(visit => {
      return (
         <VisitCard key={visit.id} visit={visit} />
      )
   })

   return (
      <div>{cards}</div>
   )
}

export default VisitsList