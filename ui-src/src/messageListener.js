export default actions => e => {
  switch (e.data.type) {
    case 'open':
      actions.showUI(true)
      break
    case 'steamID':
      actions.setSteamID(e.data.steamID)
      break
    case 'characters':
      actions.setCharacters(e.data.characters)
      break
    default:
  }
}
