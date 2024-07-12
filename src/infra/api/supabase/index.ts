'use client'

import { useMemo } from 'react'

import { useSupabaseContext } from '@/modules/global/contexts/SupabaseContext/hooks'

import {
  SupabaseAvatarsService,
  SupabaseAchievementsService,
  SupabaseUsersService,
  SupabaseAuthService,
  SupabaseRocketsService,
  SupabasePlanetsService,
  SupabaseStarsService,
  SupabaseRankingsService,
  SupabaseChallengesService,
  SupabaseStorageService,
} from './services'

export function useSupabaseApi() {
  const { supabase } = useSupabaseContext()

  const supabaseApi = useMemo(() => {
    return {
      ...SupabaseAchievementsService(supabase),
      ...SupabaseAuthService(supabase),
      ...SupabaseUsersService(supabase),
      ...SupabaseAvatarsService(supabase),
      ...SupabaseRocketsService(supabase),
      ...SupabasePlanetsService(supabase),
      ...SupabaseStarsService(supabase),
      ...SupabaseRankingsService(supabase),
      ...SupabaseChallengesService(supabase),
      ...SupabaseStorageService(),
    }
  }, [supabase])

  return supabaseApi
}
