import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext"
import {  useHistory } from "react-router-dom"
import { Button } from "@material-ui/core";


  export default function Header() {
  const [ error, setError] = useState("")
  const {  logout } = useAuth()
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

  function toCharacterList(){
    history.push('/')
  }

  function toChatList(){
    history.push('/chat_list')
  }

  


  return <div>
      <Button onClick={toCharacterList}>To my characters</Button>
      <Button onClick={toChatList}>To chat rooms</Button>
      <Button variant="link" onClick={handleLogout}>Sigh Out</Button>
  </div>
}


