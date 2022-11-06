import React, { useState, useEffect } from "react"
import { Card, Row, Col } from "react-bootstrap"
import '../../ComponentsView/Body.css'
import { useAuth } from "../../context/AuthContext"
import { useHistory } from "react-router-dom"
import {Button} from "@material-ui/core"

export default function Signup() {

  const { getCharacters, createCharacter } = useAuth()                     
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
  }, []);

  const addNewCharacter = () => {
    
    createCharacter()
  }

  return(
    loading ? <div className ="justify-content-md-center">Loading...</div> : 
    <div>
      {characters.map(character => { 
        return <Card 
        key = {character.characterId}
        onClick = {() => {history.push({ 
          pathname: "/character",
          state: {id : character.characterId}
        })}}
        >
          <div className = 'card-header'>
            <Row>
              <Col>
                <h4>
                  {character.data.name} 
                </h4>
              </Col>
            </Row>
          </div>
          <div className = 'card-body'>
            HP: {character.data.HP}
            <h6>
              Level: {character.data.Lvl}
            </h6>
          </div>
      </Card>})}
      <Button onClick = {addNewCharacter}>+</Button>
    </div>
  )
}
