import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react"
import { Toaster } from "react-hot-toast"

import Navbar from "./components/navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx"
import Settings from "./pages/Settings.jsx"
import Profile from "./pages/Profile.jsx"


import { api } from "./lib/axios.js"
import { useAuthStore } from "./store/useAuthStore.js"
import { useThemeStore } from "./store/useThemeStore.js"


function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();   // we want to check the state of authorised user in the homepage in the very start
  const {theme} = useThemeStore();

  // console.log(onlineUsers);


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  //Loading icon 
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    )
  }


  return (
    <div className='' data-theme={theme}>
      {/* <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"></div> */}
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App

// Under HomePage if user is authenticated i.e he is logged-in then he'll go to homePage else go to login page!
// we can also write like this <Route path="/" element={authUser ? <HomePage /> : <Login />} /> 