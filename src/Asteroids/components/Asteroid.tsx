import React from 'react'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants'

import img1 from '../../assets/asteroid-1.svg'
import img2 from '../../assets/asteroid-2.svg'
import img3 from '../../assets/asteroid-3.svg'
import img4 from '../../assets/asteroid-4.svg'
import { getScale } from '../../utils'

interface Props {
  asteroid: Asteroid
}

type Map = {
  [x: string]: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

const map: Map = {
  '1': img1,
  '2': img2,
  '3': img3,
  '4': img4,
}

const Asteroid: React.FC<Props> = ({ asteroid }) => {
  const Image: React.FunctionComponent<React.SVGAttributes<SVGElement>> =
    map[asteroid.imageId]

  const size = asteroid.size || 'sm'

  return (
    <div
      style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        left: WINDOW_WIDTH / 2 + asteroid.x,
        top: WINDOW_HEIGHT / 2 - asteroid.y,
        position: 'absolute',
        display: 'inline-block',
        zIndex: 0,
        overflow: 'visible',
        transform: `scale(${getScale(size)}) rotate(${asteroid.rotation}deg)`,
      }}
    >
      <Image
        stroke={asteroid.color || 'white'}
        style={{
          position: 'relative',
          right: '8px',
          bottom: '8px',
        }}
      />
    </div>
  )
}

export default Asteroid
