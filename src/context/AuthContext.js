import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function getuid(){
    return auth.getUid();
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  async function getCharacters() {

    const characters = []

    await db.collection("users").doc(getuid()).collection('characters').get().then(docs => {
      docs.forEach(doc => {

        const character = {
          "characterId": doc.id,
          "data": doc.data()
        }
        characters.push(character)
      });
    });

    return characters
  }

  async function getCharacterData(characterId) {
    
    let data

    await db.collection("users").doc(getuid()).collection('characters').doc(characterId).get().then(doc => {
        if(doc.exists){
          data = doc.data()
        }
        else 
          console.log('doc does not exist')
    })

    return data
  }

  async function getChatRoomsList() {

    const chatRoomList = []

    await db.collection("rooms").get().then(docs => {
      docs.forEach(doc => {

        const chatRoom = {
          "roomId": doc.id,
          "data": doc.data()
        }

        chatRoomList.push(chatRoom)
      })
    })

    return chatRoomList
  }

  async function createChatRoom(){
    let roomName = prompt('enter room name')
    let roomPassword = prompt('enter room password')
    await db.collection('rooms').add({
      ROOMNAME: roomName,
      ROOMPASSWORD : roomPassword
    })
  }

  async function createCharacter(character){
    await db.collection("users").doc(getuid()).collection('characters').add({
      NAME: character.name
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    getuid,
    resetPassword,
    updateEmail,
    updatePassword,
    getCharacters,
    getCharacterData,
    getChatRoomsList,
    createChatRoom,
    createCharacter
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}