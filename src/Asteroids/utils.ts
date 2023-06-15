import React from 'react'

import {
  ASTEROID_BULLET_COLLISION_SCALE,
  ASTEROID_MAX_SPEED,
  ASTEROID_MIN_SPEED,
  BULLET_SPEED,
  BULLET_WINDOW_BUFFER,
  COLORS,
  MAX_ASTEROIDS,
  MAX_PLAYER_SPEED,
  PARTICLE_ANIMATION_TIME_IN_SECONDS,
  PLAYER_COLLISION,
  PLAYER_SPEED_SCALE,
  SHOOTING_INTERVAL,
  WINDOW_BUFFER,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../constants'

import { getRandomBool, getScale } from '../utils'

export const getPlayerRotation = (
  player: Player,
  keyDownRef: React.RefObject<KeyDown>,
): Player => {
  const { current } = keyDownRef

  if (!current.ArrowLeft && !current.ArrowRight) return player
  if (current.ArrowLeft && current.ArrowRight) return player

  return { ...player, angle: player.angle + 4 * (current.ArrowLeft ? -1 : 1) }
}

export const getPlayerMotion = (
  player: Player,
  keyDownRef: React.RefObject<KeyDown>,
): Player => {
  const { current } = keyDownRef
  if (!current.ArrowUp) return player

  const radians = player.angle * (Math.PI / 180)

  const max = MAX_PLAYER_SPEED
  const min = MAX_PLAYER_SPEED * -1

  const dY = Math.max(
    min,
    Math.min(max, player.dY + Math.sin(radians) * PLAYER_SPEED_SCALE),
  )
  const dX = Math.max(
    min,
    Math.min(max, player.dX + Math.cos(radians) * -1 * PLAYER_SPEED_SCALE),
  )

  return { ...player, dX, dY }
}

export const handlePlayerTick = (
  player: Player,
  keyDownRef: React.RefObject<KeyDown>,
): Player => {
  let newPlayer = player
  newPlayer = getMovedObject(newPlayer)
  newPlayer = getPlayerRotation(newPlayer, keyDownRef)
  newPlayer = getPlayerMotion(newPlayer, keyDownRef)
  return newPlayer
}

export const getMovedObject = (prev: MovableGameObject): MovableGameObject => {
  const x = getClampedValue(prev.x + prev.dX, WINDOW_WIDTH / 2)
  const y = getClampedValue(prev.y + prev.dY, WINDOW_HEIGHT / 2)

  return { ...prev, x, y }
}

export const getMovedAsteroids = (
  asteroids: Asteroid[],
  player: Player,
  onCollision: () => void,
): Asteroid[] => {
  const { xPos, xNeg, yPos, yNeg } = PLAYER_COLLISION
  const newAsteroids = asteroids.map((asteroid) => {
    const newVal = getMovedObject(asteroid)

    const scale = getScale(asteroid.size)

    if (
      newVal.x + xPos * scale > player.x &&
      newVal.x - xNeg * scale < player.x &&
      newVal.y + yPos * scale > player.y &&
      newVal.y - yNeg * scale < player.y
    ) {
      onCollision()
    }

    return newVal as Asteroid
  })

  if (
    newAsteroids.some((asteroid) => {
      const scale = getScale(asteroid.size)
      return (
        asteroid.x + xPos * scale > player.x &&
        asteroid.x - xNeg * scale < player.x &&
        asteroid.y + yPos * scale > player.y &&
        asteroid.y - yNeg * scale < player.y
      )
    })
  )
    return []

  return newAsteroids
}

export const getMovedBullets = (bullets: Bullet[]) => {
  return bullets
    .map((bullet) => getMovedObject(bullet))
    .filter((bullet) => {
      return (
        Math.abs(bullet.x) < WINDOW_WIDTH / 2 + BULLET_WINDOW_BUFFER &&
        Math.abs(bullet.y) < WINDOW_HEIGHT / 2 + BULLET_WINDOW_BUFFER
      )
    })
}

const getClampedValue = (val: number, max: number): number => {
  if (Math.abs(val) > max + WINDOW_BUFFER) return val * -1

  return val
}

const getNewDirection = (asteroid: Asteroid): { dX: number; dY: number } => {
  const dX =
    (getRandomArbitrary(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED) *
      (getRandomBool() ? 1 : -1) +
      asteroid.dX) /
    2
  const dY =
    (getRandomArbitrary(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED) *
      (getRandomBool() ? 1 : -1) +
      asteroid.dY) /
    2

  return { dX, dY }
}

export const handleBulletCollision = (
  bullets: Bullet[],
  asteroids: Asteroid[],
  setParticles: React.Dispatch<React.SetStateAction<GameObject[]>>,
): [Bullet[], Asteroid[]] => {
  return [
    bullets.filter((bullet) => {
      return !asteroids.some((asteroid) => {
        const scale = ASTEROID_BULLET_COLLISION_SCALE * getScale(asteroid.size)
        return (
          bullet.x + scale > asteroid.x &&
          bullet.x - scale < asteroid.x &&
          bullet.y + scale > asteroid.y &&
          bullet.y - scale < asteroid.y
        )
      })
    }),

    asteroids.reduce<Asteroid[]>((acc: Asteroid[], asteroid: Asteroid) => {
      const scale = ASTEROID_BULLET_COLLISION_SCALE * getScale(asteroid.size)

      const hasCollision = bullets.some((bullet) => {
        return (
          bullet.x + scale > asteroid.x &&
          bullet.x - scale < asteroid.x &&
          bullet.y + scale > asteroid.y &&
          bullet.y - scale < asteroid.y
        )
      })

      if (!hasCollision) return acc.concat([asteroid])

      addParticleEffect(setParticles, asteroid.x, asteroid.y)

      if (asteroid.size === 'sm') return acc

      if (asteroid.size === 'md') {
        const size = 'sm'

        return acc.concat([
          {
            ...asteroid,
            size,
            ...getNewDirection(asteroid),
            imageId: Math.round(getRandomArbitrary(1, 4)),
            rotation: Math.round(getRandomArbitrary(0, 359)),
          },
          {
            ...asteroid,
            size,
            ...getNewDirection(asteroid),
            imageId: Math.round(getRandomArbitrary(1, 4)),
            rotation: Math.round(getRandomArbitrary(0, 359)),
          },
        ])
      }
      if (asteroid.size === 'lg') {
        const size = 'md'
        return acc.concat([
          {
            ...asteroid,
            size,
            ...getNewDirection(asteroid),
            imageId: Math.round(getRandomArbitrary(1, 4)),
            rotation: Math.round(getRandomArbitrary(0, 359)),
          },
          {
            ...asteroid,
            size,
            ...getNewDirection(asteroid),
            imageId: Math.round(getRandomArbitrary(1, 4)),
            rotation: Math.round(getRandomArbitrary(0, 359)),
          },
        ])
      }
    }, [] as Asteroid[]),
  ]
}

export const shoot = (
  keyDownRef: React.RefObject<KeyDown>,
  canShootRef: React.RefObject<Boolean>,
  setCanShoot: React.Dispatch<React.SetStateAction<Boolean>>,
  player: Player,
  bullets: Bullet[],
): any => {
  if (!keyDownRef.current[' '] || !canShootRef.current) return bullets

  setCanShoot(false)
  setTimeout(() => {
    setCanShoot(true)
  }, SHOOTING_INTERVAL)

  const radians = player.angle * (Math.PI / 180)

  const bullet: Bullet = {
    x: player.x,
    y: player.y,
    dX: BULLET_SPEED * Math.cos(radians) * -1,
    dY: BULLET_SPEED * Math.sin(radians),
  }

  return bullets.concat([bullet])
}

export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

const getRandomAsteroid = (): Asteroid => {
  const maxX = WINDOW_WIDTH / 2 + 15
  const maxY = WINDOW_HEIGHT / 2 + 15

  const isXBound = getRandomBool()
  const isPositiveBound = getRandomBool()

  const x = isXBound
    ? isPositiveBound
      ? maxX
      : maxX * -1
    : Math.random() * maxX
  const y = !isXBound
    ? isPositiveBound
      ? maxY
      : maxY * -1
    : Math.random() * maxY

  const sizeRandom = getRandomArbitrary(0, 10)

  const size = sizeRandom < 6 ? 'sm' : sizeRandom < 9 ? 'md' : 'lg'
  const rotation = Math.round(getRandomArbitrary(0, 359))

  const dX =
    getRandomArbitrary(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED) *
    (getRandomBool() ? 1 : -1)
  const dY =
    getRandomArbitrary(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED) *
    (getRandomBool() ? 1 : -1)
  const color =
    // @ts-ignore
    COLORS.grey[(Math.round(getRandomArbitrary(0, 5)) * 100).toString()]

  const imageId = Math.round(getRandomArbitrary(1, 4))

  return {
    x,
    y,
    dX,
    dY,
    imageId,
    size,
    color,
    rotation,
  }
}

export const addParticleEffect = (
  setParticles: React.Dispatch<React.SetStateAction<GameObject[]>>,
  x: number,
  y: number,
) => {
  setParticles((prev) => prev.concat([{ x, y }]))

  setTimeout(() => {
    setParticles((prev) => prev.filter((p) => p.x !== x || p.y !== y))
  }, PARTICLE_ANIMATION_TIME_IN_SECONDS * 1000)
}

export const addOneAsteroid = (
  asteroids: Asteroid[] = [],
  canAddAsteroidRef: React.RefObject<Boolean>,
  setCanAddAsteroid: React.Dispatch<React.SetStateAction<Boolean>>,
  lifeJustLost: React.RefObject<Boolean>,
) => {
  if (
    !canAddAsteroidRef.current ||
    asteroids.length >= MAX_ASTEROIDS ||
    lifeJustLost.current
  )
    return asteroids

  setCanAddAsteroid(false)
  setTimeout(() => {
    setCanAddAsteroid(true)
  }, 1000)

  return asteroids.concat(getRandomAsteroid())
}
