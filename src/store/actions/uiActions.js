import { CHARACTER_CREATING_CLOSE, CHARACTER_CREATING_OPEN } from "./../Reducers/uiReducer"

export function openCharacterCreatingAction() {
    return {
        type: CHARACTER_CREATING_OPEN
    }
}

export function closeCharacterCreatingAction() {
    return {
        type: CHARACTER_CREATING_CLOSE
    }
}

export function setNewCharacterClass() {
    return {
        type: CHARACTER_CREATING_CLOSE
    }
}