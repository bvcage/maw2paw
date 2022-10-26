import React from 'react'
import { useParams } from 'react-router-dom'

function OwnerProfile (props) {
   const { owners } = props
   const params = useParams()
   const owner = owners.find(owner => owner.id === parseInt(params.id))
   const { first_name, last_name, full_name, phone, email, address } = owner

   return (
      <div>
         <h2>{full_name}</h2>
         <h3>{phone}</h3>
         <h3>{email}</h3>
         <h3>{address}</h3>
      </div>
   )
}

export default OwnerProfile