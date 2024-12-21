import React from 'react'

const ReactContext = React.createContext({
  light: true,
  onChangeTheme: '',
  savedItems: [],
  onSaveItem: '',
})
export default ReactContext
