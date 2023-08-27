import React from 'react'
import '../Components/Banner.css'
import { Container } from 'react-bootstrap'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div id='banner' className='banner--main'
    >
        <Container className='banner--content'>
            <div className='banner--tagline'>
              <h1 style={{ color: 'white', fontFamily: 'Montserrat', height: "40%", fontSize: 'xx-large' }}>Crypto Hunter</h1>  
            </div>  
              <p className='banner--text'>Get All the Info Regarding Your Favorite Crypto Currency </p> 
            <Carousel />
        </Container>
    </div>
  )
}

export default Banner