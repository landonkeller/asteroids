import React, { useEffect, useRef, useState } from 'react'
import Player from './components/Player'
import { LIVES, SCORE_SCALE, TICK_INTERVAL } from '../constants'

import Asteroid from './components/Asteroid'
import Stars from './components/Stars'

import Bullets from './components/Bullets'
import Particles from './components/Particles'
import {
  addOneAsteroid,
  addParticleEffect,
  getMovedAsteroids,
  getMovedBullets,
  handleBulletCollision,
  handlePlayerTick,
  shoot,
} from './utils'
import StartScreen from './components/StartScreen'
import FinishedScreen from './components/FinishedScreen'
import ScoreAndLivesHUD from './components/ScoreAndLivesHUD'
import GameWindow from './components/GameWindow'
import Controls from './components/Controls'

const MASKED_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ']

const Asteroids: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false)
  const [asteroids, setAsteroids] = useState<Asteroid[]>([])

  const [particles, setParticles] = useState<GameObject[]>([])

  const [keyDown, setKeyDown] = useState<KeyDown>({})
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [canShoot, setCanShoot] = useState<Boolean>(true)

  const [canAddAsteroid, setCanAddAsteroid] = useState<Boolean>(true)
  const [score, setScore] = useState<number>(0)
  const [lives, setLives] = useState<number>(LIVES)
  const [lifeJustLost, setLifeJustLost] = useState<boolean>(false)

  const [finished, setFinished] = useState<boolean>(false)

  const [player, setPlayer] = useState<Player>({
    x: 0,
    y: 0,
    dX: 0,
    dY: 0,
    angle: 90,
  })

  const startedRef = useRef(started)
  const keyDownRef = useRef(keyDown)
  const canShootRef = useRef(canShoot)
  const canAddAsteroidRef = useRef(canAddAsteroid)
  const lifeJustLostRef = useRef(lifeJustLost)

  const keyDownListener = (ev: KeyboardEvent) => {
    if (MASKED_KEYS.includes(ev.key)) ev.preventDefault()
    setKeyDown((prev) => ({ ...prev, [ev.key]: true }))
  }
  const keyUpListener = (ev: KeyboardEvent) => {
    if (MASKED_KEYS.includes(ev.key)) ev.preventDefault()
    setKeyDown((prev) => ({ ...prev, [ev.key]: false }))
  }

  useEffect(() => {
    if (started) {
      document.addEventListener('keydown', keyDownListener)
      document.addEventListener('keyup', keyUpListener)
      return
    }

    const removeListeners = () => {
      document.removeEventListener('keydown', keyDownListener)
      document.removeEventListener('keyup', keyUpListener)
    }

    if (!started) {
      try {
        removeListeners()
      } catch {}
    }

    return removeListeners
  }, [started])

  useEffect(() => {
    keyDownRef.current = keyDown
  }, [keyDown])

  useEffect(() => {
    canShootRef.current = canShoot
  }, [canShoot])
  useEffect(() => {
    lifeJustLostRef.current = lifeJustLost
  }, [lifeJustLost])

  useEffect(() => {
    canAddAsteroidRef.current = canAddAsteroid
  }, [canAddAsteroid])

  useEffect(() => {
    startedRef.current = started

    if (started) tick(player, asteroids, bullets)
  }, [started])

  useEffect(() => {
    if (lives < 1) {
      endGame()
    }
  }, [lives])

  const endGame = () => {
    const lsKey = 'asteroid-scores'
    let scores: Score[] = JSON.parse(localStorage.getItem(lsKey) || '[]')

    const date = new Date().toLocaleDateString()

    scores = scores.concat([{ date, score }])
    scores = scores.sort((a, b) => b.score - a.score)
    scores = scores.slice(0, 3)

    localStorage.setItem(lsKey, JSON.stringify(scores))

    setLives(LIVES)
    setFinished(true)
    setStarted(false)
  }

  const startGame = () => {
    setStarted(true)
    setFinished(false)
    setScore(0)
  }

  const tick = (
    player: Player,
    asteroids: Asteroid[],
    bullets: Bullet[],
  ): NodeJS.Timeout | undefined => {
    if (!startedRef.current) return

    let newPlayerValue: Player = player
    let newAsteroidsValue: Asteroid[] = asteroids
    let newBulletsValue: Bullet[] = bullets

    newPlayerValue = handlePlayerTick(newPlayerValue, keyDownRef)

    newBulletsValue = shoot(
      keyDownRef,
      canShootRef,
      setCanShoot,
      newPlayerValue,
      newBulletsValue,
    )

    newBulletsValue = getMovedBullets(newBulletsValue)

    newAsteroidsValue = addOneAsteroid(
      newAsteroidsValue,
      canAddAsteroidRef,
      setCanAddAsteroid,
      lifeJustLostRef,
    )

    newAsteroidsValue = getMovedAsteroids(
      newAsteroidsValue,
      newPlayerValue,
      () => {
        addParticleEffect(setParticles, newPlayerValue.x, newPlayerValue.y)
        newBulletsValue = []
        setLifeJustLost(true)
        setTimeout(() => {
          setLifeJustLost(false)
        }, 2000)
        setCanAddAsteroid(true)
        newPlayerValue = {
          ...newPlayerValue,
          x: 0,
          y: 0,
          dX: 0,
          dY: 0,
          angle: 90,
        }
        setLives((prev) => prev - 1)
      },
    )

    const [b, a] = handleBulletCollision(
      newBulletsValue,
      newAsteroidsValue,
      setParticles,
    )

    if (a.length !== newAsteroidsValue.length) {
      setScore((prev) => prev + SCORE_SCALE)
    }
    newBulletsValue = b
    newAsteroidsValue = a

    setAsteroids(newAsteroidsValue)
    setBullets(newBulletsValue)
    setPlayer(newPlayerValue)

    return setTimeout(
      () => tick(newPlayerValue, newAsteroidsValue, newBulletsValue),
      TICK_INTERVAL,
    )
  }

  return (
    <>
      <GameWindow started={started}>
        {!finished && !started && <StartScreen startGame={startGame} />}
        {finished && <FinishedScreen startGame={startGame} score={score} />}
        {started && <ScoreAndLivesHUD lives={lives} score={score} />}

        {started && (
          <>
            <Stars />
            <Bullets bullets={bullets} />
            {particles.length > 0 && <Particles particles={particles} />}

            <Player
              lifeJustLost={lifeJustLost}
              player={player}
              isAccelerating={keyDownRef.current.ArrowUp}
            />
            {asteroids.map((asteroid, i) => (
              <Asteroid asteroid={asteroid} key={i} />
            ))}
          </>
        )}
      </GameWindow>
      <Controls />
    </>
  )
}

export default Asteroids
