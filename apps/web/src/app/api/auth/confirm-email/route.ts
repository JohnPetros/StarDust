import type { NextRequest } from 'next/server'
import { z } from 'zod'

import { NextHttp } from '@/api/next/NextHttp'
import { runApiRoute } from '@/api/next/utils'
import { SupabaseRouteHandlerClient } from '@/api/supabase/clients'
import { ConfirmEmailController } from '@/api/controllers/auth'
import { SupabaseAuthService } from '@/api/supabase/services'

export const dynamic = "force-dynamic"

const schema = z.object({
  queryParams: z.object({
    token: z.string({ required_error: 'token é obrigatório' }),
  }),
})

type Schema = z.infer<typeof schema>

export async function GET(request: NextRequest) {
  return runApiRoute(async () => {
    const http = await NextHttp<Schema>({ request, schema })
    const supabase = SupabaseRouteHandlerClient()
    const authService = SupabaseAuthService(supabase)
    const controller = ConfirmEmailController(authService)
    return controller.handle(http)
  })
}
