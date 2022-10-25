import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

   const navigate = useNavigate()

   return (<>
      <h1>maw2paw</h1>
      <button onClick={() => navigate('/about')}>about</button>
      <button onClick={() => navigate('/login')}>login</button>
   </>)
}

export default Home