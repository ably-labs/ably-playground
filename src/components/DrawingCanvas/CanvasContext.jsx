import React, { useContext, useRef, useState } from 'react'
import { drawLine } from './canvasUtils'

const CanvasContext = React.createContext({})

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

export const CanvasProvider = ({ children }) => {
  const MULTIPLIER = 2
  const CANVAS_WIDTH = 800 * MULTIPLIER
  const CANVAS_HEIGHT = 600 * MULTIPLIER

  const [isDrawing, setIsDrawing] = useState(false)
  const [imageData, setImageData] = useState(null)
  const [color, setColor] = useState(colors.gray)
  const [points, setPoints] = useState([])
  const [startingPoint, setStartingPoint] = useState({})

  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const prepareCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = CANVAS_WIDTH
      canvas.height = CANVAS_HEIGHT
      canvas.style.width = `${CANVAS_WIDTH / MULTIPLIER}px`
      canvas.style.height = `${CANVAS_HEIGHT / MULTIPLIER}px`

      const context = canvas.getContext('2d')

      if (!context) return

      context.scale(MULTIPLIER, MULTIPLIER)
      context.lineJoin = 'round'
      context.lineCap = 'round'
      context.strokeStyle = color
      context.lineWidth = 5
      contextRef.current = context
    }
  }

  // Mouse Down
  const startDrawing = ({ nativeEvent }) => {
    if (!contextRef.current) return

    const { offsetX: x, offsetY: y } = nativeEvent
    contextRef.current.strokeStyle = color

    setIsDrawing(true)
    setPoints((currentPoints) => currentPoints.concat({ x, y }))
    setStartingPoint({ x, y })
  }

  // Mouse Move
  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !contextRef.current) return

    const { offsetX: x, offsetY: y } = nativeEvent
    setPoints((currentPoints) => currentPoints.concat({ x, y }))

    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2)
      const controlPoint = lastTwoPoints[0]
      const endPoint = {
        x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
        y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
      }

      drawLine(startingPoint, controlPoint, endPoint, contextRef.current)
      setStartingPoint(endPoint)
    }
  }

  // Mouse Up
  const finishDrawing = ({ nativeEvent }) => {
    if (!contextRef.current) return

    const { offsetX: x, offsetY: y } = nativeEvent
    setPoints((currentPoints) => currentPoints.concat({ x, y }))

    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2)
      const controlPoint = lastTwoPoints[0]
      const endPoint = lastTwoPoints[1]
      drawLine(startingPoint, controlPoint, endPoint, contextRef.current)
    }

    setStartingPoint(null)
    setIsDrawing(false)
    setPoints([])

    const imgData = contextRef.current.getImageData(
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    )
    setImageData(imgData)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!context || !canvas) return
    const imgData = contextRef.current.getImageData(
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    )
    setImageData(imgData)
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <CanvasContext.Provider
      value={{
        color,
        colors,
        imageData,
        canvasRef,
        contextRef,
        setColor,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => useContext(CanvasContext)
