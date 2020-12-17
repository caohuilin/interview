import React from 'react'
import { List } from 'visualized-list'

import 'visualized-list/dist/index.css'

const App = () => {
  return (
    <List height={500} itemCount={10000} itemHeight={35} width={500}>
      {({ index, style }) => (
        <div style={style} key={index}>
          Row {index}
        </div>
      )}
    </List>
  )
}

export default App
