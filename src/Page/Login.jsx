import React, { useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../Firebase/firebase.config';


const Login = () => {

  useEffect(()=>{
  document.title= ''
},[])

  const {signIn, signInWithGoogle}= useContext(AuthContext)

  const emailRef= useRef()



   const handleForgetPassword= ()=>{

const auth = getAuth(app);
const email = emailRef.current.value
navigate('/forgetpassword', { state: { email } }); 
console.log('vule gesi', email)


sendPasswordResetEmail(auth, email)
.then(()=>{
  alert('Please check your email')
})
.catch()
}
  const navigate= useNavigate()
  const location= useLocation()


  const handleLogin =(e)=>{
e.preventDefault()


const form = e.target
const email =form.email.value
const password = form.password.value

 


signIn(email, password)
.then(res=>{
  const user= res.user
  console.log(user)

const from = location.state?.from?.pathname || ''


const card= location.state?.card


navigate(from, {replace: true, state: card ? {card}: {}})

})
.catch((error)=>{
  const errorCode= error.code
  const errorMessage= error.message
alert(errorCode,errorMessage)
})




  }

  const handleGoogleSignIn= ()=>{
signInWithGoogle()
.then(result=>{
  console.log(result.user)
  navigate(location?.state || '/')
})
.catch(error=>{
  console.log(error)
})
  }
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            {/* Email */}
          <label className="label">Email</label>
          <input name='email' type="email" className="input" 
          ref={emailRef}
          placeholder="Email" />

          {/* Password */}
          <label className="label">Password</label>
          <input name='password' type="password" className="input" placeholder="Password" />
           <a onClick={handleForgetPassword} className="link link-hover">Forgot password?</a>
          <button type='submit' className="btn btn-neutral mt-4">Login</button>
          <p className='text-center'>-------Or login with-------</p>
         
        </fieldset>
        
        </form>
         <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Google
</button>
        <p>Don't Have Any Account? <Link to='/register' className='underline text-red-500'>Register</Link></p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;