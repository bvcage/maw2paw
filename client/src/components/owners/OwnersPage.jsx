import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewOwnerForm from './NewOwnerForm'
import OwnersList from './OwnersList'

function OwnersPage (props) {
   const { owners } = props
   return (
      <Routes>
         <Route index element={<OwnersList />} />
         <Route path="new" element={<NewOwnerForm />} />
      </Routes>
   )
}

export default OwnersPage