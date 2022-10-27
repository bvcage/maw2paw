import React, { useEffect, useState } from 'react'

function PetsTable (props) {
   const { onClick } = props

   const [pets, setPets] = useState([])

   useEffect(() => {
      if (!!props.pets) {
         setPets(props.pets)
      } else {
         fetch('/pets').then(r=>r.json()).then(setPets)
      }
   }, [props])
   
   const rows = !!pets ? pets.map(pet => {
      const ownersList = !!pet.owners ? pet.owners.map(owner=>owner.full_name).join(", ") : null
      return (
         <tr key={pet.id} onClick={!!props.onClick ? () => onClick(pet, false) : null}>
            <th scope="row">{pet.name}</th>
            <td>{pet.birthday}</td>
            <td>{ownersList}</td>
         </tr>
      )
   }) : null

   return (
      <table id="pets-table" className="table">
         <thead>
            <tr>
               <th>name</th>
               <th>birthday</th>
               <th>owner(s)</th>
            </tr>
         </thead>
         <tbody>
            {rows}
         </tbody>
      </table>
   )
}

export default PetsTable
