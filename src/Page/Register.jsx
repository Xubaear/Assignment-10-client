import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
  useEffect(()=>{
    document.title= ''
  })
const [success, setSuccess]= useState(false)
  const [error, setError]=useState('')


const {createUser, setUser, signInWithGoogle}= use(AuthContext)

  const handleRegister=(e)=>{
    e.preventDefault()

    setError('')
    setSuccess(false)


    const form= e.target
    const name= form.name.value
    const photo= form.photo.value
    const email= form.email.value
    const password= form.password.value
console.log({name,photo})

const  passwordPattern= /^.{6,}$/
const casePatterns= /^(?=.*[a-z])(?=.*[A-Z]).+$/


if(!passwordPattern.test(password)){
  setError('Password must be six characters or more')
  return
}else if(!casePatterns.test(password)){
setError('Password must have at least one uppercase & one lowercase character')
return
}


    createUser(email, password)
    .then(res=>{
      const user= res.user
     setUser(user)
     setSuccess(true)
    })
    .catch(error=>{
     setError(error.message)
    })
  }

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body items-center">
        <h1 className="text-5xl font-bold ">Register Now!</h1>
       <form  onSubmit={handleRegister}> 
            
         <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input name='name' type="text" className="input" placeholder="Your Name" required/>

          {/* Photo URL */}
          <label className="label">Photo URL</label>
          <input name='photo' type="text" className="input" placeholder="URL" required />

          {/* Email */}
          <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" required/>

          {/* Password */}
          <label className="label">Password</label>
          <input name='password' type="password" className="input" placeholder="Password" required/>
          {/* <div><a className="link link-hover">Forgot password?</a></div> */}
         
        </fieldset>
        {
          success && <p className='text-green-500'>Account created successfully.</p>
        }

        {
          error && <p className='text-red-500'>{error}</p>
        }
        <div className='text-center'>
          <button type='submit' className="btn btn-neutral w-1/2">Register</button>
        </div>
       </form>

        
          
           <p className='text-center'>-------Or register with-------</p>
          <button onClick={handleGoogleRegister}  className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Google
</button>
        <p>Already Have An Account? <Link  to='/login' className='underline text-green-500'>Login</Link></p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;