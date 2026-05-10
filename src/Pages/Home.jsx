import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <h1>You should <Link to="/signup">Register</Link> or <Link to="/login">Login</Link> first</h1>
    </>
    
  )
}

export default Home