import React, { useMemo } from 'react'
import { getRandomArbitrary } from '../../utils'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants'

const min = 1000
const max = 2000

const getRandomColor = () => {
  // const r = Math.round(getRandomArbitrary(150, 255)).toString(16)
  // const g = Math.round(getRandomArbitrary(150, 255)).toString(16)
  // const b = Math.round(getRandomArbitrary(150, 255)).toString(16)
  // const a = Math.round(getRandomArbitrary(150, 255)).toString(16)
  const r = Math.round(getRandomArbitrary(0, 255)).toString(16)
  const g = Math.round(getRandomArbitrary(0, 255)).toString(16)
  const b = Math.round(getRandomArbitrary(0, 255)).toString(16)
  const a = Math.round(getRandomArbitrary(0, 200)).toString(16)

  return `#${r}${g}${b}${a}`
}

const Stars: React.FC = () => {
  const stars = useMemo<Star[]>(() => {
    const count = Math.round(getRandomArbitrary(min, max))

    return new Array(count).fill(null).map(() => ({
      color: getRandomColor(),
      x: getRandomArbitrary((-1 * WINDOW_WIDTH) / 2, WINDOW_WIDTH / 2),
      y: getRandomArbitrary((-1 * WINDOW_HEIGHT) / 2, WINDOW_HEIGHT / 2),
      size: Math.round(getRandomArbitrary(1, 3)),
    }))
  }, [])

  return (
    <>
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            display: 'inline-block',
            left: WINDOW_WIDTH / 2 + star.x,
            top: WINDOW_HEIGHT / 2 - star.y,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            backgroundColor: star.color,
            position: 'absolute',
          }}
        ></div>
      ))}
    </>
  )
}

export default Stars
