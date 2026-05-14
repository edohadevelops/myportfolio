import React, { useContext, useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import Logo from '../../../assets/final-white-logo.png';
import axios from 'axios';
// import { AppContext } from '../../../store/AppContext';

const Register = () => {

    const navigate = useNavigate();
    // const { setUserDetails } = useContext(AppContext)

    const handleRegister = async(values,form) => {
        console.log(values)
        // try{
        //     const {data} = await axios.post(`${process.env.BASE_URL}/api/register`,values)
        //     console.log(data);
        //     localStorage.setItem("token",data.token)
        //     // setUserDetails(data.payload)
        //     navigate("/onboarding")
        // } catch(err){
        //     console.error(err)
        //     // form.restart()
        // }
    }
    const registerValidate = async(values) => {
        const {username, email, password} = values
        const errors = {}

        if(!username){
            errors.username = "Username is required*"
        }else if(username.length < 7){
            errors.username = "Username should be at least 7 characters long*"
        }
        if(!email){
            errors.email = "Email address is required*"
        }
        if(!password){
            errors.password = "Password is required*"
        }
        else if(password.length < 8){
            errors.password = "Password must be at least 8 characters long*"
        }
        return errors

    }
  return (
    <div className='register-page'>
        
        <div className='welcome-section'>
            <div className='register-logo'>
                <img src={Logo} alt='white-logo' />
            </div>
            <div className='welcome-info'>
                <p className='welcome-register'>Welcome Back!</p>
                <p className='register-description'>Raise all the capital you need to start your business and achive your dreams today! </p>
                <Link to='/login' className='back-to-login'>Sign in</Link>
            </div>
            
        </div>
        <div className="register-view">
            <div className="register-header">
                    <div>
                    <p>Create Account</p>
                    <small>Already have an account? <Link to="/login">Login</Link></small>  
                </div>     
            </div>
            <Form 
                onSubmit={handleRegister}
                validate={registerValidate}
                render={({submitting,hasValidationErrors,handleSubmit})=>(
                    <form className='form-register' onSubmit={handleSubmit}>
                        <div className="register-input-group">
                            <label htmlFor="username">Username</label>
                            <Field name='username'>
                                {
                                    ({input,meta})=>(
                                        <div>
                                            <input {...input} type='text' placeholder='Username' />
                                            {
                                                meta.error && meta.touched &&
                                                <span className='text-red-500'>{meta.error}</span>
                                            }  
                                        </div>
                                    )
                                }
                            </Field>
                        </div>
                        <div className="register-input-group">
                            <label htmlFor="username">Email Address</label>
                            <Field name='email'>
                                {
                                    ({input,meta})=>(
                                        <div>
                                            <input {...input} type='text' placeholder='Email Address' />
                                            {
                                                meta.error && meta.touched &&
                                                <span className='text-red-500'>{meta.error}</span>
                                            }  
                                        </div>
                                    )
                                }
                            </Field>
                        </div>
                        <div className="register-input-group">
                            <label htmlFor="username">Password</label>
                            <Field name='password'>
                                {
                                    ({input,meta})=>(
                                        <div>
                                            <input {...input} type='password' />
                                            {
                                                meta.error && meta.touched &&
                                                <span className='text-red-500'>{meta.error}</span>
                                            }  
                                        </div>
                                    )
                                }
                            </Field>
                        </div>
                        <button 
                            type='submit' 
                            className={`register-btn 
                                ${(submitting || hasValidationErrors) && 
                                'register-disabled-btn cursor-not-allowed'
                            }`} 
                            disabled={submitting || hasValidationErrors}
                        >
                            Sign in
                        </button>
                    </form>
                )}
            />
            
        </div>
        
      
    </div>
  )
}

export default Register
