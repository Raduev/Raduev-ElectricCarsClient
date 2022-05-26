import React from 'react'
import logo from "../assets/logo1.png"
import "./header.css"

const Header = () => {

  return (
    <>
    <div className='header'>
      <div className='insideHeader'>
        <div className='logoDiv'>
            <img className='logo' src={logo} alt="" />
        </div>
        </div>
    </div>
    </>
  )
}

export default Header