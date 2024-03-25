import React from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {

  const onSubmit = e => {
    e.preventDefault();
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>
          <input type="text" name="" id="" placeholder='Full Name' />
          <input type="email" name="" id="" placeholder='Email' />
          <input type="password" name="" id="" placeholder='Password' />
          <input type="password" name="" id="" placeholder='Password Confirmation' />
          <button className="btn btn-block">Signup</button>
          <p className="message">Already Registered? <Link to='/login'>Sign in</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup