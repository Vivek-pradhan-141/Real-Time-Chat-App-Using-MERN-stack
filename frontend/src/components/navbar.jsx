import { useNavigate } from "react-router-dom";
import { Link } from 'react-router';
import { MessageSquare, Settings, LogOut, LogIn, UserPen, User } from 'lucide-react';

import { useAuthStore } from '../store/useAuthStore.js'
import ConfirmPopup from "./ConfirmPopup.jsx";
import { useState } from "react";

function navbar() {
  const { Logout, authUser, signUpPage, logInPage } = useAuthStore();
  const [confirm, setConfirm] = useState(false);

  const handleLogout = () => {
    setConfirm(false);
    Logout();
  }



  return (
    <header className='bg-base-300/100 fixed w-full top-0 z-40 backdrop-blur-lg'>
      <div className='container mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>


          {/* left side */}
          <div className='flex items-center gap-8'>
            <Link to="/" className='flex items-center gap-1 transition-all group '>
              <div className='size-12 rounded-xl  flex items-center justify-center transition-colors ' >
                <MessageSquare className='size-6 text-primary group-hover:drop-shadow-[0_0_12px_rgba(255,255,100,1)] font-bold  ' />
              </div>
              <span className="text-base-content/90 font-bold">Pal-Talk</span>
            </Link>
          </div>

          {/* right */}
          <div className='flex items-center gap-3 '>

            <Link to={"/settings"} className={'btn btn-sm gap-2 transition-colors hover:drop-shadow-[0_0_5px_rgba(255,255,0,0.8)] hover:text-yellow-600 '}>
              <Settings className='s-5 text-base-content/80 font-bold ' />
              <span className='hidden sm:inline'>Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-md gap-2 hover:drop-shadow-[0_0_5px_rgba(255,255,0,0.8)] hover:text-yellow-600 ">
                  <User className="size-5 text-base-content/80 font-bold " />
                  <span className="hidden sm:inline ">Profile</span>
                </Link>

                <button className='flex items-center gap-2 btn hover:drop-shadow-[0_0_5px_rgba(255,0,0,0.8)] hover:text-red-500 ' onClick={() => setConfirm(true)}>
                  <LogOut className='size-5 text-base-content/80 font-bold ' />
                  <span className='hidden sm:inline '>Log-Out</span>
                </button>

                {confirm && (
                  <ConfirmPopup
                    message="Are you sure you want to log out?"
                    onConfirm={handleLogout}
                    onCancel={() => setConfirm(false)}
                  />
                )}

              </>
            )}

            {!logInPage && (
              <Link to={"/login"} className='flex items-center gap-2 btn hover:text-green-500 hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]'>
                <LogIn className='size-5 text-base-content/80 font-bold ' />
                <span className='hidden sm:inline '>Sign-In</span>
              </Link>
            )}

            {!signUpPage && (
              <Link to={"/signup"} className='flex items-center gap-2 btn hover:text-green-500 hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] ' >
                <UserPen className='size-5 text-base-content/80 font-bold ' />
                <span className='hidden sm:inline '>Sign-Up</span>
              </Link>
            )}

          </div>

        </div>
      </div>
    </header>
  )
}

export default navbar
