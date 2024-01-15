import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Button } from '@/app/components/Button'
import { playSound } from '@/utils/helpers'

const buttonStyles = tv({
  base: 'w-64',
  variants: {
    color: {
      green: 'border-gray-100 text-gray-900',
      red: 'bg-red-700 text-gray-100',
    },
  },
})

const feedbackAnimations: Variants = {
  down: {
    height: 0,
  },
  up: {
    height: 80,
    transition: {
      type: 'spring',
      duration: 0.4,
    },
  },
}

interface VerificationButtonProps {
  answerHandler: () => void
  isAnswered: boolean
  isAnswerVerified: boolean
  isAnswerCorrect: boolean
  isChallenge?: boolean
}

export function VerificationButton({
  answerHandler,
  isAnswerCorrect,
  isAnswerVerified,
  isAnswered,
  isChallenge = false,
}: VerificationButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const buttonHasFocus = useRef(false)

  function getButtonTitle() {
    if (isAnswerVerified && !isAnswerCorrect) {
      return 'Tentar novamente'
    } else if (isAnswerVerified) {
      return 'Continuar'
    } else {
      return 'Verificar'
    }
  }

  function handleButtonClick() {
    answerHandler()
  }

  const handleGlobalKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Enter' && isAnswered && !buttonHasFocus.current) {
        answerHandler()
      }
    },
    [answerHandler, isAnswered]
  )

  useEffect(() => {
    if (isAnswerVerified) {
      playSound(isAnswerCorrect ? 'success.wav' : 'fail.wav')
    }
  }, [isAnswerCorrect, isAnswerVerified, handleGlobalKeyDown])

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [handleGlobalKeyDown])

  return (
    <div
      className={twMerge(
        'absolute bottom-0 flex w-full flex-col items-center justify-center gap-2 border-t px-6 py-3 ',
        isAnswerVerified && !isAnswerCorrect
          ? 'border-red-700 bg-green-900'
          : 'border-green-500 bg-green-900'
      )}
    >
      <div>
        <AnimatePresence>
          {isAnswerVerified && (
            <motion.div
              variants={feedbackAnimations}
              initial="down"
              animate="up"
              exit="down"
              className="flex h-20 flex-col items-center gap-1 overflow-hidden"
            >
              <Image
                src={`/icons/${
                  isAnswerVerified && !isAnswerCorrect
                    ? 'incorrect-answer.svg'
                    : 'correct-answer.svg'
                }`}
                width={48}
                height={48}
                priority
                alt=""
              />
              <strong
                className={twMerge(
                  'text-lg',
                  isAnswerVerified && !isAnswerCorrect
                    ? 'text-red-700'
                    : 'text-green-400'
                )}
              >
                {isAnswerCorrect ? 'Correto, parabéns!' : 'Oops, tente denovo!'}
              </strong>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button
        buttonRef={buttonRef}
        onClick={handleButtonClick}
        onFocus={() => (buttonHasFocus.current = true)}
        onBlur={() => (buttonHasFocus.current = false)}
        className={buttonStyles({
          color: isAnswerVerified && !isAnswerCorrect ? 'red' : 'green',
        })}
        disabled={!isAnswered}
      >
        {getButtonTitle()}
      </Button>
    </div>
  )
}
