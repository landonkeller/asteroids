import React from 'react'
import { COLORS, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants'

interface Props {
  player: Player
  isAccelerating: boolean
  lifeJustLost?: boolean
}

const Player: React.FC<Props> = (props) => {
  const { player, isAccelerating, lifeJustLost = false } = props
  return (
    <>
      <PlayerComponent
        angle={player.angle}
        x={player.x}
        y={player.y}
        isAccelerating={isAccelerating}
        lifeJustLost={lifeJustLost}
      />
    </>
  )
}

export const PlayerComponent: React.FC<{
  angle: number
  isAccelerating?: boolean
  isDisplay?: boolean
  x?: number
  y?: number
  lifeJustLost?: boolean
}> = ({
  angle,
  x = 0,
  y = 0,
  isDisplay = false,
  isAccelerating = false,
  lifeJustLost = false,
}) => {
  return (
    <div
      className={lifeJustLost ? 'blink2' : ''}
      style={{
        transform: `rotate(${angle}deg)${isDisplay ? ' scale(0.8)' : ''}`,
        width: 0,
        height: 0,
        borderTop: `8px solid transparent`,
        borderBottom: `8px solid transparent`,
        borderRight: `20px solid white`,
        left: WINDOW_WIDTH / 2 + x,
        top: WINDOW_HEIGHT / 2 - y,
        position: isDisplay ? 'initial' : 'absolute',
        zIndex: 0,
        display: 'inline-block',
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: `8px solid transparent`,
          borderBottom: `8px solid transparent`,
          borderRight: `5px solid ${COLORS.grey[900]}`,

          position: 'absolute',
          top: '-8px',
          right: '-21px',
        }}
      ></div>

      {isAccelerating && (
        <div
          className="blink"
          style={{
            width: 0,
            height: 0,
            borderTop: `4px solid transparent`,
            borderBottom: `4px solid transparent`,
            borderRight: `8px solid ${COLORS.orange[200]}`,
            transform: 'rotate(180deg)',

            position: 'absolute',
            top: '-4px',
            right: '-28px',
          }}
        ></div>
      )}
    </div>
  )
}

export default Player
