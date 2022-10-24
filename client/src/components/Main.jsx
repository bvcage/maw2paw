import React from 'react'
import Header from './Header'

function Main (props) {
   const { onLogout } = props
   return (
      <Header onLogout={onLogout} />
   )
}

export default Main