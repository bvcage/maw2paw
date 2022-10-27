import React from 'react'
import { useNavigate } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'

function Home (props) {
   const navigate = useNavigate()
   const [ref, {height}] = useMeasure()
   const styles = useSpring({to: height > 0 ? height : 'auto'})

   return (
      <div ref={ref} className='container'>
         <animated.div style={styles}>
            <div className="button" onClick={() => navigate('/about')}>about</div>
            <div className="button" onClick={() => navigate('/login')}>login</div>
            <div className="button" onClick={() => navigate('/signup')}>sign up</div>
         </animated.div>
      </div>
   )
}

export default Home