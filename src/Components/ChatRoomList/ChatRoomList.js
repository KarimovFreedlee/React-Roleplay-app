import React, { useState, useEffect } from "react"
import Header from '../Header'
import { Card, Row, Col } from "react-bootstrap"
import {Button} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { db } from "../../firebase"
import { useAuth } from "../../context/AuthContext"

export default function ChatRoomList() {

    const history = useHistory()
    const { getChatRoomsList } = useAuth()
    const [chatRoom, setChatRoom] = useState([])
    const [ loading, setLoading ] = useState(true);

    // async function  getData() {
    //     await db.collection("rooms").get().then(docs => {
    //         var items = []
    //         var itemsId = []
    //         docs.forEach(doc => {
    //         items.push(doc.data());
    //         itemsId.push(doc.id);
    //     });
    //     setChatRoom(items);
    //     setId(itemsId);
    //     if(loading){
    //     setLoading(false);
    //     }
    //     });
    // }

    async function addChatRoom(){
        let roomName = prompt('enter room name')
        let roomPassword = prompt('enter room password')
        await db.collection('rooms').add({
          ROOMNAME: roomName,
          ROOMPASSWORD : roomPassword
        })
    }
    
    useEffect(() => {
        (
            async function (){
                const roomsList = await getChatRoomsList()
                setChatRoom(roomsList)
                setLoading(false)
            }
        )()
    }, []);
       
    return(
        loading ? <div className ="justify-content-md-center">Loading...</div> :
        <div>
            <Header/>
            {chatRoom.map(item => { 
            return <Card key = {item.roomId} >
                <div className = 'card-header'>
                    <Row>
                    <Col>
                        <h4>
                        {item.data.ROOMNAME} 
                        </h4>
                    </Col>
                    <Col>
                        <Button onClick = {() => {history.push({ 
                            pathname: "/chat",
                            state: {id : item.roomId}
                        })}}>To chat room</Button>
                    </Col>
                    </Row>
                </div>
            </Card>})}
            <Button onClick = {addChatRoom}>+</Button>
        </div>
    )
}
