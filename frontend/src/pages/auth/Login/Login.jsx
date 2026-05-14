import React, { useContext, useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import './style.css'
import Placeholder from '../../../assets/Placeholder2.svg'
import Logo from '../../../assets/final-primary-logo.png';
import axios from 'axios';
import * as routes from '../../../routes/routes';
// import { AppContext } from '../../../store/AppContext';


const Login = () => {
    const navigate = useNavigate();

    // const { setUserDetails } = useContext(AppContext)

    const validate = (values) => {
        // console.log("Validating: ",values)
        const {user,password} = values
        const errors = {}
        if(!user){
            errors.user = "Username is required"
        }
        if(!password){
            errors.password = "Password is required"
        }
        else if(password.length < 8){
            errors.password = "Password must be up to 8 characters"
        }
        return errors
    }

    const handleLogin = async(values,form) => {
        console.log("Values is: ",values)
        // try{
        //     const {data} = await axios.post(`${process.env.BASE_URL}/api/login`,values)
        //     localStorage.setItem('token',data.token);
        //     console.log(data);
        //     // setUserDetails(data.payload)
        //     // navigate("/")
        // } catch(err){
        //     console.error(err)
        //     form.change("password",'')
        // }
    }
    
  return (
    <div className='login-page'>
        <div className='login-div'>
            <div className="login-view">
                <div className="logo">
                    <img src={Logo} alt='logo'/>
                </div>
                <div className="login-header">
                    <p>Sign in to ProjectHive</p>
                    <small>Don't have an account? <Link to={routes?.REGISTER}>Sign up</Link></small>
                </div>
                <Form 
                    onSubmit={handleLogin}
                    validate={(values)=>validate(values)}
                    render={({handleSubmit,form,submitting,hasValidationErrors})=>(
                        <form className='form-login' onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="username">Username or Email Address</label>
                                <Field name='user'>
                                    {
                                        ({input,meta})=>(
                                            <div className='input-with-error'>
                                                <input {...input} type='text' placeholder='Enter your username or email address' />
                                                {
                                                    meta.error && meta.touched &&
                                                    <span className='text-red-500'>{meta.error}*</span>
                                                }
                                            </div>
                                        )
                                    }
                                </Field>
                            </div>
                            <div className="input-group">
                                <label htmlFor="username">Password</label>
                                <Field name='password'>
                                    {
                                        ({input,meta})=>(
                                            <div className='input-with-error'>
                                                <input {...input} type='password' />
                                                {
                                                    meta.error && meta.touched &&
                                                    <span className='text-red-500'>{meta.error}*</span>
                                                }
                                            </div>
                                        )
                                    }
                                </Field>
                            </div>
                            <div className="forgot-password">
                                <a href='#'>Forgot Password?</a>
                            </div>
                            <button 
                                type='submit' 
                                disabled={submitting || hasValidationErrors} 
                                className={`login-btn 
                                    ${(submitting || hasValidationErrors) && 
                                    'login-disabled-btn cursor-not-allowed'}
                                `}
                            >
                                Sign in
                            </button>
                        </form>
                    )}
                />
            </div>
        </div>
        <div className='left-div'>
            <img src={Placeholder} alt='Place holder'/>
            <p className='text-5xl font-extrabold capitalize mt-0 mb-2 text-secondary'>ProjectHive</p>
            <p className='w-[50%] text-center text-sub-text'>Raise all the capital you need to start your business and achive your dreams today! </p>
        </div>
        
      
    </div>
  )
}

export default Login
