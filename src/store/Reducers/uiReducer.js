export const CHARACTER_CREATING_OPEN = "CHARACTER_CREATING_OPEN"
export const CHARACTER_CREATING_CLOSE = "CHARACTER_CREATING_CLOSE"

export const initialState = {
    characterCreatingOpen: false
}

export function uiReducer(state = initialState, action) {
  switch (action.type) {
    case CHARACTER_CREATING_OPEN:
        return { ...state, characterCreatingOpen: true }
    case CHARACTER_CREATING_CLOSE:
        return { ...state, characterCreatingOpen: false }
    default:
        return state
  }
}