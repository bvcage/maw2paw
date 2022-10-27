import "flatpickr/dist/themes/material_green.css"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Flatpickr from 'react-flatpickr'

function NewVisitForm (props) {

   const { onNewVisit } = props

   const today = new Date()
   today.setHours(12)
   today.setMinutes(0)
   today.setSeconds(0)

   const [owner, setOwner] = useState({full_name: ""})
   const [owners, setOwners] = useState([])
   const [pet, setPet] = useState({name: ""})
   const [pets, setPets] = useState([])
   const [reason, setReason] = useState("")
   const [schedule, setSchedule] = useState(new Date(today.getTime() + 86400000))
   const [vet, setVet] = useState(0)
   const [vets, setVets] = useState([])

   const navigate = useNavigate()

   const context = {
      "owners": owners,
      "setOwner": setOwner,
      "setOwners": setOwners,
      "setPet": setPet,
      "setReason": setReason,
      "setSchedule": setSchedule,
      "setVet": setVet
   }

   useEffect(() => {
      fetch('/owners').then(r=>r.json()).then(f=>setOwners(f))
      fetch('/vets').then(r=>r.json()).then(f=>setVets(f))
   }, [])

   function execFn (fnStr, ctx) {
      const args = Array.prototype.slice.call(arguments, 2)
      return ctx[fnStr].apply(ctx, args)
   }

   function handleBlur (e) {
      const name = e.target.name
      document.getElementById(name + "Dropdown").classList.remove("show")
      // when owner selected, load pets array
      if (!!owner.id && name === "owner") {
         fetch(`/owners/${owner.id}/pets`).then(r=>r.json()).then(data => setPets(data))
      }
   }

   function handleChange (e) {
      const name = e.target.name
      const value = e.target.value
      // update state value
      const func = `set${name.charAt(0).toUpperCase() + name.slice(1)}`
      execFn(func, context, value)
      // search as user types
      if (name === ("owner" || "pet")) {
         fetch(`/${name}s?name=${value}`)
            .then(r=>r.json())
            .then(data => {
               execFn(func+'s', context, data)
            })
      }
   }

   function handleFocus (e) {
      document.getElementById(e.target.name + "Dropdown").classList.add("show")
   }

   function handleSubmit (e) {
      e.preventDefault()
      fetch('/visits', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "pet_id": pet.id,
            "vet_id": vet,
            "scheduled_for": schedule,
            "status": 1,
            "reason": reason
         })
      }).then(r=>{
         if (r.ok) r.json().then(data => {
            onNewVisit(data)
            navigate('/main/visits')
         })
         else console.log('error')
      })
   }

   const ownersList = owners.map(owner => {
      const name = `${owner.first_name} ${owner.last_name}`
      return (
         <div
            name="owner"
            key={owner.id}
            onMouseDown={() => {
               setOwner(owner)
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
               setPet(pet)
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
               value={owner.full_name}
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
               value={pet.name}
               onBlur={handleBlur}
               onChange={handleChange}
               onFocus={handleFocus}
               disabled={!!owner.full_name ? false : true}
            />
            <div id="petDropdown" className="dropdown-content">
               {petsList}
            </div>
         </div>

         <label>vet</label>
         <select
            name="vet"
            className="form-select"
            defaultValue={ !!vet ? vet : "label" }
            disabled={!!pet.name ? false : true}
            onChange={handleChange} >
               <option disabled value="label">vet</option>
               {vetsList}
         </select>

         <label>schedule</label>
         <Flatpickr
            name="schedule"
            data-enable-time
            value={schedule}
            onChange={handleChange}
            options={{
               minDate: today,
               minTime: "08:00",
               maxTime: "18:00",
               minuteIncrement: 15
            }} />

         <h4>additional info</h4>

         <div className="form-floating">
            <input
               name="reason"
               type="textarea"
               className="form-control"
               placeholder="reason for visit"
               rows={4}
               value={reason}
               onChange={handleChange} />
            <label>reason for visit</label>
         </div>

         <button type="submit">submit</button>
      </form>
   )
}

export default NewVisitForm