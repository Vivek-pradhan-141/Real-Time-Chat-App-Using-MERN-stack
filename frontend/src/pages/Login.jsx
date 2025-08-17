import { useState ,useEffect } from 'react'
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

import { useAuthStore } from '../store/useAuthStore.js';
import AuthImagePattern from '../components/AuthImagePattern.jsx';

function Login() {
  const { isLoggingIn, logIn, logInLogo, signUpLogo } = useAuthStore();
  useEffect(()=>{
    logInLogo(true);
    signUpLogo(false);
  },[])
  

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })


  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is Required !");
    if (!formData.password.trim()) return toast.error("Password is Required !");
    if (formData.password.length < 6) return toast.error("Password must be atleast 6 characters");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format !");
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) logIn(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2 '>
      {/* left Side */}
      <div className='flex flex-col justify-center items-center p-2 sm:p-12 '>


        <div className='card bg-base-content/5 width_1 p-5 hover:border-green-400 hover:shadow-[0_0_5px_rgba(255,255,0,0.8)] group'>

          {/* logo */}
          <div className='w-full  max-w-md space-y-8'>
            <div className='text-center mb-8 '>
              <div className='flex flex-col items-center gap-2 '>
                <div className='size-12 rounded-xl bg-yellow-200/20 flex items-center justify-center group-hover:bg-yellow-200/20 group-hover:drop-shadow-[0_0_5px_rgba(255,255,0,0.8)] transition-colors' >
                  <MessageSquare className='size-6 text-primary' />
                </div>
                <h1 className='text-2xl font-bold'>Sign In</h1>
                <p className='text-base-content/60'>Sign In to your Account and start messaging</p>
              </div>
            </div>
          </div>


          <form onSubmit={handleSubmit} className='space-y-8'>

            <div className='form-control'>
              <label className='label'>
                <span className=''>Email</span>
              </label>
              <div className='relative '>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none' >
                  <Mail className='size-5 text-base-content/50' />
                </div>
                <input
                  type="email"
                  className='input input-bordered round_1 w-full pl-10'
                  placeholder='Enter Email ...'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  spellCheck={false}
                />
              </div>
            </div>

            <div className='form-control '>
              <label className='label '>
                <span className=''>Password</span>
              </label>
              <div className='relative flex'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none' >
                  <Lock className='size-5 text-base-content/50' />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className='input input-bordered round_1 w-full pl-10 pr-10 '
                  placeholder='Enter Password ...'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  spellCheck={false}
                />
                <button
                  className='absolute inset-y-0 right-0 pr-3 flex items-center '
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className='text-base-content/40' /> : <Eye className='text-base-content/40' />}
                </button>
              </div>
            </div>

            <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
              {isLoggingIn ? <><Loader2 className='size-5 animate-spin' />Signing In ...</> : ("Sign In")}
            </button>

          </form>

          <div className='text-center mt-3'>
            <p className='text-base-content/60'>
              Don't Have an Account?{" "}
              <Link to="/signup" className='link link-primary'>Sign-Up</Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join The Community :) Link and Share Your Moments With Friends and People You Care"
      />

    </div>
  )
}

export default Login
