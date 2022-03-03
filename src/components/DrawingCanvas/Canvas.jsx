import React, { useEffect, useState } from 'react'
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
  const [clearConfirm, setClearConfirm] = useState(false)

  useEffect(() => {
    if (imageData) {
      console.log(imageData)
    }
  }, [imageData])

  useEffect(() => {
    prepareCanvas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClearClick = () => {
    if (!clearConfirm) {
      return setClearConfirm(true)
    }
    setClearConfirm(false)
    clearCanvas()
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="shadow-lg my-10 rounded-lg relative bg-white">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
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
            <div className="text-slate-600">
              {clearConfirm ? 'Clear the canvas for everyone?' : ' '}
            </div>
            <button
              onClick={onClearClick}
              className={`bg-[#F5F5F6] rounded-full py-3 px-6 transition-all leading-none`}
            >
              {clearConfirm ? 'Yes' : 'Clear canvas'}
            </button>
            {clearConfirm ? (
              <button
                onClick={() => setClearConfirm(false)}
                className="bg-red-50 border-2 border-red-600 text-red-600 rounded-full py-3 px-6 transition-all leading-none"
              >
                No
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
