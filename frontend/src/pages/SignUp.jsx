import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from "react-router-dom"
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import { api } from '../lib/axios.js';
import toast, { Toaster } from 'react-hot-toast';


const SignUp = () => {
  const { signUp, isSigningUp, signUpLogo, logInLogo } = useAuthStore();
  useEffect(()=>{
    signUpLogo(true);
    logInLogo(false);
  },[]);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })


  const validateForm = () => {
    if(!formData.email.trim()) return toast.error("Email is Required !");
    if(!formData.password.trim()) return toast.error("Password is Required !");
    if(formData.password.length<6) return toast.error("Password must be atleast 6 characters");
    if(!formData.name.trim()) return toast.error("Full Name Required !");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format !");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success===true) signUp(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2 '>
      {/* left Side */}
      <div className='flex flex-col justify-center items-center p-2 sm:p-12 '>


        <div className='card bg-base-content/5 width_1 p-5 hover:shadow-[0_0_5px_rgba(255,255,0,0.8)] group'>

          {/* logo */}
          <div className='w-full  max-w-md space-y-8'>
            <div className='text-center mb-8 '>
              <div className='flex flex-col items-center gap-2 '>
                <div className='size-12 rounded-xl bg-yellow-200/20 flex items-center justify-center group-hover:bg-yellow-200/20 group-hover:drop-shadow-[0_0_5px_rgba(255,255,0,0.8)] transition-colors' >
                  <MessageSquare className='size-6 text-yellow-500' />
                </div>
                <h1 className='text-2xl font-bold'>Create Account</h1>
                <p className='text-base-content/60'>Get started with your free account !</p>
              </div>
            </div>
          </div>


          <form onSubmit={handleSubmit} className='space-y-6'>

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
              <label className='label'>
                <span className=''>Password</span>
              </label>
              <div className='relative flex'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none' >
                  <Lock className='size-5 text-base-content/50' />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className='input input-bordered round_1 w-full pl-10 pr-10'
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

            <div className='form-control'>
              <label className='label'>
                <span className=''>Full Name</span>
              </label>
              <div className='relative '>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none' >
                  <User className='size-5 text-base-content/50' />
                </div>
                <input
                  type="text"
                  className='input input-bordered round_1 w-full pl-10'
                  placeholder='Enter Your Name ...'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  spellCheck={false}
                />
              </div>
            </div>

            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
              {isSigningUp ? <><Loader2 className='size-5 animate-spin' />Creating Account ...</> : ("Create Account")}
            </button>

          </form>

          <div className='text-center mt-3'>
            <p className='text-base-content/60'>
              Already have an Account?{" "}
              <Link to="/login" className='link link-primary'>Sign-in</Link>
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

export default SignUp
