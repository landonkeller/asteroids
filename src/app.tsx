import React from 'react'
import Asteroids from './Asteroids'

function App() {
  return (
    <div style={{ margin: '-8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <div>
          <Asteroids />
        </div>
      </div>
    </div>
  )
}
export default App
