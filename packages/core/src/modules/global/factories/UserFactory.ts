import type { UserDto } from '#global/dtos'
import { Email, Integer, List, Logical, Name, Slug } from '#global/structs'
import { Level, WeekStatus } from '#profile/structs'
import { Avatar, Rocket } from '#shop/entities'
import { RankingPosition } from '#ranking/structs'
import { Tier } from '#ranking/entities'

export class UserFactory {
  static produce(dto: UserDto) {
    return {
      email: Email.create(dto.email),
      slug: dto.slug ? Slug.create(dto.slug) : Slug.create(dto.name),
      name: Name.create(dto.name),
      rocket: Rocket.create(dto.rocket),
      avatar: Avatar.create(dto.avatar),
      tier: Tier.create(dto.tier),
      level: Level.create(dto.level),
      coins: Integer.create('Moedas do usuário', dto.coins ?? 0),
      xp: Integer.create('Xp do usuário', dto.xp ?? 0),
      weeklyXp: Integer.create('Xp semanal do usuário', dto.weeklyXp ?? 0),
      weekStatus: WeekStatus.create(dto?.weekStatus),
      streak: Integer.create('Streak do usuário', dto?.streak ?? 0),
      lastWeekRankingPosition: dto.lastWeekRankingPosition
        ? RankingPosition.create(dto.lastWeekRankingPosition)
        : null,
      didBreakStreak: Logical.create(
        'Esse usuário quebrou sua streak?',
        dto?.didBreakStreak ?? false,
      ),
      canSeeRankingResult: Logical.create(
        'Esse usuário pode ver o resultado do ranking?',
        dto?.canSeeRankingResult ?? false,
      ),
      hasCompletedSpace: Logical.create(
        'Esse usuário já completou todos os planetas?',
        dto?.hasCompletedSpace ?? false,
      ),
      unlockedAchievementsIds: List.create(dto?.unlockedAchievementsIds ?? []),
      rescuableAchievementsIds: List.create(dto?.rescuableAchievementsIds ?? []),
      acquiredRocketsIds: List.create(dto?.acquiredRocketsIds ?? []),
      acquiredAvatarsIds: List.create(dto?.acquiredAvatarsIds ?? []),
      unlockedStarsIds: List.create(dto?.unlockedStarsIds ?? []),
      unlockedDocsIds: List.create(dto?.unlockedDocsIds ?? []),
      completedChallengesIds: List.create(dto?.completedChallengesIds ?? []),
      completedPlanetsIds: List.create(dto?.completedPlanetsIds ?? []),
      upvotedCommentsIds: List.create(dto?.upvotedCommentsIds ?? []),
      createdAt: dto?.createdAt ?? new Date(),
      id: dto?.id,
    }
  }
}
