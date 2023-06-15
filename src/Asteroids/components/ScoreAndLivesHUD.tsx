import React from 'react'
import { PlayerComponent } from './Player'

const ScoreAndLivesHUD: React.FC<{ lives: number; score: number }> = ({
  lives,
  score,
}) => {
  const highScore: Score = JSON.parse(
    localStorage.getItem('asteroid-scores') || '[]',
  )[0]

  return (
    <div
      style={{
        position: 'absolute',
        color: 'white',
        textAlign: 'center',
        width: '100%',
        top: '8px',
        zIndex: 1,
      }}
    >
      <>
        <span style={{ marginRight: '8px' }}>Score: {score}</span>|
        <span style={{ position: 'relative', top: '2px', margin: '0 4px' }}>
          {new Array(lives > 0 ? lives : 0).fill(null).map((_, i) => {
            return <PlayerComponent key={i} angle={90} isDisplay />
          })}
        </span>
        {highScore && (
          <span style={{ position: 'absolute', right: '8px' }}>
            High Score: {highScore.score}
          </span>
        )}
      </>
    </div>
  )
}

export default ScoreAndLivesHUD
