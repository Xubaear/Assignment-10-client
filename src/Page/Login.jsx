import React, { useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router'; // ✅ তুমি react-router use করছো, তাই রেখে দেওয়া হয়েছে
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  const { signIn, signInWithGoogle } = useContext(AuthContext); // ✅ use(AuthContext) নয়, useContext(AuthContext)
  const emailRef = useRef();

  const navigate = useNavigate(); // ✅ react-router v6 এ এটা কাজ করে
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);

        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl -mt-100">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label mt-10">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  ref={emailRef}
                  placeholder="Email"
                />

                <label className="label">Password</label>
                <input name="password" type="password" className="input" placeholder="Password" />

                <button type="submit" className="btn btn-neutral mt-4">
                  Login
                </button>

                <p className="text-center">-------Or login with-------</p>
              </fieldset>
            </form>

            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
              Google
            </button>

            <p>
              Don't Have Any Account?{' '}
              <Link to="/register" className="underline text-red-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
