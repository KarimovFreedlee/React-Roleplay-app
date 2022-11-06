import React, { useState, useEffect } from "react"
import Header from '../Header'
import { Card, Row, Col } from "react-bootstrap"
import {Button} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function ChatRoomList() {

    const history = useHistory()
    const { getChatRoomsList, createChatRoom } = useAuth()
    const [chatRooms, setChatRooms] = useState([])
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        loadRoomsList()
        setLoading(false)
    }, [chatRooms]);

    const loadRoomsList = () => {
        (
            async function (){
                const roomsList = await getChatRoomsList()
                setChatRooms(roomsList)
            }
        )()
    }

    const newChatRoom = () => {
        createChatRoom()
    }
       
    return(
        loading ? <div className ="justify-content-md-center">Loading...</div> :
        <div>
            {chatRooms.map(room => { 
            return <Card 
                key = {room.roomId}
                onClick = {() => {history.push({ 
                    pathname: "/chat",
                    state: {id : room.roomId}
                })}}
                >
                <div className = 'card-header'>
                    <Row>
                    <Col>
                        <h4>
                        {room.data.ROOMNAME} 
                        </h4>
                    </Col>
                    </Row>
                </div>
            </Card>})}
            <Button onClick = {newChatRoom}>+</Button>
        </div>
    )
}
