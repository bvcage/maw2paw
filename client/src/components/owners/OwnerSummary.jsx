import React from 'react'
import OwnerProfile from './OwnerProfile'
import PetsList from '../pets/PetsList'

function OwnerSummary (props) {
   const { owner } = props

   if (!owner) return (<div>no owner summary available</div>)
   
   return (
      <div id="owner-summary">
         <OwnerProfile owner={owner} />
         <PetsList pets={owner.pets} />
      </div>
   )
}

export default OwnerSummary