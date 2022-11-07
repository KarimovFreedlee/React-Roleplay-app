export const CHARACTER_CREATING_OPEN = "CHARACTER_CREATING_OPEN"
export const CHARACTER_CREATING_CLOSE = "CHARACTER_CREATING_CLOSE"
export const SET_NEW_CHARACTER_CLASS = "SET_NEW_CHARACTER_CLASS"
export const SET_NEW_CHARACTER_RACE = "SET_NEW_CHARACTER_RACE"

export const initialState = {
    characterCreatingOpen: false,
    newCharacterClass: "",
    newCharacterRace: ""
}

export function uiReducer(state = initialState, action) {
  switch (action.type) {
    case CHARACTER_CREATING_OPEN:
        return { ...state, characterCreatingOpen: true }
    case CHARACTER_CREATING_CLOSE:
        return { ...state, characterCreatingOpen: false }
    case SET_NEW_CHARACTER_CLASS:
        return { ...state, newCharacterClass: action.payload }
    case SET_NEW_CHARACTER_RACE:
        return { ...state, newCharacterRace: action.payload }
    default:
        return state
  }
}