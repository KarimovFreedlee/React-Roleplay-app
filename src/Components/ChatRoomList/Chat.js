import React, { useState, useEffect, useRef } from "react"
import { db } from "../../firebase"
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import TextField from "@material-ui/core/TextField";
import {Avatar, Button, Container, Grid} from "@material-ui/core";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase";
import { Form } from "react-bootstrap";

export default function Chat() {
    
    const { getuid } = useAuth()  
    const location = useLocation(); 
    const [value, setValue] = useState('')
    const [userId, setUserId] = useState('')
    const messageRef = useRef()
    const [messages, loading] = useCollectionData(
        db.collection('rooms').doc(location.state.id).collection('messages').orderBy('createdAt')
    )

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: "nearest" })
    },[messages]);

    useEffect(() => {
        setUserId (getuid())
    },[]);

    const sendMessage = async (e) => {
        e.preventDefault()
        db.collection('rooms').doc(location.state.id).collection('messages').add({
            uid: userId,
            // displayName: userNAME,
            // photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        setValue('')
    }

    return (
        loading ? <h3>loading</h3> :
        <Container>
            <Grid container
                  justify={"center"}
                  style={{height: window.innerHeight - 50, marginTop: 20}}>
                <div style={{width: '80%', height: '80vh', border: '1px solid gray', overflowY: 'auto'}}>
                    {messages.map((message, i) =>
                        <div 
                            key={i}
                            style={{
                            margin: 10,
                            border: userId === message.uid ? '2px solid green' : '2px dashed red',
                            marginLeft: userId === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 5,
                        }}>
                            <Grid container>
                                <Avatar src={message.photoURL}/>
                                <div>{message.NAME}</div>
                            </Grid>
                            <div ref={messageRef}>{message.text}</div>
                        </div>
                    )}
                </div>
                    <Grid
                        container
                        direction={"column"}
                        alignItems={"flex-end"}
                        style={{width: '80%'}}
                    >
                        <Form onSubmit={sendMessage}>
                            <TextField
                                fullWidth
                                rowsMax={2}
                                variant={"outlined"}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                            <Button variant={"outlined"} type = 'submit'>Send</Button>
                        </Form>
                    </Grid>
            </Grid>
        </Container>
    )
}
