import { SupabaseServerClient } from '@/api/supabase/clients'
import { SupabaseChallengingService } from '@/api/supabase/services'
import type { NextParams } from '@/server/next/types'
import { SolutionPage } from '@/ui/challenging/widgets/pages/Solution'
import { Challenge } from '@stardust/core/challenging/entities'

export default async function Page({
  params,
}: NextParams<{ challengeSlug: string; solutionSlug: string }>) {
  const supabase = SupabaseServerClient()
  const challengingService = SupabaseChallengingService(supabase)
  const challengeResponse = await challengingService.fetchChallengeBySlug(
    params.challengeSlug,
  )
  if (challengeResponse.isFailure) challengeResponse.throwError()
  const challenge = Challenge.create(challengeResponse.body)

  const solutionResponse = await challengingService.fetchSolutionBySlug(
    params.solutionSlug,
  )
  if (solutionResponse.isFailure) solutionResponse.throwError()
  const savedSolutionDto = solutionResponse.body

  return <SolutionPage challengeId={challenge.id} savedSolutionDto={savedSolutionDto} />
}
