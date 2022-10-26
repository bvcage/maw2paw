import React from 'react'
import { useNavigate } from 'react-router-dom'

function OwnerProfile (props) {
   const { owner } = props
   const { full_name, phone, email, address } = owner

   const navigate = useNavigate()

   return (
      <div>
         <h2>{full_name}</h2>
         <h3>{phone}</h3>
         <h3>{email}</h3>
         <h3>{address}</h3>
         <button onClick={() => {navigate('edit')}}>edit</button>
      </div>
   )
}

export default OwnerProfile