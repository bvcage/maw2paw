import React, { useEffect, useState } from 'react'

function VisitForm (props) {
   const [owner, setOwner] = useState("")
   const [pet, setPet] = useState("")
   const [vet, setVet] = useState(0)
   const [vets, setVets] = useState([])

   useEffect(() => {
      // fetch('/owners').then(r=>r.json()).then(f=>setOwners(f))
      fetch('/vets').then(r=>r.json()).then(f=>setVets(f))
   }, [])

   function handleSubmit (e) {
      e.preventDefault()
      fetch('/visits', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "owner": owner,
            "pet": pet,
            "vet": vet
         })
      })
   }

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

         <label>owner</label>
         <input
            type="text"
            className="form-control"
            placeholder="owner"
            autoComplete="off"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
         />

         <label>pet</label>
         <input
            type="text"
            className="form-control"
            placeholder="pet"
            value={pet}
            onChange={(e) => setPet(e.target.value)}
         />

         <label>vet</label>
         <select className="form-select">
            <option selected disabled>vet</option>
            {vetsList}
         </select>

         <input type="date" />
         <input type="time" />

         <button type="submit">submit</button>
      </form>
   )
}

export default VisitForm