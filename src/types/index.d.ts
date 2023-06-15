interface SomeObject {
  id: string
}

interface GameObject {
  x: number
  y: number
}

interface Star extends GameObject {
  color: string
  size: number
}

interface MovableGameObject extends GameObject {
  dX: number
  dY: number
}

interface Bullet extends MovableGameObject {}

interface Asteroid extends MovableGameObject {
  size?: string
  imageId?: number
  color?: string
  rotation?: number
}

interface Player extends MovableGameObject {
  angle?: number
}

interface GameScriptStage {
  small?: number
  medium?: number
  large?: number
}

type GameScript = GameScriptStage[]

interface KeyDown {
  ArrowLeft?: boolean
  ArrowRight?: boolean
  ArrowUp?: boolean
  ' '?: boolean
}

interface Score {
  date: string
  score: number
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
