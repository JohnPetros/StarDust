import { useEffect, useState } from 'react'

import { useAuthContext } from '@/ui/auth/contexts/AuthContext'
import { AchievementMetricValue } from '@stardust/core/profile/types'
import { AchievementProgress } from '@stardust/core/profile/structs'

export function useAchievementProgress(
  metric: AchievementMetricValue,
  requiredCount: number,
) {
  const { user } = useAuthContext()

  const [progress, setProgress] = useState<AchievementProgress | null>(null)

  useEffect(() => {
    if (!user) return

    const progress = AchievementProgress.create(
      user.getAchievementCount(metric).value,
      requiredCount,
    )

    setProgress(progress)
  }, [user, metric, requiredCount])

  return progress
}
