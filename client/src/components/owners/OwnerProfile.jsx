import React from 'react'
import { useNavigate } from 'react-router-dom'

function OwnerProfile (props) {
   const { owner } = props
   const { full_name, phone, email, address } = owner

   const navigate = useNavigate()

   return (
      <div id="owner-profile">
         <p>
            phone: {phone}
            <br />
            email: {email}
            <br />
            address: {address}
         </p>
         <button onClick={() => {navigate('edit')}}>edit</button>
      </div>
   )
}

export default OwnerProfile