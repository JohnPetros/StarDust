import { ValidationError } from '#global/errors'
import type { AchievementMetricValue } from '#profile/types'
import { StringValidation } from '#libs'

export class AchievementMetric {
  readonly value: AchievementMetricValue

  private constructor(value: AchievementMetricValue) {
    this.value = value
  }

  static create(value: string) {
    if (!AchievementMetric.isMetric(value)) {
      throw new ValidationError([
        { name: 'achievement-metric', messages: ['Achievement Metric is not valid'] },
      ])
    }

    return new AchievementMetric(value)
  }

  static isMetric(value: string): value is AchievementMetricValue {
    new StringValidation(value, 'Achievement Metric')
      .oneOf([
        'unlockedStarsCount',
        'acquiredRocketsCount',
        'completedChallengesCount',
        'completedPlanetsCount',
        'xp',
        'streak',
      ])
      .validate()

    return true
  }
}
