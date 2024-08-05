'use client'

import type { UserDTO } from '@/@core/dtos'
import { Animation } from '@/ui/global/components/shared/Animation'
import { StreakIcon } from '@/ui/global/components/shared/StreakIcon'
import { Button } from '@/ui/global/components/shared/Button'
import { AlertDialog } from '@/ui/global/components/shared/AlertDialog'
import { Benchmark } from '@/ui/global/components/shared/Button/Benchmark'
import { AnimatedApolloMessage } from './AnimatedApolloMessage'
import { AnimatedEndMessage } from './AnimatedEndMessage'
import { AnimatedButton } from './AnimatedButton'
import { useRewardingPage } from './useRewardingPage'
import { User } from '@/@core/domain/entities'
import { Streak } from './Streak'

export type RewardingPageProps = {
  newLevel: number
  newCoins: number
  newXp: number
  time: string
  accuracyPercentage: string
  nextRoute: string
}

export function RewardingPage({
  newCoins,
  newLevel,
  newXp,
  time,
  accuracyPercentage,
  nextRoute,
}: RewardingPageProps) {
  const {
    isEndMessageVisible,
    isFirstClick,
    isLoading,
    isStreakVisible,
    alertDialogRef,
    handleFirstButtonClick,
    handleSecondButtonClick,
  } = useRewardingPage(newLevel, nextRoute)

  return (
    <div className='mx-auto flex h-screen w-full max-w-lg flex-col items-center justify-center px-6'>
      <div className='my-auto flex flex-col items-center justify-center'>
        {!isStreakVisible && !isEndMessageVisible && (
          <>
            <h1 className='text-xl font-semibold text-gray-100'>Fase completada!</h1>
            <AnimatedApolloMessage>
              <Animation name='apollo-congratulating' size={280} hasLoop />
            </AnimatedApolloMessage>
            <dl className='mt-3 flex flex-col items-center justify-center'>
              <div className='mx-auto'>
                <Benchmark
                  title='Poeira estelar'
                  amount={newCoins}
                  color='yellow'
                  icon='coin.svg'
                  isLarge={true}
                  delay={1}
                />
              </div>

              <div className='mt-6 grid grid-cols-3 gap-3'>
                <Benchmark
                  title='Total de xp'
                  amount={newXp}
                  color='green'
                  icon='xp.svg'
                  isLarge={false}
                  delay={1.5}
                />

                <Benchmark
                  title='Tempo'
                  amount={time}
                  color='blue'
                  icon='clock.svg'
                  isLarge={false}
                  delay={2}
                />

                <Benchmark
                  title='Acertos'
                  amount={`${accuracyPercentage}%`}
                  color='red'
                  icon='percent.svg'
                  isLarge={false}
                  delay={2.5}
                />
              </div>
            </dl>
          </>
        )}

        {isStreakVisible && <Streak />}

        {isEndMessageVisible && (
          <AnimatedEndMessage>
            <span className='text-center text-2xl font-semibold text-white'>
              Parabéns, continue assim 😉!
            </span>
          </AnimatedEndMessage>
        )}
      </div>

      <AnimatedButton>
        <Button
          isLoading={isLoading}
          onClick={isFirstClick ? handleFirstButtonClick : handleSecondButtonClick}
          className='mb-16 w-80'
        >
          Continuar
        </Button>
      </AnimatedButton>

      <AlertDialog
        ref={alertDialogRef}
        type='earning'
        title={'Parabéns! Você alcançou um novo nível!'}
        body={
          <div className='mb-6 space-y-1 text-center text-gray-100'>
            <p>
              Você acaba de chegar no{' '}
              <span className='text-medium text-lg text-green-400'>
                Nível {newLevel} 😀
              </span>
              .
            </p>
            <p>Continue assim!</p>
          </div>
        }
        action={<Button>Show!</Button>}
      />
    </div>
  )
}
