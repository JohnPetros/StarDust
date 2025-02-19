'use client'

import { twMerge } from 'tailwind-merge'

import { Icon } from '../../../Icon'
import { useUpvoteComment } from './useUpvoteComment'

export type UpvoteButtonProps = {
  commentId: string
  isCommentUpvoted: boolean
  initialUpvotesCount: number
}

export function UpvoteButton({
  initialUpvotesCount,
  commentId,
  isCommentUpvoted,
}: UpvoteButtonProps) {
  const { isUpvoted, upvotesCount, handleButtonClick } = useUpvoteComment(
    initialUpvotesCount,
    isCommentUpvoted,
  )

  return (
    <button
      type='button'
      onClick={() => handleButtonClick(commentId)}
      className={twMerge(
        'flex items-center gap-1 text-sm text-gray-300',
        isUpvoted ? 'text-green-700' : 'text-gray-300',
      )}
    >
      <Icon
        name='simple-arrow-up'
        size={16}
        className={isUpvoted ? 'text-green-700' : 'text-gray-300'}
      />
      +{upvotesCount}
    </button>
  )
}
