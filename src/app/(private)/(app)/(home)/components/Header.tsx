'use client'

import { List } from '@phosphor-icons/react'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'

import StreakAnimation from '../../../../../../public/animations/streak.json'

import { UserAvatar } from './UserAvatar'

import { Animation } from '@/app/components/Animation'
import { useAuth } from '@/hooks/useAuth'
import { useSiderbar } from '@/hooks/useSiderbar'

const headerAnimations: Variants = {
  hidden: {
    y: -64,
  },
  visible: {
    y: 0,
    transition: {
      delay: 2,
    },
  },
}

export function Header() {
  const { user } = useAuth()
  const { toggle } = useSiderbar()

  if (user?.id)
    return (
      <motion.header
        variants={headerAnimations}
        initial="hidden"
        animate="visible"
        className="fixed top-0 z-40 flex h-16 w-screen justify-between border-b border-gray-700 bg-gray-900 px-6 py-3 md:justify-end"
      >
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggle}>
            <List
              width={24}
              height={24}
              className="text-green-400"
              weight="bold"
            />
          </button>
          <Image
            src="/images/logo.svg"
            width={100}
            height={100}
            alt="StarDust"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/coin.svg"
              width={26}
              height={26}
              alt="Star Coins"
            />
            <span className="block pt-1 text-lg font-semibold text-yellow-400">
              {user?.coins}
            </span>
          </div>

          <div className="flex items-center">
            <Animation src={StreakAnimation} size={32} hasLoop={false} />
            <span className="text-lg font-semibold text-green-500">
              {user?.streak}
            </span>
          </div>
        </div>

        {user && (
          <div className="ml-6 hidden items-center gap-6 md:flex">
            <div className="flex flex-col items-center text-sm text-gray-100">
              <strong>{user?.name}</strong>
              <small>{user?.email}</small>
            </div>
            <UserAvatar avatarId={user?.avatar_id} size={48} />
          </div>
        )}
      </motion.header>
    )
}
