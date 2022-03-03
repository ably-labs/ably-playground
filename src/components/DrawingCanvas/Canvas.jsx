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
    clearCanvas,
    color,
    colors,
    setColor,
  } = useCanvas()

  useEffect(() => {
    console.log(imageData)
  }, [imageData])

  useEffect(() => {
    prepareCanvas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-8 border-slate-900 my-10 rounded">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </div>
      <div className="flex space-x-4 my-2">
        {Object.entries(colors).map(([key, val]) => (
          <div key={val} className={`rounded-full border-2 border-slate-900`}>
            <button
              onClick={() => setColor(val)}
              style={{ background: val, borderColor: val === color ? val : '' }}
              className={`p-8 border-4 rounded-full`}
            />
          </div>
        ))}
      </div>
      <button
        onClick={clearCanvas}
        className="border-4 border-slate-900 rounded-full py-2 px-6"
      >
        Clear
      </button>
    </div>
  )
}
