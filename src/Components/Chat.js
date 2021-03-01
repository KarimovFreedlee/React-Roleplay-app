import React, { useState } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer'; 
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"


  export default function Chat() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  return <div>
      <Header/>
      <Body/>
      <Footer/>
  </div>
}


