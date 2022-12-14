import React, { useEffect, useState } from 'react'

function OwnerForm (props) {
   const { owner, onEditOwner, onNewOwner } = props

   const [address, setAddress] = useState("")
   const [email, setEmail] = useState("")
   const [first, setFirst] = useState("")
   const [last, setLast] = useState("")
   const [phone, setPhone] = useState("")
   const [errors, setErrors] = useState([])

   useEffect(() => {
      if (!!owner) {
         setAddress(owner.address)
         setEmail(owner.email)
         setFirst(owner.first_name)
         setLast(owner.last_name)
         setPhone(owner.phone)
      }
   }, [owner])

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
      const url = !!owner ? `/owners/${owner.id}` : '/owners'
      const method = !!owner ? 'PATCH' : 'POST'
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
         if (r.ok) {r.json().then(entry => {
            if (!!owner) onEditOwner(entry)
            else onNewOwner(entry)
         })} else {
            r.json().then(err => {
               setErrors([err])
               setTimeout(() => {
                  setErrors([])
               }, 2000)
            })
         }
      })
   }

   const errList = errors.map((item,i) => {
      const err = item.error.split(":")
      let sublvl = err[1].split(",")
      sublvl = sublvl.map((item,j) => <li key={`subErr${j}`}>{item.trim()}</li>)
      return (
         <li key={`error${i}`}>{err[0]}:
            <ul>{sublvl}</ul>
         </li>
      )
   })
   const errContainer = <div><ul>{errList}</ul></div>

   return (
      <form onSubmit={handleSubmit} autoComplete="off">
         <h2>{ !!owner ? 'edit' : 'new' } owner form</h2>
         {/* add pets ? */}
         <input type="text" hidden autoComplete="off" />

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

         { !!errors ? errContainer : null }

      </form>

   )
}

export default OwnerForm