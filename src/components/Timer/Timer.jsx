import { useCallback, useEffect, useRef, useState } from 'react'

export function Timer() {
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const [timer, setTimer] = useState(300)
  const [runningTime, setRunningTime] = useState(0)
  const [formattedTime, setFormattedTime] = useState('')

  const getFormattedTime = useCallback(() => {
    const time = timer - runningTime
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }, [runningTime, timer])

  useEffect(() => {
    const formattedTime = getFormattedTime()
    setFormattedTime(formattedTime)
  }, [runningTime, getFormattedTime])

  useEffect(() => {
    if (isRunning) {
      const startTimeStamp = Date.now()

      intervalRef.current = setInterval(() => {
        const timeInterval = Math.floor((Date.now() - startTimeStamp) / 1000)
        setRunningTime((t) => (t === timeInterval ? t : timeInterval))
      }, 100)
    } else {
      return clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const onPlayPauseClick = () => {
    if (isRunning) {
      setRunningTime(0)
      setTimer((t) => t - runningTime)
    }

    setIsRunning(!isRunning)
  }

  return (
    <div className="h-full flex items-center justify-center">
      <button onClick={() => !isRunning && setTimer((v) => v - 30)}>-</button>
      <div>{formattedTime}</div>
      <button onClick={() => !isRunning && setTimer((v) => v + 30)}>+</button>
      <button onClick={onPlayPauseClick}>Play</button>
    </div>
  )
}
