import React, { useState } from 'react'

import thumbsUp from '../icons/thumbs-up.svg'
import thumbsDown from '../icons/thumbs-down.svg'

export function Vote() {
  const [downVotes, setDownVotes] = useState(0)
  const [upVotes, setUpVotes] = useState(0)
  const [votesRemaining, setVotesRemaining] = useState(1)

  const onVoteDown = () => {
    console.log(votesRemaining)
    if (!votesRemaining) return

    setDownVotes((currentDownVotes) => currentDownVotes + 1)
    setVotesRemaining(votesRemaining - 1)
  }

  const onVoteUp = () => {
    console.log(votesRemaining)
    if (!votesRemaining) return

    setUpVotes((currentUpVotes) => currentUpVotes + 1)
    setVotesRemaining(votesRemaining - 1)
  }

  return (
    <div className="flex flex-row justify-center items-center h-full">
      <div>{downVotes}</div>
      <button onClick={onVoteDown}>
        <img src={thumbsDown} className="h-10" alt="logo" />
      </button>
      <button onClick={onVoteUp}>
        <img src={thumbsUp} className="h-10" alt="logo" />
      </button>
      <div>{upVotes}</div>
    </div>
  )
}
