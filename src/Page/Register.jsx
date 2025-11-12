import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router'; // ✅ তুমি যেভাবে ব্যবহার করছো, ঠিক সেভাবেই থাকছে
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
  useEffect(() => {
    document.title = 'Register';
  }, []);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // ❌ তুমি use(AuthContext) লিখেছো — এটা ভুল
  // ✅ নিচের মতো useContext(AuthContext) করতে হবে
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext); // 👉 এটা change করা হয়েছে

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ name, photo });

    const passwordPattern = /^.{6,}$/;
    const casePatterns = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

    if (!passwordPattern.test(password)) {
      setError('Password must be six characters or more');
      return;
    } else if (!casePatterns.test(password)) {
      setError('Password must have at least one uppercase & one lowercase character');
      return;
    }

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body items-center">
            <h1 className="text-5xl font-bold">Register Now!</h1>

            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input name="name" type="text" className="input" placeholder="Your Name" required />

                <label className="label">Photo URL</label>
                <input name="photo" type="text" className="input" placeholder="Photo URL" required />

                <label className="label">Email</label>
                <input name="email" type="email" className="input" placeholder="Email" required />

                <label className="label">Password</label>
                <input name="password" type="password" className="input" placeholder="Password" required />
              </fieldset>

              {success && <p className="text-green-500 mt-2">Account created successfully.</p>}
              {error && <p className="text-red-500 mt-2">{error}</p>}

              <div className="text-center">
                <button type="submit" className="btn btn-neutral w-1/2">
                  Register
                </button>
              </div>
            </form>

            <p className="text-center mt-3">------- Or register with -------</p>

            <button onClick={handleGoogleRegister} className="btn bg-white text-black border-[#e5e5e5]">
              Google
            </button>

            <p>
              Already Have An Account?{' '}
              <Link to="/login" className="underline text-green-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
