import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  PARTICLE_ANIMATION_TIME_IN_SECONDS,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../../constants'
import { getRandomArbitrary, getRandomBool } from '../../utils'

const Particle: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const count = useMemo(() => Math.round(getRandomArbitrary(4, 9)), [])

  const [posArray, setPosState] = useState<number[][]>(
    new Array(count).fill([x, y]),
  )

  let lastRef = useRef()

  useEffect(() => {
    if (!lastRef?.current) return
    lastRef = null

    setTimeout(() => {
      setPosState(
        posArray.map((p) => {
          const dX =
            Math.round(getRandomArbitrary(10, 50)) * (getRandomBool() ? 1 : -1)
          const dY =
            Math.round(getRandomArbitrary(10, 50)) * (getRandomBool() ? 1 : -1)

          return [p[0] + dX, p[1] + dY]
        }),
      )
    }, 10)
  }, [lastRef.current])

  return (
    <>
      {posArray.map((p, i) => (
        <div
          ref={i === count - 1 ? lastRef : null}
          key={i}
          style={{
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            left: WINDOW_WIDTH / 2 + p[0],
            top: WINDOW_HEIGHT / 2 - p[1],
            position: 'absolute',
            display: 'inline-block',
            zIndex: 0,
            transition: `left ${PARTICLE_ANIMATION_TIME_IN_SECONDS}s, top ${PARTICLE_ANIMATION_TIME_IN_SECONDS}s`,
            backgroundColor: 'white',
          }}
        ></div>
      ))}
    </>
  )
}

interface Props {
  particles: GameObject[]
}

const Particles: React.FC<Props> = ({ particles }) => {
  return (
    <>
      {particles.map((p) => (
        <Particle x={p.x} y={p.y} key={`${p.x}${p.y}`} />
      ))}
    </>
  )
}

export default Particles
