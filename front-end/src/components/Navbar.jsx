import React, { act, useEffect } from 'react'
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu, GiToken } from "react-icons/gi";
import "../style/Navbar.css"
import "../style/login-register.css"
import blank from "../assets/blank-profile.webp"
import { VscSettings } from "react-icons/vsc";
import { IoStarOutline } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { useState } from 'react';
import { RiMovie2Line } from "react-icons/ri";
import { Link } from "react-router";
import { IoCloseOutline } from "react-icons/io5";
import {jwtDecode} from "jwt-decode"





function Navbar({toogleHamburger, toogleLightMode , light}) {

  const navigate = useNavigate();

  // Active class for User Profile Icon

const [active,isActive] = useState(false)

const showUserMenu = ()=>{
  if(active){
    isActive(false)
  }else{
    isActive(true)
  }
  
}
// LOGIN STATE FOR BUTTON RENDER.
const [loggedIn,setLogin] = useState(false);
const [loggedUsername,setLoggedUsername] = useState("");
  
// LOGIN INPUT VALUE STATE VARIABLES.
const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

// INPUT VALUE SETTER FUNCTIONS
const usernameValue = (e)=>{
  setUsername(e.target.value);
}

const passwordValue = (e)=>{
  setPassword(e.target.value);
}


// LOGIN AND REGISTER CONDITIONAL RENDER 
const [showLogin, setShowLogin] = useState(false);
const [showRegister, setShowRegister] = useState(false); 

// BACKGROUND FILTER FUNCTION
const [pop,setPop] = useState(false);

// ONCLICK FUNCTION FOR LOGIN/REGISTER

const showLoginBox = ()=>{
  setShowLogin(true)
  isActive(false)
  setPop(true)
  setMessage("")
}

const closeLoginBox =()=>{
  setShowLogin(false)
  setPop(false)
}

const showRegisterBox = ()=>{
  setShowLogin(false);
  setShowRegister(true)
  setPop(true)
  setUsername("")
  setPassword("")
}

const closeRegisterBox = ()=>{
  setShowRegister(false)
  setPop(false)
  setMessage("")
}

// ONSUBMIT FUNCTION FOR REGISTER.
const [message,setMessage] = useState("");
// MESSAGE COLOR SETTER 
const [green,setGreen] = useState(false);
const [red,setRed] = useState(false);


// REGISTER FORM SUBMIT FUNCTION
const  submitRegister = async (e)=>{
  e.preventDefault()

      
      const credentials = {username: username , password: password}
      console.log(credentials);
      
      

       await fetch("http://localhost:3000/register",{
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(credentials)
          
      })
      .then(res=> res.json())
      .then(data=> {
        if(data.success){
          
          setMessage(data.message)
          setRed(false)
          setGreen(true);

          

        }else{
          setMessage(data.message);
          setGreen(false)
          setRed(true)
        }


      } )



}



// LOGIN FORM SUBMIT FUNCTION
const submitLogin = async (e)=>{
  e.preventDefault();

  setGreen(false);
  setRed(false)
  setMessage("");

  const loginData = {username: username, password : password}

  await fetch("http://localhost:3000/login",{
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(loginData),
    credentials: "include"
  })
  .then(res=> res.json())
  .then(data => {
   
    if(data.success){
      setRed(false)
      setGreen(true)
      setMessage(data.message)
      setLogin(true)
      setLoggedUsername(username)
      setUsername("")
      setPassword("")
      setTimeout(()=>{
        closeLoginBox()
      },1000)
      
            
      
    }else{
      setGreen(false)
      setRed(true)
      setMessage(data.message)
      
    }
  
  
  })

}

// JWT VERIFY AND DECODE FOR PROFILE ROUTE AND CONDITIONAL BUTTON RENDERING.

  useEffect(()=>{
    const verifyUser = async ()=>{

     await fetch("http://localhost:3000/verify-token",{
        method: "GET",
        credentials: "include"
      })
      .then(res=> res.json())
      .then(data=>{
        
        if(data.success){
          setLogin(true)
          setLoggedUsername(data.username);
        
        }else{

          setLogin(false)
          setLoggedUsername("");

        }

      
      
      })


    }
    verifyUser();

  },[])


// Signout button 
const signOut = async ()=>{


await fetch("http://localhost:3000/sign-out",{
  method: "GET",
  credentials: "include"
})
.then(res=> res.json())
.then(data=>{

  if(data.success){
    setLoggedUsername("")
    setLogin(false);
    navigate('/home');
    window.location.reload();
  }

})

}



  

return (
    <header className={`${light ? "light" : ""}`}>
        <div className="header-container ">
        <div className={`background-filter ${pop ? "active": ""}`}></div>
          <div onClick={toogleHamburger} className={`hamburger-icon ${light ? "light" : ""}`}>< GiHamburgerMenu /></div>
          <Link className='link-for-website-name' to="/home">
          <div className={`website-name ${light ? "light" : ""}`}>
            
            <div className={`website-icon ${light ? "light" : ""}`}>< RiMovie2Line /></div>
            <div className={`name ${light ? "light" : ""}`}>Movie Container</div>
          </div>
          </Link>
          <div onClick={showUserMenu} className={`user-profile ${light ? "light" : ""}`}><CgProfile/></div>

          {/* User Icon dropdown Menu */}
          <div className={`profile-container ${active ? "active" : ""} ${light ? "light" : ""}`}>
            
            <div onClick={!loggedIn ? showLoginBox : null} className={`pp-username ${light ? "light" : ""}`}>
              
            <img src={blank} className="profile-picture"></img>
            {loggedIn ?<Link className='link-to-profile' to="/profile"> <div className={`profile-username ${light ? "light" : ""}`}> {loggedUsername}</div> </Link> :
                        <div onClick={!loggedIn ? showLoginBox : null} className={`profile-username ${light ? "light" : ""}`}> Log in </div> }
            </div>
            
            
            
            
                 

            <div className="break"></div>

            <div onClick={toogleLightMode} className="theme-button">
              <div className="theme-icon"><MdLightMode /></div>
              <div className={`theme ${light ? "light" : ""}`}>Change Theme</div>
            </div>

            <div className="break"></div>
            {loggedIn ?  <div onClick={signOut} className="exit-button">
              <div className="exit-icon"><GoSignOut /></div>
              <div className={`exit ${light ? "light" : ""}`}>Sign Out</div>
            </div> : ""}
           
          </div>
          {/* User icon dropdown menu code end */}


          {/* LOGIN REGISTER FORM RENDERING  */}
          {showLogin && (
      <form onSubmit={(e)=> submitLogin(e)} className={`login-container ${light ? "light" : ""}`}>
          <div className="close-button" onClick={() => closeLoginBox() }><IoCloseOutline /></div>
           <h1>MovieContainer Login</h1>
           <div className="username">
             <p>Username</p>
             <input onChange={usernameValue} type="text" value={username} maxLength={8} />
          </div>
           <div className="password">
           <p>Password</p>
           <input onChange={passwordValue} type="password" value={password} />
         </div>
         <a href="#">Forget your password?</a>
          <button type='submit' className="button-login">Login</button>
          <div className={`server-message ${green? "green" : ""} ${red ? "red" : ""}`}>{message ? message : ""}</div>
          <div className="register" onClick={() => showRegisterBox()}>
          Don't have an account? Register
      </div>
    </form>
)}

     {showRegister && (
     <form onSubmit={(e)=> submitRegister(e)}  className={`login-container ${light ? "light" : ""}`}>
       <div className="close-button" onClick={() => closeRegisterBox()}><IoCloseOutline /></div>
         <h1>MovieContainer Register</h1>
         <div className="username">
           <p>Username</p>
          <input onChange={usernameValue} type="text" value={username} maxLength={8} />
        </div>
      <div className="password">
         <p>Password</p>
         <input onChange={passwordValue} type="password" value={password} />
     </div>
       <button type='submit' className="button-login">Register</button>
       <div className={`server-message ${green? "green" : ""} ${red ? "red" : ""}`}>{message ? message : ""}</div>
     <div className="register" onClick={() => { closeRegisterBox(); showLoginBox(); }}>
      Already have an account? Login
      </div>
     </form>
)}

        </div>
    </header>
  )
}

export default Navbar