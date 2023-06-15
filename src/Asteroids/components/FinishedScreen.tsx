import React from 'react'

const FinishedScreen: React.FC<{ startGame: () => void; score: number }> = ({
  startGame,
  score,
}) => {
  const highScores: Score[] = JSON.parse(
    localStorage.getItem('asteroid-scores') || '[]',
  )
  return (
    <>
      {highScores.length > 0 && (
        <div
          style={{
            position: 'absolute',
            right: '12px',
            color: 'white',
            top: '12px',
            textAlign: 'right',
          }}
        >
          <span>Your high scores</span>
          {highScores.map((s, i) => (
            <div key={i}>
              {s.date} - <b>{s.score}</b>
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <div style={{ color: 'white', marginBottom: '8px', fontSize: '24px' }}>
          <span>Game Over! Score: {score}</span>
        </div>
        <div>
          <button
            className="button"
            onClick={() => {
              startGame()
            }}
          >
            Start over
          </button>
        </div>
      </div>
    </>
  )
}
export default FinishedScreen
