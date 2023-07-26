'use client'

import { useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'

import { ToastRef, Toast } from '@/app/components/Toast'
import { NavButton } from './NavButton'
import { AchievementsList } from './AchievementsList'
import { SidenavButton } from './SidenavButton'

import { CaretLeft, CaretRight, Flag, Power } from '@phosphor-icons/react'
import { AnimatePresence, Variants, motion } from 'framer-motion'

import { HOME_PAGES } from '@/utils/constants/home-pages'

const sidenavVariants: Variants = {
  shrink: {
    width: 88,
  },
  expand: {
    width: 164,
  },
}

const achievementsVariants: Variants = {
  hidden: {
    width: 0,
    opacity: 0,
  },
  visible: {
    width: 320,
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.2,
      when: 'beforeChildren',
    },
  },
}

interface SidenavProps {
  isExpanded: boolean
  toggleSidenav: VoidFunction
}

export function Sidenav({ isExpanded, toggleSidenav }: SidenavProps) {
  const { signOut } = useAuth()
  const [isAchievementsListVisible, setIsAchievementsListVisible] =
    useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toastRef = useRef<ToastRef>(null)

  function handleAchievementsListButtonClick() {
    setIsAchievementsListVisible(!isAchievementsListVisible)
  }

  async function handleSignOutButtonClick() {
    setIsLoading(true)

    const error = await signOut()

    if (error) {
      toastRef.current?.open({
        type: 'error',
        message: 'Erro ao tentar fazer logout',
      })
    }
  }

  return (
    <motion.div
      variants={sidenavVariants}
      initial="shrink"
      animate={isExpanded ? 'expand' : ''}
      className="hidden md:flex md:fixed left-0 bg-gray-900 h-full z-50"
    >
      <Toast ref={toastRef} />

      <div className="reative flex flex-col justify-between h-full">
        <button
          onClick={toggleSidenav}
          className="absolute top-20 -right-2 rounded-full bg-green-400 p-1 grid place-content-center z-40"
        >
          {isExpanded ? (
            <CaretLeft className="text-gray-800 text-sm" weight="bold" />
          ) : (
            <CaretRight className="text-gray-800 text-sm" weight="bold" />
          )}
        </button>
        <div>
          <div className="border-b border-green-700 h-16 mx-3 grid place-content-center">
            {isExpanded ? (
              <Image
                src="/images/logo.svg"
                width={96}
                height={96}
                alt="StarDust"
              />
            ) : (
              <Image src="/icons/rocket.svg" width={30} height={30} alt="" />
            )}
          </div>

          <nav className="mt-12 flex flex-col px-3 gap-3">
            {HOME_PAGES.map(({ path, icon, label }) => (
              <NavButton
                key={path}
                path={path}
                label={label}
                icon={icon}
                isExpanded={isExpanded}
                isColumn={false}
              />
            ))}
          </nav>
        </div>

        <AnimatePresence>
          {isAchievementsListVisible && (
            <motion.div
              variants={achievementsVariants}
              initial="hidden"
              animate={isAchievementsListVisible ? 'visible' : ''}
              exit="hidden"
              className="bg-gray-900 border-l border-green-400 p-6 mt-16 absolute top-0 right-0 translate-x-[100%] w-80 custom-scrollbar h-full overflow-y-scroll"
            >
              <AchievementsList />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-t border-green-700 flex flex-col gap-1 mx-3 px-3 py-3">
          <SidenavButton
            icon={Flag}
            title="Conquistas"
            isExpanded={isExpanded}
            onClick={handleAchievementsListButtonClick}
            isActive={isAchievementsListVisible}
            isLoading={false}
          />

          <SidenavButton
            icon={Power}
            title="Sair"
            isExpanded={isExpanded}
            onClick={handleSignOutButtonClick}
            isActive={false}
            isLoading={isLoading}
          />
        </div>
      </div>
    </motion.div>
  )
}
