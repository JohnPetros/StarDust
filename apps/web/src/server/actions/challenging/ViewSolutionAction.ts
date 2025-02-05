import { ROUTES } from '@/constants'
import type { SolutionDto } from '@stardust/core/challenging/dtos'
import { Challenge } from '@stardust/core/challenging/entities'
import { ViewSolutionUseCase } from '@stardust/core/challenging/use-cases'
import { User } from '@stardust/core/global/entities'
import type {
  IAction,
  IActionServer,
  IChallengingService,
} from '@stardust/core/interfaces'

type Request = {
  challengeSlug: string
  solutionSlug: string
}

export const ViewSolutionAction = (
  service: IChallengingService,
): IAction<Request, SolutionDto> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { solutionSlug, challengeSlug } = actionServer.getRequest()
      const user = User.create(await actionServer.getUser())
      const response = await service.fetchChallengeBySlug(challengeSlug)
      if (response.isFailure) response.throwError()
      const challenge = Challenge.create(response.body)

      if (user.hasCompletedChallenge(challenge.id).isFalse) {
        actionServer.redirect(
          ROUTES.challenging.challenges.challenge(challenge.slug.value),
        )
      }

      const useCase = new ViewSolutionUseCase(service)

      return await useCase.do({
        solutionSlug,
      })
    },
  }
}
