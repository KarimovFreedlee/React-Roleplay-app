import React from 'react'
import "../../ComponentsView/ListItem.css"

export default function ListItem(props) {

  const mainClass = "listItem"

  return (
    <div className={`${mainClass} ${props.active ? `active` : ``}`}>{props.name}</div>
  )
}
