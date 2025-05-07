import "../style/Profile/Profile.css";
import "../style/Profile/Password.css"
import "../style/Profile/Favorites.css"
import { GoSignOut } from "react-icons/go";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// Onclick button render components
import ProfileInfo from "./profile-components/ProfileContainer";
import ResetPassword from "./profile-components/ResetPassword";
import FavoriteMovies from "./profile-components/FavoriteMovies";





function Profile() {

// using navigate function.    
const navigate = useNavigate();

// state variables for profile jwt verify
const [jwtState, jwtStateSet] = useState(false);
const [usernameJwt,setUsernameJwt] = useState("")
const [userInfo,setUserInfo] = useState(null);

// Verifying function for jwt when entered page Profile
useEffect(()=>{
    
    const jwtVerify = async()=>{
        
        await fetch("http://localhost:3000/verify-token",{
            method: "GET",
            credentials: "include"
        })
        .then(res=> res.json())
        .then(data=> {

            if(data.success){
                jwtStateSet(true);
                setUsernameJwt(data.username)
            }
            else{
                
                navigate('/home')
                window.location.reload()
                
            }

        })
    }

    jwtVerify()
    
},[])


//Render user information depending on the jwtState (verified or not)
useEffect(()=>{

    if(!usernameJwt) return;

    const profileInformation = async()=>{

      await fetch("http://localhost:3000/profile-information", {
        method: "POST",
        credentials : "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username: usernameJwt})
      })
      .then(res=> res.json())
      .then(data=>{

        if(data.success){
            setUserInfo(data.profileInfo)
        }


      })  


    }

    profileInformation()

},[usernameJwt])









const [profileButtonState, setProfileButtonState] = useState("profile")

const profile = ()=>{
    setProfileButtonState("profile");
}

const reset = ()=>{
    setProfileButtonState("password");
}

const favorites = ()=>{
    setProfileButtonState("favorites")
}

const signOut = async ()=>{


    await fetch("http://localhost:3000/sign-out",{
      method: "GET",
      credentials: "include"
    })
    .then(res=> res.json())
    .then(data=>{
    
      if(data.success){
        navigate('/home');
        window.location.reload();
      }
    
    })
    
}




  return (
 <div className="profile-path-main-container">

    <div className="profile-path-container">

        <div className="section-container">
            
         <div className="name-sign-out">
            <div className="profile-name">{localStorage.getItem("username")}</div>
            
            <div className="sign-out">
                <div className="sign-out-icon"><GoSignOut/></div>
                <div onClick={signOut} className="sign-out">Sign out</div>
            </div>

         </div>

            <div className="personal-information">
                <h1 className="header">Personal Information</h1>
                <ul className="buttons">
                    <li onClick={profile} className="information-buttons">My information</li>
                    <li onClick={reset} className="information-buttons">Reset password</li>
                </ul>
            </div>

            <div className="fav-movies">
                <h1 className="header">Movies</h1>
                <div onClick={favorites} className="favorite-movies">Favorite movies</div>
            </div>

        </div>

        <div className="info-container">
            
        {profileButtonState === "profile" && <ProfileInfo userInfo={userInfo} navigate={navigate}/>}
        {profileButtonState === "password" && <ResetPassword userInfo={userInfo}/>}
        {profileButtonState === "favorites" && <FavoriteMovies userInfo={userInfo}/>}
        </div>
    </div>
</div>
  )
}

export default Profile;