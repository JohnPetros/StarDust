import type { StarDTO } from '@/@core/dtos'
import type { ServiceResponse } from '@/@core/responses'

export interface IStarsService {
  fetchStarBySlug(starSlug: string): Promise<ServiceResponse<StarDTO>>
  fetchStarById(starId: string): Promise<ServiceResponse<StarDTO>>
  // fetchNextStar(currentStar: Star, userId: string): Promise<ServiceResponse<Star>>
  // fetchNextStarFromNextPlanet(
  //   currentPlanetId: string,
  //   userId: string
  // ): Promise<ServiceResponse<Star>>
  // checkStarUnlocking(starId: string, userId: string): Promise<ServiceResponse<boolean>>
}
