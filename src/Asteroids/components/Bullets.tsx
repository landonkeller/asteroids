import React from 'react'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants'

interface Props {
  bullets: Bullet[]
}

const Bullets: React.FC<Props> = ({ bullets }) => {
  return (
    <>
      {bullets.map((bullet, i) => (
        <div
          key={i}
          style={{
            display: 'inline-block',
            left: WINDOW_WIDTH / 2 + bullet.x,
            top: WINDOW_HEIGHT / 2 - bullet.y,
            width: '2px',
            height: '2px',
            borderRadius: '2px',
            border: '2px solid red',
            position: 'absolute',
          }}
        ></div>
      ))}
    </>
  )
}

export default Bullets
