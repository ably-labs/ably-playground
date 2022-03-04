import React, { useState } from 'react'

import { useChannel } from '@ably-labs/react-hooks'
import thumbsUp from '../icons/thumbs-up.svg'
import thumbsDown from '../icons/thumbs-down.svg'

export function Vote() {
  const [downVotes, setDownVotes] = useState(0)
  const [upVotes, setUpVotes] = useState(0)
  const [votesRemaining, setVotesRemaining] = useState(1)

  const channelSubscription = 'vote'

  const [channel] = useChannel(channelSubscription, (message) => {
    switch (message.data.action) {
      case 'down':
        setDownVotes((v) => v + 1)
        break

      case 'up':
        setUpVotes((v) => v + 1)
        break

      case 'reset':
        setDownVotes(0)
        setUpVotes(0)
        break

      default:
        return null
    }
  })

  const onVoteDown = () => {
    if (!votesRemaining) return

    // setDownVotes((currentDownVotes) => currentDownVotes + 1)
    setVotesRemaining(votesRemaining - 1)

    channel.publish(channelSubscription, {
      action: 'down',
      upVotes: upVotes,
      downVotes: downVotes + 1,
    })
  }

  const onVoteUp = () => {
    if (!votesRemaining) return

    // setUpVotes((currentUpVotes) => currentUpVotes + 1)
    setVotesRemaining(votesRemaining - 1)

    channel.publish(channelSubscription, {
      action: 'up',
      upVotes: upVotes + 1,
      downVotes: downVotes,
    })
  }

  const onVoteReset = () => {
    setVotesRemaining(1)

    channel.publish(channelSubscription, { action: 'reset' })
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex space-x-4 justify-center items-center mb-6">
        <div className="flex w-10 h-10 items-center justify-center rounded-full bg-[#F5F5F6]">
          <span className="leading-none">{downVotes}</span>
        </div>
        <button
          onClick={onVoteDown}
          className="flex w-16 h-16 items-center justify-center rounded-full bg-[#FECDCD]"
        >
          <img src={thumbsDown} className="h-5 w-5" alt="logo" />
        </button>
        <button
          onClick={onVoteUp}
          className="flex w-16 h-16 items-center justify-center rounded-full bg-[#C7FACC]"
        >
          <img src={thumbsUp} className="h-5 w-5" alt="logo" />
        </button>
        <div className="flex w-10 h-10 items-center justify-center rounded-full bg-[#F5F5F6]">
          <span>{upVotes}</span>
        </div>
      </div>
      <button
        onClick={onVoteReset}
        className="bg-[#F5F5F6] rounded-full py-3 px-6 leading-none"
      >
        Reset Votes
      </button>
    </div>
  )
}
