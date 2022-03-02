import React, { useContext, useRef, useState } from 'react'

const CanvasContext = React.createContext({})

export const CanvasProvider = ({ children }) => {
  const CANVAS_WIDTH = 8000
  const CANVAS_HEIGHT = 6000
  const [isDrawing, setIsDrawing] = useState(false)
  const [imageData, setImageData] = useState(null)
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const prepareCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = CANVAS_WIDTH
      canvas.height = CANVAS_HEIGHT
      canvas.style.width = `${CANVAS_WIDTH / 10}px`
      canvas.style.height = `${CANVAS_HEIGHT / 10}px`

      const context = canvas.getContext('2d')

      if (!context) return

      context.scale(10, 10)
      context.imageSmoothingQuality = 'high'
      context.lineCap = 'round'
      context.strokeStyle = 'red'
      context.lineWidth = 5
      contextRef.current = context
    }
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    if (!contextRef.current) return
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
        imageData,
        canvasRef,
        contextRef,
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
