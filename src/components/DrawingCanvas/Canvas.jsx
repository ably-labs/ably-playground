import React, { useEffect } from 'react'
import { useCanvas } from './CanvasContext'

export function Canvas() {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
    imageData,
  } = useCanvas()

  console.log(imageData)

  useEffect(() => {
    prepareCanvas()
  }, [])

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      className="border border-slate-600"
    />
  )
}
