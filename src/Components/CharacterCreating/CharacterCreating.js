import React from 'react'
import { useAuth } from '../../context/AuthContext';
import "../../ComponentsView/CharacterCreating.css"
import { useDispatch } from 'react-redux';
import { closeCharacterCreatingAction } from "../../store/actions/uiActions"
import { classesArr } from '../../gameData/classesData';
import { racesArr } from '../../gameData/racesData';
import { classesImg } from '../../gameData/classesData';

export default function CharacterCreating() {

  const { createCharacter } = useAuth()
  const dispatch = useDispatch()
  const nameRef = React.useRef()
  const innerRef = React.useRef()
  const [activeClass, setActiveClass] = React.useState(0)
  const [activeRace, setActiveRace] = React.useState(0)
  const [activeImg, setActiveImg] = React.useState(classesImg[classesArr[1]])

  const mainClass = "characterCreating"

  const handleSubmit = () => {
    
    if(nameRef.current.value == "")
      return

    const newCharacter = {
      name: nameRef.current.value,
      race: racesArr[activeRace],
      class: classesArr[activeClass]
    }
    
    createCharacter(newCharacter)
    dispatch(closeCharacterCreatingAction())
  };

  const handleClickOutside = (e) => {
    e.preventDefault()
    if (innerRef.current && !innerRef.current.contains(e.target))
      dispatch(closeCharacterCreatingAction())
  }


  console.log(classesImg)
  return (
    <div className={`${mainClass}`} onClick= {handleClickOutside}>
      <div className={`${mainClass}-modal`} ref={innerRef}>
        <div className={`${mainClass}-main`} >
          <span>Enter name of your character</span>
          <input className={`${mainClass}-header-name`} ref={nameRef} type="text"/>
          <div className={`${mainClass}-dropdown`}>
            {racesArr.map((race, key) => {
              return <div className={`listItem` +" "+ `${activeRace == key ? `active` : ``}`} onClick={() => setActiveRace(key)} key={key}>{race}</div>
            })}
          </div>
          <div className={`${mainClass}-dropdown`}>
            {classesArr.map((item, key) => {
              return <div className={`listItem`+" "+`${activeClass == key ? `active` : ``}`} onClick={() => setActiveClass(key)} key={key}>{item}</div>
            })}
          </div>
          <div className={`${mainClass}-buttons`} >
            <button className={`${mainClass}-button`} onClick={handleSubmit}>create</button>
            <button className={`${mainClass}-button`} onClick={() => dispatch(closeCharacterCreatingAction())}>cancel</button>
          </div>
        </div>
        <div className={`${mainClass}-img`} >
          <img src={activeImg}/>
        </div>
      </div>
    </div>
  )
}
