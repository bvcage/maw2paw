import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewOwnerForm from './NewOwnerForm'
import OwnerProfile from './OwnerProfile'
import OwnersList from './OwnersList'

function OwnersPage (props) {
   const { owners, onNewOwner } = props
   return (
      <Routes>
         <Route index element={<OwnersList owners={owners} />} />
         <Route path="new" element={<NewOwnerForm onNewOwner={onNewOwner} />} />
         <Route path=":id" element={<OwnerProfile owners={owners} />} />
      </Routes>
   )
}

export default OwnersPage