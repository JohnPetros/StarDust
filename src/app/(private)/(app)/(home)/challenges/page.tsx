'use client'
import { useChallengesList } from '@/hooks/useChallengesList'

import { Challenge } from './components/Challenge'
import { Filters } from './components/Filters'

export default function Challenges() {
  const { challenges } = useChallengesList()

  console.log(challenges)

  return (
    <div className="mx-auto max-w-2xl mt-10 pb-10">
      <Filters />

      {challenges && (
        <div className="space-y-6 mt-10">
          {challenges.map((challenge) => (
            <Challenge
              key={challenge.id}
              data={challenge}
              isCompleted={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}
