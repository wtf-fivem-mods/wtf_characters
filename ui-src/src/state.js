import history from './history'

export const IsDev = process.env.NODE_ENV !== 'production'

export const initialState = {
  shown: IsDev,
  characters: [],
  steamID: null,
}

export const actions = {
  showUI: (draft, shown) => {
    if (!shown) history.push('/')
    draft.shown = shown
  },
  setSteamID: (draft, steamID) => {
    draft.steamID = steamID
  },
  setCharacters: (draft, characters) => {
    draft.characters = characters
  },
}
