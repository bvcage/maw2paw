import React, { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import OwnerForm from './OwnerForm'
import OwnerProfile from './OwnerProfile'

function OwnerPage (props) {

   const { onEditOwner } = props

   const [owner, setOwner] = useState({})
   const params = useParams()

   useEffect(() => {
      fetch(`/owners/${params.id}`).then(r=>r.json()).then(setOwner)
   }, [params])

   function handleEditOwner (edits) {
      setOwner(edits)
      onEditOwner(edits)
   }
   
   return (
      <Routes>
         <Route index element={<OwnerProfile owner={owner} />} />
         <Route path="edit" element={<OwnerForm owner={owner} onEditOwner={handleEditOwner} />} />
      </Routes>
   )
}

export default OwnerPage