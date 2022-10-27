import React from 'react'
import OwnerCard from './OwnerCard'

function OwnersList (props) {
   const { owners } = props

   const cards = !!owners ? owners.map(owner => {
      return (
         <OwnerCard key={owner.id} owner={owner} />
      )
   }) : null

   return (
      <div>
         <h3>owners list</h3>
         {cards}
      </div>
   )
}

export default OwnersList