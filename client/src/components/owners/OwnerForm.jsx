import React, { useState } from 'react'

function OwnerForm (props) {

   const { onEditOwner, onNewOwner } = props

   const [address, setAddress] = useState(!!props.owner ? props.owner.address : "")
   const [email, setEmail] = useState(!!props.owner ? props.owner.email : "")
   const [first, setFirst] = useState(!!props.owner ? props.owner.first_name : "")
   const [last, setLast] = useState(!!props.owner ? props.owner.last_name : "")
   const [phone, setPhone] = useState(!!props.owner ? props.owner.phone : "")

   const context = {
      "setAddress": setAddress,
      "setEmail": setEmail,
      "setFirst": setFirst,
      "setLast": setLast,
      "setPhone": setPhone
   }

   function execFn (fnStr, ctx) {
      const args = Array.prototype.slice.call(arguments, 2)
      return ctx[fnStr].apply(ctx, args)
   }

   function handleChange (e) {
      const name = e.target.name
      const value = e.target.value
      const func = `set${name.charAt(0).toUpperCase() + name.slice(1)}`
      execFn(func, context, value)
   }

   function handleSubmit (e) {
      e.preventDefault()
      const url = !!props.owner ? `/owners/${props.owner.id}` : '/owners'
      const method = !!props.owner ? 'PATCH' : 'POST'
      fetch(url, {
         method: method,
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            first_name: first,
            last_name: last,
            email: email,
            phone: phone,
            address: address
         })
      }).then(r => {
         if (r.ok) r.json().then(owner => {
            if (!!props.owner) onEditOwner(owner)
            else onNewOwner(owner)
         })
         else console.log('error')
      })
   }

   return (
      <form onSubmit={handleSubmit}>
         {/* add pets ? */}
         <div className="form-floating">
            <input
               name="first"
               type="text"
               className="form-control"
               placeholder="first"
               value={first}
               onChange={handleChange} />
            <label>first</label>
         </div>

         <div className="form-floating">
            <input
               name="last"
               type="text"
               className="form-control"
               placeholder="last"
               value={last}
               onChange={handleChange} />
            <label>last</label>
         </div>

         <div className="form-floating">
            <input
               name="phone"
               type="text"
               className="form-control"
               placeholder="phone"
               value={phone}
               onChange={handleChange} />
            <label>phone</label>
         </div>

         <div className="form-floating">
            <input
               name="email"
               type="text"
               className="form-control"
               placeholder="email"
               value={email}
               onChange={handleChange} />
            <label>email</label>
         </div>

         <div className="form-floating">
            <input
               name="address"
               type="text"
               className="form-control"
               placeholder="address"
               value={address}
               onChange={handleChange} />
            <label>address</label>
         </div>

         <button type="submit">{ !!props.owner ? 'update' : 'create' }</button>

      </form>
   )
}

export default OwnerForm