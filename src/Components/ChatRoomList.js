import React, { useState, useEffect } from "react"
import Header from './Header'
import { Card, Row, Col } from "react-bootstrap"
import {Button} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { db } from "../firebase"

export default function ChatRoomList() {

    const history = useHistory()
    const [chatRoom, setChatRoom] = useState([])
    const [id, setId] = useState([])
    const [ loading, setLoading ] = useState(true);

    async function  getData() {
        await db.collection("rooms").get().then(docs => {
            var items = []
            var itemsId = []
            docs.forEach(doc => {
            items.push(doc.data());
            itemsId.push(doc.id);
        });
        setChatRoom(items);
        setId(itemsId);
        if(loading){
        setLoading(false);
        }
        });
    }

    async function addChatRoom(){
        let roomName = prompt('enter room name')
        let roomPassword = prompt('enter room password')
        await db.collection('rooms').add({
          ROOMNAME: roomName,
          ROOMPASSWORD : roomPassword
        })
    }
    
    useEffect(() => {
        getData();
    });
    
    if(loading){
        return <div className ="justify-content-md-center">Loading...</div>
    }

    
    return(
        <div>
            <Header/>
            {chatRoom.map((item,i) => { 
            return <Card key= {id[i]} >
            <div className = 'card-header'>
                <Row>
                <Col>
                    <h4>
                    {item.ROOMNAME} 
                    </h4>
                </Col>
                <Col>
                    <Button onClick = {() => {history.push({ 
                        pathname: "/chat",
                        state: {id : id[i]}
                    })}}>To chat room</Button>
                </Col>
                </Row>
            </div>
            </Card>})}
            <Button onClick = {addChatRoom}>+</Button>
        </div>
    )
}
