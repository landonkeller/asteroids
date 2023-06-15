import React from 'react'

const StartScreen: React.FC<{ startGame: () => void }> = ({ startGame }) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        className="button"
        onClick={() => {
          startGame()
        }}
      >
        Start game
      </button>
    </div>
  )
}
export default StartScreen
