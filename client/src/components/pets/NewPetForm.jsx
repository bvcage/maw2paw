import React, { useState } from 'react'

function NewPetForm (props) {

   const { onNewPet, breeds } = props

   const today = new Date()

   const [breed, setBreed] = useState("")
   const [color, setColor] = useState("")
   const [birthday, setBirthday] = useState(`${today.getFullYear()}-${("0" + (today.getMonth()+1)).slice(-2)}-${("0" + (today.getDate())).slice(-2)}`)
   const [name, setName] = useState("")
   const [species, setSpecies] = useState("")

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
      fetch('/pets', {
         method: 'POST',
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
         if (r.ok) r.json().then(onNewPet)
         else console.log('error')
      })
   }

   function toCamelCase (string) {
      string = string.split()
      string.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      return string.join(" ")
   }

   const breedsList = species in breeds ?
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
               disabled={!(species in breeds)}
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
               disabled={!species}
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

         <button type="submit">create</button>

      </form>
   )
}

export default NewPetForm