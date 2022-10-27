import React from 'react'
import OwnerCard from './OwnerCard'

function OwnersList (props) {
   const { owners } = props

   const cards = !!owners ? owners.map(owner => {
      return (
         <OwnerCard key={owner.id} owner={owner} />
      )
   }) : null

   return (<>
      <h3>owners</h3>
      <div id="owners-list">{cards}</div>
   </>)
}

export default OwnersList