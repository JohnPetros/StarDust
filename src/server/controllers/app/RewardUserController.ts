import { HTTP_STATUS_CODE } from '@/@core/constants'
import type { RewardingPayloadOrigin } from '@/@core/domain/types'
import type { RewardingPayloadDTO } from '@/@core/dtos'
import type { IController, IHttp } from '@/@core/interfaces/handlers'
import type {
  IAuthService,
  IUsersService,
  ISpaceService,
} from '@/@core/interfaces/services'
import { RewardUserUseCase } from '@/@core/use-cases/users'
import { ROUTES } from '@/modules/global/constants'

export const RewardUserController = (
  authService: IAuthService,
  usersService: IUsersService,
  spaceService: ISpaceService,
): IController => {
  function getNextRoute(rewardPayloadOrigin: RewardingPayloadOrigin) {
    switch (rewardPayloadOrigin) {
      case 'star':
        return ROUTES.private.app.home
      default:
        return ROUTES.private.app.home
    }
  }

  return {
    async handle(http: IHttp) {
      const rewardingPayloadDTO = http.getRequest<RewardingPayloadDTO>()

      const userIdResponse = await authService.fetchUserId()
      if (userIdResponse.isFailure) {
        return http.send(userIdResponse.errorMessage, HTTP_STATUS_CODE.badRequest)
      }

      const userResponse = await usersService.fetchUserById(userIdResponse.data)
      if (userResponse.isFailure) {
        return http.send(userResponse.errorMessage, HTTP_STATUS_CODE.serverError)
      }

      const useCase = new RewardUserUseCase(usersService, spaceService)

      try {
        const response = await useCase.do({
          userDTO: userResponse.data,
          rewardingPayloadDTO,
        })

        const nextRoute = getNextRoute(response.origin)

        return http.send(
          {
            userDTO: response.user.dto,
            accuracyPercentage: response.accuracyPercentage,
            time: response.user,
            nextRoute,
          },
          HTTP_STATUS_CODE.ok,
        )
      } catch (error) {
        return http.send(error.message, HTTP_STATUS_CODE.badRequest)
      }
    },
  }
}
