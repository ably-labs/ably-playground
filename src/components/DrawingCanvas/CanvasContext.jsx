import React, { useContext, useRef, useState } from 'react'

const CanvasContext = React.createContext({})

const colors = [
  '#64748b',
  '#ef4444',
  '#f59e0b',
  '#84cc16',
  '#10b981',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
]

export const CanvasProvider = ({ children }) => {
  const MULTIPLIER = 2
  const CANVAS_WIDTH = 800 * MULTIPLIER
  const CANVAS_HEIGHT = 600 * MULTIPLIER
  const [isDrawing, setIsDrawing] = useState(false)
  const [imageData, setImageData] = useState(null)
  const [color, setColor] = useState(colors[0])
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
      context.imageSmoothingQuality = 'high'
      context.lineCap = 'round'
      context.strokeStyle = color
      context.lineWidth = 5
      contextRef.current = context
    }
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    if (!contextRef.current) return
    contextRef.current.strokeStyle = color
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    if (!contextRef.current) return
    contextRef.current.closePath()
    setIsDrawing(false)
    const imgData = contextRef.current.getImageData(
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    )
    setImageData(imgData)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !contextRef.current) return
    const { offsetX, offsetY } = nativeEvent
    console.log(contextRef.current)
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!context || !canvas) return
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
