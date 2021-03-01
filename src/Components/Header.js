import React, { useState } from 'react';
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"


  export default function Header() {
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
    <h2>My Pathfinder characters list</h2>
      <button variant="link" onClick={handleLogout}>Sigh Out</button>
  </div>
}


