import React, { useState } from 'react'

function NewOwnerForm (props) {

   const { onNewOwner } = props

   const [address, setAddress] = useState("")
   const [email, setEmail] = useState("")
   const [first, setFirst] = useState("")
   const [last, setLast] = useState("")
   const [phone, setPhone] = useState("")

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
      fetch('/owners', {
         method: 'POST',
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
         if (r.ok) r.json().then(onNewOwner)
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

         <button type="submit">create</button>

      </form>
   )
}

export default NewOwnerForm