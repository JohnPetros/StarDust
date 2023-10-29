'use client'
import { useRocket } from '@/hooks/useRocket'
import { useRanking } from '@/hooks/useRanking'

import { UserAvatar } from '../../components/UserAvatar'
import { Loading } from '@/app/components/Loading'
import { Status } from './Status'
import { CalendarBlank, GearSix, Shield } from '@phosphor-icons/react'

import { getImage } from '@/utils/functions'

import { User as UserType } from '@/@types/user'

import Link from 'next/link'
import dayjs from 'dayjs'

import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

interface UserProps {
  data: UserType
}

export function User({
  data: { id, ranking_id, rocket_id, avatar_id, name, level, xp, created_at },
}: UserProps) {
  const { user } = useAuth()
  const isAuthUser = id === user?.id

  const { ranking } = useRanking(ranking_id)
  const { rocket } = useRocket(rocket_id)

  if (!ranking || !rocket) return <Loading isSmall={false} />

  const rankingImage = getImage('rankings', ranking.image)
  const rocketImage = getImage('rockets', rocket.image)

  const createdAt = dayjs(created_at).format('DD MMMM [de] YYYY')

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:gap-6 pb-6 border-b border-gray-300">
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
        <UserAvatar avatarId={avatar_id} size={148} />
        <div className="flex flex-col md:items-start gap-2">
          <strong className="text-green-500 text-lg text-center mt-3 truncate">
            {name}
          </strong>
          <div className="flex items-center justify-center gap-2">
            <Shield
              className="text-green-500 text-lg hidden md:block"
              weight="bold"
            />
            <strong className="text-gray-100 text-sm">
              Nível {level} - {xp} xp
            </strong>
          </div>

          <div className="flex items-center justify-center gap-2">
            <CalendarBlank
              className="text-green-500 text-lg hidden md:block"
              weight="bold"
            />
            <p className="text-gray-300 text-sm">Por aqui desde {createdAt}</p>
          </div>
        </div>
      </div>

      <dl className="flex md:flex-row md:gap-8 justify-between mt-6">
        <span className="hidden md:block bg-gray-300 w-[1px] rounded-md"></span>
        <Status
          title="Ranking atual"
          image={rankingImage}
          value={ranking.name}
        />
        <Status title="Foguete atual" image={rocketImage} value={rocket.name} />
      </dl>

      <div className="w-6 flex justify-start h-full">
        {isAuthUser && (
          <Link href="/settings">
            <motion.div whileHover={{ rotate: '90deg' }}>
              <GearSix className="text-green-500 text-4xl hidden md:block" />
            </motion.div>
          </Link>
        )}
      </div>
    </div>
  )
}
