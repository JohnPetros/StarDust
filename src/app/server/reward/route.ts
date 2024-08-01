import type { NextRequest } from 'next/server'

import { NextHttp } from '@/server/protocols/http'
import { SupabaseRouteHandlerClient } from '@/infra/api/supabase/clients'
import {
  SupabaseAuthService,
  SupabasePlanetsService,
  SupabaseStarsService,
  SupabaseUsersService,
} from '@/infra/api/supabase/services'

import { RewardUserController } from '@/server/controllers/app'

export async function POST(request: NextRequest) {
  const nextHttp = NextHttp(request)

  const supabase = SupabaseRouteHandlerClient()
  const authService = SupabaseAuthService(supabase)
  const usersService = SupabaseUsersService(supabase)
  const starsService = SupabaseStarsService(supabase)
  const planetsService = SupabasePlanetsService(supabase)

  const controller = RewardUserController(
    authService,
    usersService,
    starsService,
    planetsService,
  )

  const httpResponse = await controller.handle(nextHttp)

  return httpResponse.body
}
