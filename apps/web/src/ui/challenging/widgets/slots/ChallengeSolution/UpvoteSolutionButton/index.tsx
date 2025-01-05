'use client'

import { Icon } from '@/ui/global/widgets/components/Icon'
import { useUpvoteSolutionButton } from './useUpvoteSolutionButton'
import { useAuthContext } from '@/ui/auth/contexts/AuthContext'

type VoteSolutionButtonProps = {
  solutionId: string
  initialUpvotesCount: number
}

export function UpvoteSolutionButton({
  solutionId,
  initialUpvotesCount,
}: VoteSolutionButtonProps) {
  const { user } = useAuthContext()
  const { isUpvoted, upvotesCount, handleButtonClick } = useUpvoteSolutionButton(
    initialUpvotesCount,
    user?.hasUpvotedSolution(solutionId).isTrue ?? false,
  )
  const textStyle = isUpvoted ? 'text-green-500' : 'text-gray-400'

  return (
    <div className='flex items-center justify-center gap-1'>
      <button
        type='button'
        onClick={() => handleButtonClick(solutionId)}
        className={
          'flex h-8 items-center justify-center gap-1 rounded-lg bg-green-900/90 px-2'
        }
      >
        <Icon name='upvote' weight='bold' size={16} className={textStyle} />
        <span className={textStyle}>{upvotesCount}</span>
      </button>
    </div>
  )
}
