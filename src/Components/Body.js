import React, { useState, useEffect } from "react"
import { Card, Row, Col } from "react-bootstrap"
import '../ComponentsView/Body.css'
import { useAuth } from "../context/AuthContext"
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core";

export default function Signup() {

  const { getCharacters } = useAuth()                     
  const [characters, setCharacters] = useState([])
  const [ loading, setLoading ] = useState(true);
  const history = useHistory()

  useEffect(() => {
    (
      async function (){
        const characters = await getCharacters()
        setCharacters(characters);
        setLoading(false)
      }
    )()
  });

  if(loading)
    return <div className ="justify-content-md-center">Loading...</div>

  return(
    <div>
      {characters.map((item,i) => { 
        return <Card key = {item.characterId} >
        <div className = 'card-header'>
          <Row>
            <Col>
              <h4>
                {item.data.name} 
              </h4>
            </Col>
            <Col>
              <Button onClick = {() => {history.push({ 
                pathname: "/character",
                state: {id : item.characterId}
              })}}>
                  to Character
              </Button>
            </Col>
          </Row>
        </div>
        <div className = 'card-body'>
          HP: {item.data.HP}
          <h6>
            Level: {item.data.Lvl}
          </h6>
        </div>
      </Card>})}
    </div>
  )
}
