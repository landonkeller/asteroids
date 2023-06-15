export const WINDOW_HEIGHT = 500
export const WINDOW_WIDTH = 700

export const PLAYER_COLLISION = {
  xPos: 5,
  xNeg: 14,
  yPos: 14,
  yNeg: 9,
}

export const WINDOW_BUFFER = 20
export const BULLET_WINDOW_BUFFER = 4

export const FPS = 60
export const TICK_INTERVAL = 1000 / FPS

const ASTEROID_MAX_SPEED_TICK_RATIO = 120
const ASTEROID_MIN_SPEED_TICK_RATIO = 6
export const ASTEROID_MAX_SPEED = ASTEROID_MAX_SPEED_TICK_RATIO / FPS
export const ASTEROID_MIN_SPEED = ASTEROID_MIN_SPEED_TICK_RATIO / FPS

export const ASTEROID_BULLET_COLLISION_SCALE = 10

export const BULLET_SPEED_TICK_RATIO = 480
export const BULLET_SPEED = BULLET_SPEED_TICK_RATIO / FPS

const MAX_PLAYER_SPEED_TICK_RATIO = 600
const PLAYER_SPEED_TICK_RATIO = 6
export const PLAYER_SPEED_SCALE = PLAYER_SPEED_TICK_RATIO / FPS
export const MAX_PLAYER_SPEED = MAX_PLAYER_SPEED_TICK_RATIO / FPS

export const SHOOTING_INTERVAL = 200

export const PARTICLE_ANIMATION_TIME_IN_SECONDS = 0.3

export const MAX_ASTEROIDS = 20

export const LIVES = 3

export const SCORE_SCALE = 100

export const COLORS = {
  grey: {
    '50': '#fafafa',
    '100': '#f5f5f5',
    '200': '#eeeeee',
    '300': '#e0e0e0',
    '400': '#bdbdbd',
    '500': '#9e9e9e',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
  },
  orange: {
    '200': '#ffcc80',
  },
}
