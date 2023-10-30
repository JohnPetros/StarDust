'use client'

import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

import { CheckboxQuestion } from './CheckboxQuestion'
import { DragAndDropListQuestion } from './DragAndDropListQuestion'
import { DragAndDropQuestion } from './DragAndDropQuestion'
import { OpenQuestion } from './OpenQuestion'
import { QuestionContainer } from './QuestionContainer'
import { SelectionQuestion } from './SelectionQuestion'
import { VerificationButton } from './VerificationButton'

import { Modal, ModalRef } from '@/app/components/Alert'
import { Button } from '@/app/components/Button'
import { useLesson } from '@/hooks/useLesson'

interface QuizProps {
  leaveLesson: () => void
}

export function Quiz({ leaveLesson }: QuizProps) {
  const {
    state: {
      currentQuestionIndex,
      questions,
      answerHandler,
      isAnswerVerified,
      isAnswerCorrect,
      isAnswered,
      livesAmount,
    },
  } = useLesson()

  const currentQuestion = useMemo(() => {
    return questions.length ? questions[currentQuestionIndex] : null
  }, [questions, currentQuestionIndex])

  const modalRef = useRef<ModalRef>(null)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [currentQuestionIndex])

  useEffect(() => {
    if (livesAmount === 0) modalRef.current?.open()
  }, [livesAmount])

  if (currentQuestion) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <AnimatePresence>
          {currentQuestion.content.type === 'selection' && (
            <QuestionContainer id={currentQuestion.order}>
              <SelectionQuestion data={currentQuestion.content} />
            </QuestionContainer>
          )}

          {currentQuestion.content.type === 'open' && (
            <QuestionContainer id={currentQuestion.order}>
              <OpenQuestion data={currentQuestion.content} />
            </QuestionContainer>
          )}

          {currentQuestion.content.type === 'checkbox' && (
            <QuestionContainer id={currentQuestion.order}>
              <CheckboxQuestion data={currentQuestion.content} />
            </QuestionContainer>
          )}

          {currentQuestion.content.type === 'drag-and-drop' && (
            <QuestionContainer id={currentQuestion.order}>
              <DragAndDropQuestion data={currentQuestion.content} />
            </QuestionContainer>
          )}

          {currentQuestion.content.type === 'drag-and-drop-list' && (
            <QuestionContainer id={currentQuestion.order}>
              <DragAndDropListQuestion data={currentQuestion.content} />
            </QuestionContainer>
          )}
        </AnimatePresence>

        <Modal
          ref={modalRef}
          type="crying"
          title="Puxa, parece que você não tem mais vidas!"
          body={
            <p className="mt-3 text-center font-medium text-green-400">
              Mais sorte da próxima vez 😢
            </p>
          }
          footer={
            <div className="mt-3 flex items-center justify-center gap-2">
              <Button
                className="w-32 bg-red-700 text-gray-100"
                onClick={leaveLesson}
              >
                Sair
              </Button>
            </div>
          }
        />

        <VerificationButton
          answerHandler={answerHandler}
          isAnswerCorrect={isAnswerCorrect}
          isAnswerVerified={isAnswerVerified}
          isAnswered={isAnswered}
        />
      </div>
    )
  }
}
