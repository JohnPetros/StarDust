import { HandleUserSignedUpJob } from '@/queue/jobs/profile'
import { KEY } from '@/queue/jobs/profile/HandleUserSignedUpJob'
import { SupabaseServerClient } from '@/api/supabase/clients'
import { SupabaseProfileService } from '@/api/supabase/services'
import { inngest } from '../../client'
import { InngestQueue } from '../../InngestQueue'

export const handleUserSignedUp = inngest.createFunction(
  { id: KEY },
  { event: 'auth/user.signed.up' },
  async (context) => {
    const supabase = SupabaseServerClient()
    const profileService = SupabaseProfileService(supabase)
    const queue = InngestQueue<typeof context.event.data>(context)
    const job = HandleUserSignedUpJob(profileService)
    return await job.handle(queue)
  },
)
