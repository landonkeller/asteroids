import React from 'react'

const Controls: React.FC = () => {
  return (
    <div
      style={{
        marginTop: '16px',
      }}
    >
      Controls
      <div style={{ marginLeft: '8px' }}>
        <p>
          <b>Left and right arrows</b> to turn
        </p>
        <p>
          <b>Up arrow</b> to accelerate
        </p>
        <p>
          <b>Space</b> to shoot
        </p>
      </div>
    </div>
  )
}

export default Controls
