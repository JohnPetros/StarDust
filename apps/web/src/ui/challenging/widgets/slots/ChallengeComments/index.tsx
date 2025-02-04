'use client'

import { CommentsList } from '@/ui/global/widgets/components/CommentsList'
import { useChallengeCommentsSlot } from './useChallengeCommentsSlot'
import { ChallengeContentNav } from '../../components/ChallengeContentNav'

type ChallengeCommentsSlotProps = {
  challengeId: string
}

export function ChallengeCommentsSlot({ challengeId }: ChallengeCommentsSlotProps) {
  const { handleCommentListFetch, handleCommentSave } =
    useChallengeCommentsSlot(challengeId)

  return (
    <>
      <ChallengeContentNav contents={['description', 'solutions']} />
      <CommentsList
        inputPlaceholder='Deixe um comentário sobre esse desafio...'
        emptyListMessage='Esse desafio ainda não tem comentários. Seja a primeira pessoa a comentar 😉.'
        onFetchComments={handleCommentListFetch}
        onSaveComment={handleCommentSave}
      />
    </>
  )
}
