import React from 'react'
import OwnerCard from './OwnerCard'

function OwnersList (props) {
   const { owners } = props

   const cards = owners.map(owner => {
      return (
         <OwnerCard key={owner.id} owner={owner} />
      )
   })
   return (
      <div>{cards}</div>
   )
}

export default OwnersList