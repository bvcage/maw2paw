import React, { useEffect, useState } from 'react'

function PetForm (props) {

   const { onEditPet, onNewPet } = props

   let today = new Date()
   today = `${today.getFullYear()}-${("0" + (today.getMonth()+1)).slice(-2)}-${("0" + (today.getDate())).slice(-2)}`

   const [breed, setBreed] = useState(!!props.pet ? props.pet.breed : "")
   const [breeds, setBreeds] = useState({})
   const [color, setColor] = useState(!!props.pet ? props.pet.color : "")
   const [birthday, setBirthday] = useState(!!props.pet ? props.pet.birthday : today)
   const [name, setName] = useState(!!props.pet ? props.pet.name : "")
   const [species, setSpecies] = useState(!!props.pet ? props.pet.species : "")

   useEffect(() => {
      fetch('/pets/breeds').then(r=>r.json()).then(setBreeds)
   }, [])
   
   const context = {
      "setBirthday": setBirthday,
      "setBreed": setBreed,
      "setColor": setColor,
      "setName": setName,
      "setSpecies": setSpecies
   }

   function execFn (fnStr, ctx) {
      const args = Array.prototype.slice.call(arguments, 2)
      return ctx[fnStr].apply(ctx, args)
   }

   function handleBlur (e) {
      const name = e.target.name
      // hide dropdowns
      document.getElementById(name + "Dropdown").classList.remove("show")
      // format user entry
      if (name === "species") setSpecies(species.toUpperCase())
      if (name === "breed") setBreed(toCamelCase(breed))
   }

   function handleChange (e) {
      const name = e.target.name
      const value = e.target.value
      const func = `set${name.charAt(0).toUpperCase() + name.slice(1)}`
      execFn(func, context, value)
   }

   function handleFocus (e) {
      document.getElementById(e.target.name + "Dropdown").classList.add("show")
   }

   function handleSubmit (e) {
      e.preventDefault()
      const url = !!props.pet ? `/pets/${props.pet.id}` : '/pets'
      const method = !!props.pet ? 'PATCH' : 'POST'
      fetch(url, {
         method: method,
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: name,
            species: species,
            breed: breed,
            color: color,
            birthday: birthday
         })
      }).then(r=> {
         if (r.ok) r.json().then(pet => {
            if (!!props.pet) onEditPet(pet)
            else onNewPet(pet)
         })
         else console.log('error')
      })
   }

   function toCamelCase (string) {
      string = string.split()
      string.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      return string.join(" ")
   }

   const breedsList = !!breeds && species in breeds ?
      breeds[species].filter(speciesBreed => speciesBreed.toUpperCase().includes(breed.toUpperCase()))
         .map(breed => {
            return (
               <div name="specie"
                  key={breed}
                  onMouseDown={() => {
                     setBreed(breed)
                     document.getElementById("breedDropdown").classList.remove("show")
                  }}
                  >{breed}
               </div>
            )
         })
      : null

   const speciesList = Object.keys(breeds)
   .filter(specie => specie.toUpperCase().includes(species.toUpperCase()))
   .map(specie => {
      return (
         <div name="specie"
            key={specie}
            onMouseDown={() => {
               setSpecies(specie)
               document.getElementById("speciesDropdown").classList.remove("show")
            }}
            >{specie}
         </div>
      )
   })

   return (
      <form onSubmit={handleSubmit}>

         <h2>{ !!props.pet ? 'edit' : 'new' } pet form</h2>

         <div className="form-floating">
            <input
               name="name"
               type="text"
               className="form-control"
               placeholder="name"
               value={name}
               onChange={handleChange} />
            <label>name</label>
         </div>

         <div className="dropdown">
            <label>species</label>
            <input name="species"
               type="text"
               className="form-control"
               placeholder="species"
               value={species}
               onBlur={handleBlur}
               onChange={handleChange}
               onFocus={handleFocus}
            />
            <div id="speciesDropdown" className="dropdown-content">
               {speciesList}
            </div>
         </div>

         <div className="dropdown">
            <label>breed</label>
            <input name="breed"
               type="text"
               className="form-control"
               disabled={!species || !(species in breeds)}
               placeholder="breed"
               value={breed}
               onBlur={handleBlur}
               onChange={handleChange}
               onFocus={handleFocus}
            />
            <div id="breedDropdown" className="dropdown-content">
               {breedsList}
            </div>
         </div>

         <div className="form-floating">
            <input
               name="color"
               type="text"
               className="form-control"
               disabled={!species || !(species in breeds)}
               placeholder="color"
               value={color}
               onChange={handleChange} />
            <label>color</label>
         </div>

         <label>birthday</label>
         <input
            name="birthday"
            type="date"
            value={birthday}
            onChange={handleChange} />

         <button type="submit">{ !!props.pet ? 'update' : 'create' }</button>

      </form>
   )
}

export default PetForm