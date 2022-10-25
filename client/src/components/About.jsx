import React from 'react'
import { useNavigate } from 'react-router-dom'

function About() {
   
   const navigate = useNavigate()

   return (<>
      <button onClick={() => navigate(-1)}>back</button>
      <h2>About</h2>
   </>)
}

export default About