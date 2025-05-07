import React from 'react'
import { VscSettings } from "react-icons/vsc";
import { useState } from 'react';


function ProfileInfo({userInfo , navigate}) {

    if(!userInfo){
        return null;
    }


    //State variables for input fields
    const [name,setName] = useState(userInfo.name || "");
    const [lastName,setLastName] = useState(userInfo.lastname || "");
    const [email,setEmail] = useState(userInfo.email || "");

    const [alertBox,setAlertBox] = useState("");
    

    const nameChange = (e)=>{
        setName(e.target.value);
    }
    const lastNameChange = (e)=>{
        setLastName(e.target.value);
    }
    const emailChange = (e)=>{
        setEmail(e.target.value);
    }
    
    
    
    //onSubmit form function
    const userFormSubmit = async(e)=>{
        e.preventDefault();


        if(userInfo.name !== name || userInfo.lastname !== lastName || userInfo.email !== email){
            // If one of the  user information on the form is changed then. 
            const replaceObj = {name: name , lastname:lastName , email:email};

            fetch("http://localhost:3000/save-profile",{
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(replaceObj)
            })
            .then(res=> res.json())
            .then(data=>{

            
                if(data.success){
                    setAlertBox(data.msg);
                    window.location.reload();

                }
                else{
                    setAlertBox(data.msg);
                    window.location.reload();
                    navigate('/home')
                }


            })


        }else{
            // If credentials are the same then.
            setAlertBox("User information are the same!")
        }

    }
    
    

  return (
    <form onSubmit={(e)=> userFormSubmit(e)} className="profile-inputs">
        
        <div className="header-text-container">
           <div className="header-text-icon"><VscSettings/></div>
           <div className="header-text">Personal Information</div>

        </div>
        <div className="inputs">
            
            <div className="input-boxes">
                <p className='user-name'>Username</p>
                <input type="text" value={userInfo.username} disabled />
            </div>

            <div className="input-boxes">
                <p className='name'>Name</p>
                <input onChange={(e)=> nameChange(e)} type="text" maxLength={10} value={name} />
            </div>

            <div className="input-boxes">
                <p className='last-name'>Last name</p>
                <input onChange={(e)=> lastNameChange(e)} type="text" maxLength={10} value={lastName} />
            </div>

            <div className="input-boxes">
                <p className='gmail'>Email</p>
                <input onChange={(e)=> emailChange(e)} type="email" value={email} />
            </div>

            <div className="server-message">{alertBox}</div>

            <button type='submit' className='profile-info-save-button'>
                Save
            </button>

        </div>
        

    </form>
  )
}

export default ProfileInfo