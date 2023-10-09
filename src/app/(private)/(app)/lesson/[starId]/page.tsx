'use client'

import { useEffect, useRef, useState } from 'react'
import { useLesson } from '@/hooks/useLesson'
import { useStar } from '@/hooks/useStar'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/app/components/Button'
import { Modal, ModalRef } from '@/app/components/Modal'
import { TransitionPageAnimation } from '../../components/TransitionPageAnimation'
import { Header } from '../components/Header'
import { Theory } from '../components/Theory'
import { Quiz } from '../components/Quiz'
import { End } from '../components/End'

import { formatSecondsToTime } from '@/utils/functions'

export default function Lesson() {
  const { starId } = useParams()
  const { star, nextStar, updateUserData } = useStar(String(starId))

  const {
    state: { currentStage, questions, incorrectAnswersAmount, secondsAmount },
    dispatch,
  } = useLesson()

  const [isTransitionVisible, setIsTransitionVisible] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<ModalRef>(null)

  const [coins, setCoins] = useState(0)
  const [xp, setXp] = useState(0)
  const [time, setTime] = useState('')
  const [accurance, setAccurance] = useState('')

  const router = useRouter()

  function leaveLesson() {
    router.push('/')
  }

  function getAccurance() {
    const accurance =
      ((questions.length - incorrectAnswersAmount) / questions.length) * 100
    return accurance === 0 ? '100%' : accurance.toFixed(1) + '%'
  }

  function getCoins() {
    if (!nextStar) return 0

    let maxCoins = nextStar.isUnlocked ? 5 : 10
    for (let i = 0; i < incorrectAnswersAmount; i++) {
      maxCoins -= nextStar.isUnlocked ? 1 : 2
    }
    return maxCoins
  }

  function getXp() {
    if (!nextStar) return 0

    let maxXp = nextStar.isUnlocked ? 10 : 20
    for (let i = 0; i < incorrectAnswersAmount; i++) {
      maxXp -= nextStar.isUnlocked ? 2 : 5
    }

    return maxXp
  }

  useEffect(() => {
    setTimeout(() => dispatch({ type: 'incrementSecondsAmount' }), 1000)
  }, [secondsAmount])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (star) {
      dispatch({ type: 'setTexts', payload: star.texts })
      dispatch({ type: 'setQuestions', payload: star.questions })
      timer = setTimeout(() => setIsTransitionVisible(false), 1000)
    }

    return () => {
      dispatch({ type: 'resetState' })
      clearTimeout(timer)
    }
  }, [star])

  useEffect(() => {
    if (currentStage === 'end') {
      setXp(getXp())
      setCoins(getCoins())
      setAccurance(getAccurance())
      setTime(formatSecondsToTime(secondsAmount))
    }
  }, [currentStage])

  return (
    <>
      <TransitionPageAnimation isVisible={isTransitionVisible} />
      <main ref={scrollRef} className="relative overflow-x-hidden">
        {currentStage !== 'end' && (
          <Header onLeaveLesson={() => modalRef.current?.open()} />
        )}

        {star && nextStar && (
          <>
            {currentStage === 'theory' && (
              <Theory title={star.name} number={star.number} />
            )}
            {currentStage === 'quiz' && <Quiz leaveLesson={leaveLesson} />}
            {currentStage === 'end' && (
              <End
                coins={coins}
                xp={xp}
                time={time}
                accurance={accurance}
                userDataUpdater={updateUserData}
                onExit={leaveLesson}
              />
            )}
          </>
        )}
      </main>

      <Modal
        ref={modalRef}
        type="crying"
        title="Deseja mesmo sair da sua lição?"
        canPlaySong={false}
        body={null}
        footer={
          <div className="flex items-center justify-center mt-3 gap-2">
            <Button
              className="bg-green-400 text-green-900 w-32"
              onClick={() => modalRef.current?.close()}
              autoFocus
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-700 text-gray-100 w-32"
              onClick={leaveLesson}
            >
              Sair
            </Button>
          </div>
        }
      />
    </>
  )
}
