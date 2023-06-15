import React from 'react'
import { WINDOW_HEIGHT, WINDOW_WIDTH, COLORS } from '../../constants'

interface Props {
  started: boolean
  children: React.ReactNode
}

const GameWindow: React.FC<Props> = ({ children, started }) => {
  return (
    <div
      style={{
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        backgroundColor: COLORS.grey[900],
        borderRadius: '2px',
        position: 'relative',
        cursor: started ? 'none' : 'default',
        overflow: 'hidden',
      }}
    >
      {children}
      {/* <Asteroids started={started} setStarted={setStarted} /> */}
    </div>
  )
}

export default GameWindow
