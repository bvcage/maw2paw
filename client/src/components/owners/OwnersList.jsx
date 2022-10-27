import React from 'react'
import { useLocation } from 'react-router-dom'
import OwnerCard from './OwnerCard'

function OwnersList (props) {
   const { owners } = props
   const location = useLocation()
   const path = location.pathname.split('/')

   const cards = !!owners ? owners.map(owner => {
      return (
         <OwnerCard key={owner.id} owner={owner} />
      )
   }) : null

   return (
      <div id="owners-list-container">
         {path.length > 3 ? <h3>owner(s)</h3> : <h2>owners</h2>}
         <div id="owners-list">{cards}</div>
      </div>
   )
}

export default OwnersList