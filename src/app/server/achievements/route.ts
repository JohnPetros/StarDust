import { NextHttp } from '@/infra/api/next/http'
import { SupabaseRouteHandlerClient } from '@/infra/api/supabase/clients'
import { SupabaseAchievementsService } from '@/infra/api/supabase/services'
import { FetchAchievementsController } from '@/infra/api/next/controllers/app'

export async function GET() {
  const nextHttp = NextHttp()

  const supabase = SupabaseRouteHandlerClient()
  const service = SupabaseAchievementsService(supabase)

  const controller = FetchAchievementsController(service)
  const httpResponse = await controller.handle(nextHttp)

  return httpResponse.body
}
