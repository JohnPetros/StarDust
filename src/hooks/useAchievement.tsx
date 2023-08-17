'use client'

import { useApi } from '@/services/api'
import { Achievement } from '@/types/achievement'
import { useMemo } from 'react'
import useSWR from 'swr'
import { useAuth } from './useAuth'

export function useAchievement(userId?: string) {
  const api = useApi()

  async function getUserUnlockedAchievementsIds() {
    if (userId) {
      console.log(userId)

      return await api.getUserUnlockedAchievementsIds(userId)
    }
  }

  async function getUserRescuableAchievementsIds() {
    if (userId) {
      return await api.getUserRescuableAchievementsIds(userId)
    }
  }

  const { data: achievements } = useSWR('/achievements', api.getAchievements)

  const { data: userUnlockedAchievementsIds } = useSWR(
    '/unlocked_achievements_ids?user_id=' + userId,
    getUserUnlockedAchievementsIds
  )

  const { data: userRescuableAchievementsIds } = useSWR(
    '/rescuableachievements_ids?user_id=' + userId,
    getUserRescuableAchievementsIds
  )

  function verifyAchievement(
    achievement: Achievement,
    userUnlockedAchievementsIds: string[],
    userRescuableAchievementsIds: string[]
  ): Achievement {
    console.log(userUnlockedAchievementsIds)

    const isUnlocked = userUnlockedAchievementsIds.some(
      (unlockedAchievementId) => unlockedAchievementId === achievement.id
    )

    const isRescuable = userRescuableAchievementsIds.some(
      (rescuableachievementId) => rescuableachievementId === achievement.id
    )

    return { ...achievement, isUnlocked, isRescuable }
  }

  const verifiedAchievements = useMemo(() => {
    if (
      userId &&
      achievements &&
      userUnlockedAchievementsIds &&
      userRescuableAchievementsIds
    ) {
      return achievements.map((achievement) =>
        verifyAchievement(
          achievement,
          userUnlockedAchievementsIds,
          userRescuableAchievementsIds
        )
      )
    }
  }, [
    userId,
    achievements,
    userUnlockedAchievementsIds,
    userRescuableAchievementsIds,
  ])

  return { achievements: verifiedAchievements }
}
