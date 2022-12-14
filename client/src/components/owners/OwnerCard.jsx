import React from 'react'
import { useNavigate } from 'react-router-dom'

function OwnerCard (props) {
   const { owner } = props
   const { id, first_name, last_name, full_name, email, address, phone } = owner

   const navigate = useNavigate()

   return (
      <div className="card" onClick={() => navigate(`/main/owners/${id}`)}>
         <div className="card-content">
            <h5 className="card-title">{last_name}, {first_name}</h5>
            {phone ? <h6 className="card-subtitle">{phone}</h6> : null}
            {email ? <h6 className="card-subtitle">{email}</h6> : null}
         </div>
      </div>
   )
}

export default OwnerCard