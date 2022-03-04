import { useCallback, useEffect, useRef, useState } from 'react'
import plus from '../../icons/plus.svg'
import minus from '../../icons/minus.svg'
import play from '../../icons/play.svg'
import refresh from '../../icons/refresh.svg'

import { useChannel } from '@ably-labs/react-hooks'

export function Timer() {
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const [timer, setTimer] = useState(300)
  const [runningTime, setRunningTime] = useState(0)
  const [formattedTime, setFormattedTime] = useState('')

  const [channel] = useChannel('timer', (message) => {
    switch (message.data.action) {
      case 'stop':
        setRunningTime(0)
        setTimer((t) => t - runningTime)
        setIsRunning(false)
        return
      case 'start':
        return setIsRunning(true)
      case 'add30':
        return setTimer((t) => t + 30)
      case 'minus30':
        return setTimer((t) => t - 30)
      default:
        break
    }
  })

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
      return channel.publish('timer', { action: 'stop' })
    }

    return channel.publish('timer', { action: 'start' })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex space-x-4 mb-6 items-center">
        <button
          className="flex w-10 h-10 items-center justify-center rounded-full bg-[#F5F5F6]"
          onClick={() =>
            !isRunning && channel.publish('timer', { action: 'minus30' })
          }
        >
          <img src={minus} className="h-5 w-5" alt="logo" />
        </button>
        <div className="font-medium text-6xl gradient-text" style={{}}>
          {formattedTime}
        </div>
        <button
          className="flex w-10 h-10 items-center justify-center rounded-full bg-[#F5F5F6]"
          onClick={() =>
            !isRunning && channel.publish('timer', { action: 'add30' })
          }
        >
          <img src={plus} className="h-5 w-5" alt="logo" />
        </button>
      </div>
      <button
        className="flex items-center justify-center rounded-full gradient-bg w-12 h-12"
        onClick={onPlayPauseClick}
      >
        {isRunning ? (
          <img src={refresh} className="h-6 w-6" alt="logo" />
        ) : (
          <img src={play} className="h-6 w-6" alt="logo" />
        )}
      </button>
    </div>
  )
}
