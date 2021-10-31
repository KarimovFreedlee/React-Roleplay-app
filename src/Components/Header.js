import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext"
import {  useHistory } from "react-router-dom"
import {Avatar, Button, Container, Grid} from "@material-ui/core";


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


  return <div>
      <Button onClick={toCharacterList}>To my characters</Button>
      <Button>Become DM</Button>
      <Button variant="link" onClick={handleLogout}>Sigh Out</Button>
  </div>
}


