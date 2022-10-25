import React, { useEffect, useState } from 'react'

function VisitForm (props) {
   const [owner, setOwner] = useState("")
   const [owners, setOwners] = useState([])
   const [pet, setPet] = useState("")
   const [pets, setPets] = useState([])
   const [showPetDrop, setShowPetDrop] = useState(false)
   const [vet, setVet] = useState(0)
   const [vets, setVets] = useState([])

   const context = {
      "owners": owners,
      "setOwner": setOwner,
      "setOwners": setOwners,
      "setPet": setPet,
      "setVet": setVet
   }

   useEffect(() => {
      fetch('/owners').then(r=>r.json()).then(f=>setOwners(f))
      fetch('/pets').then(r=>r.json()).then(f=>setPets(f))
      fetch('/vets').then(r=>r.json()).then(f=>setVets(f))
   }, [])

   function execFn (fnStr, ctx) {
      const args = Array.prototype.slice.call(arguments, 2)
      return ctx[fnStr].apply(ctx, args)
   }

   function handleBlur (e) {
      document.getElementById(e.target.name + "Dropdown").classList.remove("show")
   }

   function handleChange (e) {
      const name = e.target.name
      const value = e.target.value
      // update state value
      const func = `set${name.charAt(0).toUpperCase() + name.slice(1)}`
      execFn(func, context, value)
      // search as user types
      fetch(`/${name}s?name=${value}`)
         .then(r=>r.json())
         .then(data => {
            execFn(func+'s', context, data)
         })
   }

   function handleFocus (e) {
      document.getElementById(e.target.name + "Dropdown").classList.add("show")
   }

   function handleSubmit (e) {
      e.preventDefault()
      console.log(owner)
      // fetch('/visits', {
      //    method: 'POST',
      //    headers: {
      //       'Content-Type': 'application/json'
      //    },
      //    body: JSON.stringify({
      //       "owner": owner,
      //       "pet": pet,
      //       "vet": vet
      //    })
      // })
   }

   const ownersList = owners.map(owner => {
      const name = `${owner.first_name} ${owner.last_name}`
      return (
         <div
            name="owner"
            key={owner.id}
            onMouseDown={() => {
               setOwner(name)
               document.getElementById("ownerDropdown").classList.remove("show")
            }}
            >{name}
         </div>
      )
   })

   const petsList = pets.map(pet => {
      return (
         <div name="pet"
            key={pet.id}
            onMouseDown={() => {
               setPet(pet.name)
               document.getElementById("petDropdown").classList.remove("show")
            }}
            >{pet.name}
         </div>
      )
   })

   const vetsList = vets
   .sort((a,b) => {
      if (a.last_name < b.last_name) { return -1 }
      if (a.last_name > b.last_name) { return 1 }
      if (a.first_name < b.first_name) { return -1 }
      if (a.first_name > b.first_name) { return 1 }
      return 0
   })
   .map(vet => <option key={vet.id} value={vet.id}>{vet.last_name}</option>)

   return (
      <form autoComplete="off" onSubmit={handleSubmit}>
         <h2>new visit</h2>

         {/* hidden input to turn off autocomplete / autofill */}
         <input autoComplete="false" type="text" style={{display:"none"}} />

         {/* custom dropdown */}
         <div className="dropdown">
            <label>owner</label>
            <input
               name="owner"
               type="text"
               className="form-control"
               placeholder="owner"
               autoComplete="off"
               value={owner}
               onBlur={handleBlur}
               onChange={handleChange}
               onFocus={handleFocus}
            />
            <div id="ownerDropdown" className="dropdown-content">
               {ownersList}
            </div>
         </div>

         {/* disabled until owner selected */}
         {/* custom dropdown */}
         <div className="dropdown">
            <label>pet</label>
            <input
               name="pet"
               type="text"
               className="form-control"
               placeholder="pet"
               value={pet}
               onChange={handleChange}
               disabled={owner ? false : true}
            />
            <div id="petDropdown" className="dropdown-content">
               {petsList}
            </div>
         </div>

         <label>vet</label>
         <select className="form-select" defaultValue="label">
            <option disabled value="label">vet</option>
            {vetsList}
         </select>

         <input type="date" />
         <input type="time" />

         <button type="submit">submit</button>
      </form>
   )
}

export default VisitForm