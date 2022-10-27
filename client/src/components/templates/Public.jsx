import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'
import About from '../About'
import Home from '../Home'
import Login from '../Login'
import SignUp from '../SignUp'

function Public (props) {
   const { onLogin, onSignup } = props
   const navigate = useNavigate()

   const [ref, {height: divHeight}] = useMeasure()
   const prevHeight = useRef(divHeight)
   
   useEffect(() => {
      if (divHeight !== prevHeight) prevHeight.current = divHeight
   }, [divHeight, prevHeight])

   const styles = useSpring({
      from: {height: prevHeight},
      to: {height: divHeight}
   })

   return (
      <animated.div ref={ref} className='container' styles={styles}>
         <h1 className='logo' onClick={() => navigate('/')}>maw2paw</h1>
         <animated.div>
         <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login onLogin={onLogin} />} />
            <Route path="signup" element={<SignUp onSignup={onSignup} />} />
         </Routes>
         </animated.div>
      </animated.div>
   )
}

export default Public