import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Footer (props) {
   const navigate = useNavigate()
   const loc = useLocation()
   const path = loc.pathname.split('/')

   const backBtn = path.length > 3 && !path.includes("all") ? <button onClick={() => navigate(-1)}>back</button> : null

   return (
      <div id="footer">
         {backBtn}
      </div>
   )
}

export default Footer