import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Form } from "react-bootstrap"
import "../../ComponentsView/CharacterCreating.css"
import { useDispatch } from 'react-redux';
import { closeCharacterCreatingAction } from "../../store/actions/uiActions"

export default function CharacterCreating() {

  const { createCharacter } = useAuth()
  const dispatch = useDispatch()
  const nameRef = React.useRef()

  const mainClass = "characterCreating"

  const handleSubmit = (e) => {
    e.preventDefault()

    const newCharacter = {
      name: nameRef.current.value
    }

    createCharacter(newCharacter)
  };

  return (
    <div className={`${mainClass}`}>
        <Form onSubmit={() => {}} className={`${mainClass}-modal`}>
        <div className={`${mainClass}-header`} >
          <input className={`${mainClass}-header-name`} ref={nameRef} type="text"/>
          <div className={`${mainClass}-header-dropdown`}>

          </div>
        </div>
        <div className={`${mainClass}-grid`} >
        </div>
          <div className={`${mainClass}-buttons`} >
            <button className={`${mainClass}-button`} type="submit">create</button>
            <button className={`${mainClass}-button`} onClick={() => dispatch(closeCharacterCreatingAction())}>cancel</button>
          </div>
      </Form>
    </div>
  )
}
