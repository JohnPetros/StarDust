'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { useLesson } from '@/hooks/useLesson'
import { useStar } from '@/hooks/useStar'

import { TransitionPageAnimation } from '../../components/TransitionPageAnimation'
import { Header } from '../components/Header'
import { Theory } from '../components/Theory'
import { Quiz } from '../components/Quiz'
import { End } from '../components/End'

import type { Star } from '@/types/star'

export default function Lesson() {
  const { starId } = useParams()
  if (!starId) return null

  const { star, getNextStar } = useStar(String(starId))
  const { state, dispatch } = useLesson()
  const [isTransitionVisible, setIsTransitionVisible] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (star) {      
      dispatch({ type: 'setTexts', payload: star.texts })
      dispatch({ type: 'setQuestions', payload: star.questions })
      setTimeout(() => setIsTransitionVisible(false), 1000)
    }
  }, [star])

  return (
    <div>
      <TransitionPageAnimation isVisible={isTransitionVisible} />
      <main ref={scrollRef} className="relative">
        <Header />
        {star && (
          <>
            {state.currentStage === 'theory' && (
              <Theory title={star.name} number={star.number} />
            )}
            {state.currentStage === 'quiz' && <Quiz />}
            {state.currentStage === 'end' && <End />}
          </>
        )}
      </main>
    </div>
  )
}
