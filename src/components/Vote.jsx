import React, { useState } from 'react'

import { useChannel } from "@ably-labs/react-hooks";
import thumbsUp from '../icons/thumbs-up.svg'
import thumbsDown from '../icons/thumbs-down.svg'

export function Vote() {
  const [downVotes, setDownVotes] = useState(0)
  const [upVotes, setUpVotes] = useState(0)
  const [votesRemaining, setVotesRemaining] = useState(1)

  const channelSubscription = 'vote'

  const [channel, ably] = useChannel(channelSubscription, (message) => {
    const data = message.data
    if (data.upVotes > upVotes) setUpVotes(data.upVotes)
    if (data.downVotes > downVotes) setUpVotes(data.downVotes)
  });

  const onVoteDown = () => {
    console.log(votesRemaining)
    if (!votesRemaining) return

    setDownVotes((currentDownVotes) => currentDownVotes + 1)
    setVotesRemaining(votesRemaining - 1)

    channel.publish(channelSubscription, { action: 'down', upVotes: upVotes, downVotes: downVotes + 1 });
  }

  const onVoteUp = () => {
    console.log(votesRemaining)
    if (!votesRemaining) return

    setUpVotes((currentUpVotes) => currentUpVotes + 1)
    setVotesRemaining(votesRemaining - 1)

    channel.publish(channelSubscription, { action: 'up', upVotes: upVotes + 1, downVotes: downVotes });
  }

  const onVoteReset = () => {
    setUpVotes(0)
    setDownVotes(0)
    setVotesRemaining(1)

    channel.publish(channelSubscription, { action: 'reset' });
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
      <button onClick={onVoteReset}>
        Reset Votes
      </button>
    </div>
  )
}
