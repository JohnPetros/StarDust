import Link from 'next/link'

import { Solution } from '@stardust/core/challenging/entities'

import { ROUTES } from '@/constants'
import { challengingActions } from '@/server/next-safe-action'
import { UserAvatar } from '@/ui/global/widgets/components/UserAvatar'
import { Mdx } from '@/ui/global/widgets/components/Mdx'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { SolutionInfo } from '../../components/SolutionInfo'
import { SolutionCommentsList } from './SolutionCommentsList'
import { UpvoteSolutionButton } from './UpvoteSolutionButton'
import { UserSolutionButtons } from './UserSolutionButtons'

type ChallengeSolutionSlotProps = {
  challengeSlug: string
  solutionSlug: string
}

export async function ChallengeSolutionSlot({
  challengeSlug,
  solutionSlug,
}: ChallengeSolutionSlotProps) {
  const response = await challengingActions.viewSolution({ solutionSlug })
  if (!response?.data) return
  const solution = Solution.create(response?.data)

  return (
    <div className='px-6 py-3'>
      <header>
        <Link
          href={ROUTES.challenging.challenges.challengeSolutions.list(challengeSlug)}
          className='flex items-center text-sm text-green-400'
        >
          <Icon name='simple-arrow-left' size={14} className='mr-1' />
          Ver todas as soluções
        </Link>
        <h1 className='text-lg text-gray-50 mt-3'>{solution.title.value}</h1>
        <div className='flex items-center gap-3 mt-3 w-full'>
          <UserAvatar
            avatarName={solution.author.avatar.name.value}
            avatarImage={solution.author.avatar.image.value}
            size={48}
          />
          <div className='w-full'>
            <span className='text-gray-500 text-sm'>{solution.author.name.value}</span>

            <div className='flex items-center gap-3 mt-1'>
              <UpvoteSolutionButton
                solutionId={solution.id}
                initialUpvotesCount={solution.upvotesCount.value}
              />
              <SolutionInfo
                commentsCount={solution.commentsCount.value}
                viewsCount={solution.upvotesCount.value}
                createdAt={solution.createdAt}
              />
            </div>
          </div>
        </div>
        <div className='pl-12 mt-3'>
          <UserSolutionButtons
            solutionId={solution.id}
            authorId={solution.authorId}
            solutionSlug={solution.slug.value}
            challengeSlug={challengeSlug}
          />
        </div>
      </header>

      <div className='mt-12'>
        <Mdx>{solution.content.value.replaceAll('\n', '\n\n')}</Mdx>
      </div>

      <div className='mt-24'>
        <SolutionCommentsList solutionId={solution.id} />
      </div>
    </div>
  )
}
