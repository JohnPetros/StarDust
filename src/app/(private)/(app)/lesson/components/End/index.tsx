'use client'
import { useEffect, useReducer, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useApi } from '@/services/api'

import { motion, Variants } from 'framer-motion'

import { Metric } from './Metric'

import ApolloContratulating from '../../../../../../../public/animations/apollo-congratulating.json'
import StarsChain from '../../../../../../../public/animations/stars-chain.json'
import Lottie, { LottieRef } from 'lottie-react'

import { playSound } from '@/utils/functions'

import type { User } from '@/types/user'
import { Button } from '@/app/components/Button'
import { StreakIcon } from '../../../(home)/components/StreakIcon'
import { Streak } from '../../../(home)/profile/components/Streak'

const apolloAnimations: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
}

export interface updateUserDataParam {
  newCoins: number
  newXp: number
  user: User
}

interface EndProps {
  coins: number
  xp: number
  time: string
  accurance: string
  starId: string | null
  challengeId: string | null
  userDataUpdater: ({}: updateUserDataParam) => Promise<Partial<User>>
  onExit: () => void
}

export function End({
  accurance,
  coins,
  time,
  xp,
  starId,
  challengeId,
  userDataUpdater,
  onExit,
}: EndProps) {
  const { user, updateUser } = useAuth()
  const api = useApi()

  const [hasNewLevel, setHasNewLevel] = useState(false)
  const [isFirstClick, setIsFirstClick] = useState(true)
  const [isStreakVisible, setIsStreakVisible] = useState(false)
  const [isEndMessageVisible, setIsEndMessageVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  function getUpdatedLevel(updatedXp: number) {
    if (!user) return

    const hasNewLevel = updatedXp >= 50 * user.level + 25

    if (hasNewLevel) {
      const newLevel = user.level + 1
      setHasNewLevel(hasNewLevel)

      return newLevel
    }

    return user.level
  }

  async function getUpdatedUserData() {
    if (!user) return
    return await userDataUpdater({ newCoins: 25, newXp: 20, user })
  }

  const starsChainRef = useRef(null) as LottieRef

  async function updateUserData() {
    const updatedUserData = await getUpdatedUserData()

    if (updatedUserData) {
      const updatedLevel = updatedUserData.xp
        ? getUpdatedLevel(updatedUserData.xp)
        : user?.level

      const data = { ...updatedUserData, level: updatedLevel }

      // const error = await updateUser(data)
    }
  }

  function pauseStarsAnimation() {
    const totalStars = (parseInt(accurance) * 5) / 100

    starsChainRef.current?.goToAndPlay(0)

    const delay = 500 * (!isNaN(totalStars) ? totalStars : 5)

    setTimeout(() => {
      starsChainRef.current?.pause()
    }, delay)
  }

  function handleFirstButtonClick() {
    if (!user) return

    const todayIndex = new Date().getDay()
    const todayStatus = user.week_status[todayIndex]

    // modalRef.current?.open()

    setIsStreakVisible(todayStatus === 'todo')
    // setIsFirstClick(false)
  }

  function handleSecondButtonClick() {
    setIsLoading(true)
    onExit()
  }

  useEffect(() => {
    pauseStarsAnimation()

    //  const time = setTimeout(async () => {
    //     await updateUserData()
    //   }, 250)

    //   playSound('earning.wav')

    //   return () => clearTimeout(time)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center mt-12 mx-auto px-6 w-full max-w-lg">
      {!isStreakVisible && !isEndMessageVisible && (
        <>
          <h3 className="text-gray-100 text-xl font-semibold">
            Fase completada!
          </h3>
          <Lottie
            lottieRef={starsChainRef}
            animationData={StarsChain}
            style={{ width: 180 }}
            loop={false}
            autoplay={true}
          />
          <motion.div
            variants={apolloAnimations}
            initial="hidden"
            animate="visible"
          >
            <Lottie
              animationData={ApolloContratulating}
              style={{ width: 280 }}
              loop={true}
            />
          </motion.div>
          <dl className="flex flex-col items-center justify-center mt-3">
            <div className="mx-auto">
              <Metric
                title="Poeira estelar"
                amount={coins}
                color="yellow"
                icon="coin.svg"
                isLarge={true}
                delay={1}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <Metric
                title="Total de xp"
                amount={xp}
                color="green"
                icon="xp.svg"
                isLarge={false}
                delay={1.5}
              />

              <Metric
                title="Tempo"
                amount={time}
                color="blue"
                icon="clock.svg"
                isLarge={false}
                delay={2}
              />

              <Metric
                title="Acertos"
                amount={accurance}
                color="red"
                icon="percent.svg"
                isLarge={false}
                delay={2.5}
              />
            </div>
          </dl>
        </>
      )}
      {isStreakVisible && user && (
        <>
          <StreakIcon size={180} />

          <Streak data={user} />
        </>
      )}

      <div className="mt-10 w-80">
        <Button
          onClick={
            isFirstClick ? handleFirstButtonClick : handleSecondButtonClick
          }
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
