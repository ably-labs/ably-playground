import React, { useRef, useState } from 'react'
import { useChannel } from '@ably-labs/react-hooks'
import { getStroke } from 'perfect-freehand'
import polygonClipping from 'polygon-clipping'

function getFlatSvgPathFromStroke(stroke) {
  const faces = polygonClipping.union([stroke])

  const d = []

  faces.forEach((face) =>
    face.forEach((points) => {
      d.push(getSvgPathFromStroke(points))
    })
  )

  return d.join(' ')
}

export function getSvgPathFromStroke(stroke) {
  if (!stroke.length) return ''

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ['M', ...stroke[0], 'Q']
  )

  d.push('Z')
  return d.join(' ')
}

const options = {
  size: 10,
  // thinning: 0.1,
  // smoothing: 0.1,
  streamline: 1,
  easing: (t) => t,
  start: {
    taper: 100,
    easing: (t) => t,
    cap: true,
  },
  end: {
    taper: 100,
    easing: (t) => t,
    cap: true,
  },
}

const colors = {
  gray: '#0f172a',
  red: '#ef4444',
  orange: '#f59e0b',
  lime: '#84cc16',
  green: '#10b981',
  cyan: '#06b6d4',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  pink: '#ec4899',
}

export function Canvas() {
  const [points, setPoints] = useState([])
  const [paths, setPaths] = useState([])
  const [color, setColor] = useState(colors.gray)
  const containerRef = useRef(null)
  const [channel] = useChannel('canvas', (message) => {
    const pathData = getFlatSvgPathFromStroke(message.data.stroke)

    setPaths((p) => [...p, { stroke: pathData, color: message.data.color }])
  })

  function handlePointerDown({ nativeEvent, ...e }) {
    e.target.setPointerCapture(e.pointerId)
    setPoints((s) => [[nativeEvent.offsetX, nativeEvent.offsetY]])
  }

  function handlePointerMove({ nativeEvent, ...e }) {
    if (e.buttons !== 1) return
    setPoints([...points, [nativeEvent.offsetX, nativeEvent.offsetY]])
  }

  const stroke = getStroke(points, options)
  let pathData
  if (stroke.length) {
    pathData = getFlatSvgPathFromStroke(stroke)
  }

  function handlePointerUp(e) {
    setPaths((p) => [...p, { stroke: pathData, color }])

    channel.publish('canvas', { stroke, color })
  }

  return (
    <div ref={containerRef} className="shadow-lg rounded-lg relative z-0">
      <div className="z-0">
        <svg
          className="absolute top-0 left-0"
          style={{
            pointerEvents: 'none',
            height: 600,
            width: '100%',
            stroke: '#0f172a',
            strokeWidth: '5',
            fill: color,
          }}
        >
          {paths.length &&
            paths.map((p, i) => (
              <path fill={p.color} key={i} d={p.stroke} zindex="0" />
            ))}
        </svg>
      </div>
      <div className="z-0  overflow-clip">
        <svg
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            touchAction: 'none',
            height: 600,
            width: '100%',
            backgroundColor: '#ffffff',
            stroke: '#0f172a',
            strokeWidth: '5',
            fill: color,
          }}
        >
          {points && <path fill={color} d={pathData} />}
        </svg>
      </div>
      <div className="flex absolute bottom-3 left-3 bg-[#F5F5F6] p-1 rounded-full">
        {Object.entries(colors).map(([key, val]) => (
          <div key={val} className="rounded-full">
            <button
              onClick={() => setColor(val)}
              style={{
                background: val,
                borderColor: val === color ? val : '#F5F5F6',
              }}
              className="p-3 border-4 rounded-full"
            />
          </div>
        ))}
      </div>
      <div className="bottom-3 right-3 absolute">
        <div className="flex w-full space-x-2 items-center">
          <button
            onClick={() => {
              setPaths([])
              setPoints([])
            }}
            className={`bg-[#F5F5F6] rounded-full py-3 px-6 transition-all leading-none`}
          >
            Clear canvas
          </button>
        </div>
      </div>
    </div>
  )
}
