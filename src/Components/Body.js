import React, { useState, useEffect } from "react"
import { Card, Row, Col } from "react-bootstrap"
import '../ComponentsView/Body.css'
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import { useHistory } from "react-router-dom"
import {Avatar, Button, Container, Grid} from "@material-ui/core";

export default function Signup() {

  const { getuid } = useAuth()                     
  const [user, setUser] = useState([])
  const [id, setId] = useState([])
  const [ loading, setLoading ] = useState(true);
  const history = useHistory()
  

 async function  getData() {
    await db.collection("users").doc(getuid()).collection('characters').get().then(docs => {
      var items = []
      var itemsId = []
      docs.forEach(doc => {
        items.push(doc.data());
        itemsId.push(doc.id);
      });
      setUser(items);
      setId(itemsId);
      if(loading){
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    getData();
  });

  if(loading){
    return <div class ="justify-content-md-center">Loading...</div>
  }

  return(
    <div>
      {user.map((item,i) => { 
        return <Card key= {id[i]} >
        <div class='card-header'>
          <Row>
            <Col>
              <h4>
                {item.name} 
              </h4>
            </Col>
            <Col>
              <Button onClick = {() => {history.push({ 
                pathname: "/character",
                state: {id : id[i]}
              })}}>
                  to Character
              </Button>
            </Col>
          </Row>
        </div>
        <div class = 'card-body'>
          HP: {item.HP}
          <h6>
            Level: {item.Lvl}
          </h6>
        </div>
      </Card>})}
    </div>
  )
}
