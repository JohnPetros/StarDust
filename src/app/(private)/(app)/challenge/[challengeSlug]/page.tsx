import { notFound } from 'next/navigation'

import { getChallenge } from './actions/getChallenge'
import { Header } from './components/Header'

import type { Challenge } from '@/@types/challenge'
import type { Vote } from '@/@types/vote'
import { createServerClient } from '@/services/api/supabase/clients/serverClient'
import { AuthController } from '@/services/api/supabase/controllers/authController'
import { ChallengesController } from '@/services/api/supabase/controllers/challengesController'
import { DictionaryTopicsController } from '@/services/api/supabase/controllers/dictionaryTopicsController'
import { ERRORS } from '@/utils/constants'

let challenge: Challenge
let userVote: Vote

type ChallengePageProps = {
  params: { challengeSlug: string }
}

export default async function ChallengePage({
  params: { challengeSlug },
}: ChallengePageProps) {
  const supabase = createServerClient()
  const authController = AuthController(supabase)

  const userId = await authController.getUserId()

  if (!userId) throw new Error(ERRORS.auth.userNotFound)

  try {
    challenge = await getChallenge(challengeSlug, userId)
  } catch (error) {
    console.error(error)
    notFound()
  }

  try {
    const challengesController = ChallengesController(supabase)
    userVote = await challengesController.getUserVote(userId, challenge.id)
  } catch (error) {
    userVote = null
  }

  try {
    const hasDictionaryTopic = !challenge.isCompleted && challenge.star_id

    if (hasDictionaryTopic && challenge.dictionary_topic_id) {
      const dictionaryTopicsController = DictionaryTopicsController(supabase)

      const isDictionaryTopicUnlocked =
        await dictionaryTopicsController.checkDictionaryTopicUnlocking(
          challenge.dictionary_topic_id,
          userId
        )

      if (!isDictionaryTopicUnlocked)
        await dictionaryTopicsController.addUnlockedDictionaryTopic(
          challenge.dictionary_topic_id,
          userId
        )
    }
  } catch (error) {
    console.error(error)
    throw new Error(ERRORS.dictionary.failedTopicUnlocking)
  }

  return <Header challenge={challenge} userVote={userVote} />
}
