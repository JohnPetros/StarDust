import { AchievementMetricValue } from '@stardust/core/profile/types'

import { ProgressBar } from '@/ui/global/widgets/components/ProgressBar'
import { useAchievementProgress } from './useAchievementProgress'

type AchievementProgressProps = {
  metric: AchievementMetricValue
  requiredCount: number
}

export function AchievementProgress({ metric, requiredCount }: AchievementProgressProps) {
  const progress = useAchievementProgress(metric, requiredCount)

  if (progress)
    return (
      <div className='flex w-full items-center gap-2 text-xs text-gray-100'>
        <ProgressBar height={4} value={progress.percentageProgress} />
        <span>
          {progress.absoluteProgress}/{requiredCount}
        </span>
      </div>
    )
}
