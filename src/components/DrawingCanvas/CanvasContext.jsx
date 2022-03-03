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
  const [isDrawing, setIsDrawing] = useState(false)
  const [imageData, setImageData] = useState(null)
  const [canvasWidth, setCanvasWidth] = useState(800)
  const [canvasHeight, setCanvasHeight] = useState(600)
  const [color, setColor] = useState(colors.gray)
  const [points, setPoints] = useState([])
  const [startingPoint, setStartingPoint] = useState({})

  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const setCanvasDimensions = ({ width, height }) => {
    setCanvasWidth(width)
    setCanvasHeight(height)

    prepareCanvas({ width, height })
  }

  const prepareCanvas = ({ width = 800, height = 600 }) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = width
      canvas.height = height
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const context = canvas.getContext('2d')

      if (!context) return

      context.scale(1, 1)
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

    console.log(points)

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

    var g = JSON.stringify(points).replace(/[\[\]\,\"]/g, '') //stringify and remove all "stringification" extra data

    console.log(g.length)
    setImageData(points)

    setStartingPoint(null)
    setIsDrawing(false)
    setPoints([])

    const imgData = canvasRef.current.toDataURL('image/svg')
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!context || !canvas) return
    const imgData = contextRef.current.getImageData(
      0,
      0,
      canvasWidth,
      canvasHeight
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
        setCanvasDimensions,
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
