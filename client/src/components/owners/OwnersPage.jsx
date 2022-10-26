import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OwnerForm from './OwnerForm'
import OwnerPage from './OwnerPage'
import OwnersList from './OwnersList'

function OwnersPage (props) {
   const { owners, onEditOwner, onNewOwner } = props
   return (
      <Routes>
         <Route index element={<OwnersList owners={owners} />} />
         <Route path="new" element={<OwnerForm onNewOwner={onNewOwner} />} />
         <Route path=":id/*" element={<OwnerPage onEditOwner={onEditOwner} />} />
      </Routes>
   )
}

export default OwnersPage