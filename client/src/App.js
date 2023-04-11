import './App.css';
import { Routes, Route, Navigate} from "react-router-dom"
import React, { useEffect, useState } from 'react';

import Home from './components/Home';
import Landing from './components/Landing';
import ListBukuTamu from './components/bukutamu/List';
import AddBukuTamu from './components/bukutamu/Add';
import AddSurvey from './components/survey/Add';
import Verifikasi from './components/bukutamu/Verifikasi';

import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"

function App() {
  const [ user, setUser ] = useState([]);
 
//memunculkan popup window login google account
const login = useGoogleLogin({
  onSuccess: (codeResponse) => {
    setUser(codeResponse)
  },
  onError: (error) => console.log('Login Failed:', error)
});
  
useEffect(() => {
  const verify = async () => {

    if(user.access_token !== undefined){
      await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
        }
      }).then((res) => {
        console.log("res1 ",res.data)
          return handleLogin(res.data)
      })
      .catch((err) => console.log(err));
    }

  }

  verify()
},[user]); 

const handleLogin = async (credential) => {
    await axios.post("https://bukutamu.pta-papuabarat.go.id/bukutamu-api/api/v1/verify", {data:credential}).then((response)=>{
      console.log("res2 ",response.data)
      localStorage.setItem("user", JSON.stringify(response.data))
    }).catch((err)=>console.log(err))
    await new Promise(resolve => setTimeout(resolve, 2500));
    window.location.reload()
}

const data = JSON.parse(localStorage.getItem("user"))

  if(data){
    var role_id = data.role_id 
  }else{
    var role_id = ""
  }
      return (
        <Routes>
          <Route path="/" element={data ? <Navigate to={"/home"} /> : <Landing login={login} />} />
          <Route path="/home" element={data ? <Home user={data}/> : <Navigate to="/" />} />
          <Route path="/add" element={role_id === 2 ? <AddBukuTamu user={data}/> : <Navigate to="/" />} />
          <Route path="/list" element={role_id === 2 ? <ListBukuTamu user={data}/> : <Navigate to="/" />} />
          <Route path="/verifikasi" element={role_id === 1 ? <Verifikasi user={data}/> : <Navigate to="/" />} />
          <Route path="/survey/add" element={role_id === 2 ? <AddSurvey user={data}/> : <Navigate to="/" />} />
        </Routes>
    ); 
  
}

export default App;
