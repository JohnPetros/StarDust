'use client'
import '../libs/dayjs'

import { ReactNode } from 'react'
import { Provider as ToastProvider } from '@radix-ui/react-toast'
import { TooltipProvider } from '@radix-ui/react-tooltip'

import { AchivementsProvider } from '@/contexts/AchievementsContext'
import { ChallengesListProvider } from '@/contexts/ChallengesListContext'
import { EditorProvider } from '@/contexts/EditorContext'
import { LessonProvider } from '@/contexts/LessonContext'

interface ClientProps {
  children: ReactNode
}

export function Client({ children }: ClientProps) {
  return (
    <TooltipProvider>
      <ToastProvider swipeDirection="right">
        <AchivementsProvider>
          <EditorProvider>
            <LessonProvider>
              <ChallengesListProvider>{children}</ChallengesListProvider>
            </LessonProvider>
          </EditorProvider>
        </AchivementsProvider>
      </ToastProvider>
    </TooltipProvider>
  )
}
