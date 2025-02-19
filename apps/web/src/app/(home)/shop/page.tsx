import { headers } from 'next/headers'

import type { AvatarDto, RocketDto } from '@stardust/core/shop/dtos'

import { ROUTES } from '@/constants'
import { NextApiClient } from '@/api/next/NextApiClient'
import { ShopPage } from '@/ui/shop/widgets/pages/Shop'

type ShopItems = {
  rockets: {
    items: RocketDto[]
    count: number
  }
  avatars: {
    items: AvatarDto[]
    count: number
  }
}

export default async function Shop() {
  const apiClient = NextApiClient({ isCacheEnable: true })
  const response = await apiClient.get<ShopItems>(ROUTES.api.shop.items)
  if (response.isFailure) response.throwError()

  return <ShopPage rockets={response.body.rockets} avatars={response.body.avatars} />
}
