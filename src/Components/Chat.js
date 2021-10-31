import React, { useState, useEffect } from "react"
import Header from './Header'
import { auth, db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import TextField from "@material-ui/core/TextField";
import {Avatar, Button, Container, Grid} from "@material-ui/core";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase";

export default function Chat() {

    const [value, setValue] = useState('')
    const [user, setUser] = useState([])
    const [messages, loading] = useCollectionData(
        db.collection('messages').orderBy('createdAt')
    )
    const { currentUser } = useAuth()


    useEffect(() => {
        console.log(messages)
      },[]);

    const sendMessage = async () => {
        db.collection('messages').add({
            // uid: user.uid,
            // displayName: userNAME,
            // photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        setValue('')
    }

    if(loading){
        return <h3>loading</h3>
    }


    return (
        <Container>
            <Header/>
            <Grid container
                  justify={"center"}
                  style={{height: window.innerHeight - 50, marginTop: 20}}>
                <div style={{width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto'}}>
                    {messages.map(message =>
                        <div style={{
                            margin: 10,
                            border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 5,
                        }}>
                            <Grid container>
                                <Avatar src={message.photoURL}/>
                                <div>{message.NAME}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )}
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{width: '80%'}}
                >
                    <TextField
                        fullWidth
                        rowsMax={2}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={"outlined"}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    )
}
