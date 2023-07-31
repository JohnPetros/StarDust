'use client'
import { useState } from 'react'
import { useChallengesList } from '@/hooks/useChallengesList'
import { CheckCircle, Circle } from '@phosphor-icons/react'
import { Select } from '../Select'

export function Filters() {
  const { state, dispatch } = useChallengesList()
  const [status, setStatus] = useState('')
  const [difficulty, setDifficulty] = useState('')

  function handleStatusChange(newStatus: string) {
    dispatch({ type: 'setStatus', payload: newStatus })
  }

  function handleDifficultyChange(newDifficulty: string) {
    dispatch({ type: 'setDifficulty', payload: newDifficulty })
  }

  return (
    <div className="flex items-center gap-6">
      <Select.Container onValueChange={handleStatusChange}>
        <Select.Trigger value="Status" />
        <Select.Content>
          <Select.Item
            value="completed"
            icon={
              <CheckCircle className="text-green-500 text-lg" weight="bold" />
            }
            text="Resolvido"
          />
          <Select.Separator />
          <Select.Item
            value="not-completed"
            icon={<Circle className="text-gray-400 text-lg" weight="bold" />}
            text="Não Resolvido"
          />
        </Select.Content>
      </Select.Container>

      <Select.Container onValueChange={handleDifficultyChange}>
        <Select.Trigger value="Dificuldade" />
        <Select.Content>
          <Select.Item value="easy" text="Fácil" textStye="text-green-500" />
          <Select.Separator />
          <Select.Item value="medium" text="Médio" textStye="text-yellow-400" />
          <Select.Separator />
          <Select.Item value="hard" text="Difícil" textStye="text-red-700" />
        </Select.Content>
      </Select.Container>
    </div>
  )
}
