'use client'

import { useEffect, useState } from 'react'
import { CaretDown, CaretUp, Icon } from '@phosphor-icons/react'

import { PageTransitionAnimation } from '../../../../components/PageTransitionAnimation'

import { FabButton } from './FabButton'
import { Planet } from './Planet'

import { useSiderbar } from '@/contexts/SidebarContext'
import { StarViewPortPosition } from '@/contexts/SpaceContext'
import { useSpace } from '@/contexts/SpaceContext'
import { usePlanet } from '@/hooks/usePlanet'

const fabButtonIcon: Record<StarViewPortPosition, Icon> = {
  above: CaretDown,
  bellow: CaretUp,
  in: CaretDown,
}

export function Space() {
  const { lastUnlockedStarPosition, scrollIntoLastUnlockedStar } = useSpace()
  const { planets, lastUnlockedStarId } = usePlanet()
  const { isOpen, toggle, setIsAchievementsListVisible } = useSiderbar()
  const [isTransitionVisible, setIsTransitionVisible] = useState(
    !planets?.length
  )

  function handleClick() {
    if (isOpen) toggle()

    setIsAchievementsListVisible(false)
  }

  function handleFabButtonClick() {
    scrollIntoLastUnlockedStar()
  }

  useEffect(() => {
    if (planets?.length && isTransitionVisible) {
      setTimeout(() => setIsTransitionVisible(false), 3500)
    }
  }, [planets, isTransitionVisible])

  return (
    <main
      className="flex flex-col items-center bg-green-900 bg-[url('/images/space.png')] bg-center pb-6"
      onClick={handleClick}
    >
      <PageTransitionAnimation isVisible={isTransitionVisible} />
      <ul className=" mt-10 flex max-w-[75vw] flex-col items-start justify-center gap-12">
        {planets?.map((planet) => (
          <Planet
            key={planet.id}
            data={planet}
            lastUnlockedStarId={lastUnlockedStarId}
          />
        ))}
      </ul>

      <FabButton
        isVisible={lastUnlockedStarPosition !== 'in'}
        icon={fabButtonIcon[lastUnlockedStarPosition]}
        label="Ir até a última estrela desbloqueada"
        onClick={handleFabButtonClick}
      />
    </main>
  )
}
