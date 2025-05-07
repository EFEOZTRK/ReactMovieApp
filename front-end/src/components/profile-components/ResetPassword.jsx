import React, { useState } from 'react'
import { MdLockReset } from "react-icons/md";



function ResetPassword() {

  //state variabes for input fields
  const [password,setPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [repeatPassword,setRepeatPassword] = useState("")
  // Server message or error message variable
  const [message,SetMessage] = useState("")
  
  // onChange functions for input fields
  const currentPassword = (e)=>{
    setPassword(e.target.value);
  }

  const newPasswordFirst = (e)=>{
    setNewPassword(e.target.value)
  }

  const newPasswordSecond = (e)=>{
    setRepeatPassword(e.target.value)
  }


  // onSubmit form function.
  const submitPasswordForm = async (e)=>{
    e.preventDefault();

    //Check if all fields are filled 
    if(password && newPassword && repeatPassword){

         if(newPassword !== repeatPassword){
           //Check if new passwords are identical if every field is filled
           SetMessage("New password fields not identical!")
    
          }else{
            // If every field is filled and newPasswords match
            const passwordObj = {password: password, first: newPassword, second: repeatPassword};
            
            await fetch("http://localhost:3000/reset-password",{
              method: "POST",
              credentials: "include",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(passwordObj)
            })
            .then(res=> res.json())
            .then(data=> {

              if(data.success){
                SetMessage(data.msg)
                setPassword("")
                setNewPassword("")
                setRepeatPassword("")
                
              }
              else{
                SetMessage(data.msg);
                setPassword("")
                setNewPassword("")
                setRepeatPassword("")
               
              }


            })

          }

    }else{
      // If one or more fields are empty
      SetMessage("Please fill every field!")
    }
    

  }




  return (
    <form onSubmit={(e)=> submitPasswordForm(e)} className="password-reset-container">
      
      <div className="reset-password-header">
        <div className="reset-password-icon"><MdLockReset/></div>
        <div className="reset-password-text">Reset password</div>
      </div>

      <div className="reset-password-input-container">

        <div className="current-password-container">
          <p className="current-password-text">Current password</p>
          <input onChange={(e)=>currentPassword(e)} value={password} type="password" name="" id="1" />
        </div>

        <div className="new-password-container">
          <p className='new-password-text'>New password</p>
          <input onChange={(e)=>newPasswordFirst(e)} value={newPassword}  type="password" name="" id="2" />
        </div>

        <div className="new-password-container">
          <p className='new-password-text'>New password again</p>
          <input onChange={(e)=>newPasswordSecond(e)} value={repeatPassword} type="password" name="" id="3" />
        </div>

        <div className="server-message">{message}</div>

        <button className="reset-password-button">Reset Password</button>
        

      </div>

    </form>
  )
}

export default ResetPassword