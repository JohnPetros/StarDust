'use client'

import { useAuthContext } from '@/ui/global/contexts/AuthContext'
import { AppError } from '@/ui/global/components/shared/AppError'
import { ChallengeCard } from './ChallengeCard'
import { useChallengesList } from './useChallengesList'
import { _listChallenges } from './_listChallenges'

export function ChallengesList() {
  const { user } = useAuthContext()
  const { challenges, error } = useChallengesList(_listChallenges)

  if (error) return <AppError error={error} />

  if (user)
    return (
      <div className='mx-auto max-w-2xl px-6 pb-40 md:px-0'>
        <div className='space-y-6'>
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title.value}
              slug={challenge.slug.value}
              authorSlug={challenge.authorSlug.value}
              categories={challenge.categories}
              difficultyLevel={challenge.difficulty.level}
              downvotesCount={challenge.downvotesCount.value}
              completionsCount={challenge.completionsCount.value}
              upvotesCount={challenge.upvotesCount.value}
              isCompleted={user.hasCompletedChallenge(challenge.id).isTrue}
            />
          ))}
        </div>
      </div>
    )
}
