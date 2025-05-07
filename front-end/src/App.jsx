import { useState , useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Profile from './components/Profile'
import { Route , Routes } from 'react-router'

function App() {
 
  const [hamburger,hamburgerActive] = useState(false);

  const toogleHamburger = ()=>{
    if(!hamburger){
      hamburgerActive(true)
    }else{
      hamburgerActive(false)
    }
  }


  const [light,setLight] = useState(false);
  const toogleLightMode = ()=>{
    setLight(prev=> !prev)
  }

  useEffect(() => {
    document.body.classList.toggle("light", light);
  }, [light]);


  return (
    <>
    
      <Navbar  toogleHamburger={toogleHamburger} toogleLightMode = {toogleLightMode} light = {light}/>
      <Routes>
        <Route path='/home' element={<Main hamburger = {hamburger} light = {light}/>} />
        <Route path='/profile' element={<Profile light = {light}/>}/>
      </Routes>
      
      
    </>
  )
}

export default App
