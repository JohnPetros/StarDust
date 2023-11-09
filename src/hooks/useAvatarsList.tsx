'use client'

import { useMemo } from 'react'
import useSWR, { mutate } from 'swr'

import type { Avatar } from '@/@types/avatar'
import { FilterOptions } from '@/@types/filterOptions'
import { Order } from '@/@types/order'
import { useAuth } from '@/contexts/AuthContext'
import { useApi } from '@/services/api'
import { calculatePage } from '@/utils/helpers'

interface useRocketsListParams extends FilterOptions {
  priceOrder: Order
}

export function useAvatarsList({
  offset,
  limit,
  search,
  priceOrder,
}: useRocketsListParams) {
  const api = useApi()
  const { user } = useAuth()
  const page = calculatePage(offset, limit)

  async function getUserAcquiredAvatarsIds() {
    if (user?.id) {
      return await api.getUserAcquiredAvatarsIds(user.id)
    }
  }

  console.log(search)

  async function getAvatars() {
    return await api.getAvatars({
      search,
      offset,
      limit: offset + limit - 1,
      priceOrder,
    })
  }

  const { data } = useSWR(
    () => `/avatars?page=${page}&search=${search}&priceOrder=${priceOrder}`,
    getAvatars
  )

  const { data: userAcquiredAvatarsIds } = useSWR(
    user?.id ? '/users_acquired_avatars_ids' : null,
    getUserAcquiredAvatarsIds
  )

  function updateAvatars(updatedAvatar: Avatar) {
    return data?.avatars.map((avatar) =>
      avatar.id === updatedAvatar.id
        ? { ...updatedAvatar, isAcquired: true }
        : avatar
    )
  }

  async function addUserAcquiredAvatar(avatarId: string) {
    if (user?.id) {
      const error = await api.addUserAcquiredAvatar(avatarId, user.id)
      const updatedAvatar = data?.avatars.find(
        (avatar) => avatar.id === avatarId
      )
      const updatedAvatars = updatedAvatar ? updateAvatars(updatedAvatar) : null

      if (error) {
        throw Error(error)
      }

      if (updatedAvatar && userAcquiredAvatarsIds) {
        mutate('/avatars', updatedAvatars, false)

        mutate(
          '/users_acquired_avatars_ids',
          [...userAcquiredAvatarsIds, updatedAvatar.id],
          false
        )
      }
    }
  }

  function verifyAvatarAcquirement(
    avatar: Avatar,
    userAcquiredAvatarsIds: string[]
  ) {
    const isAcquired = userAcquiredAvatarsIds.some(
      (userAcquiredAvatarsId) => userAcquiredAvatarsId === avatar.id
    )

    return { ...avatar, isAcquired }
  }

  const verifiedAvatars = useMemo(() => {
    if (userAcquiredAvatarsIds?.length && data?.avatars.length) {
      return data?.avatars.map((avatar) =>
        verifyAvatarAcquirement(avatar, userAcquiredAvatarsIds)
      )
    }

    return []
  }, [data, userAcquiredAvatarsIds])

  return {
    avatars: verifiedAvatars,
    count: data?.count,
    addUserAcquiredAvatar,
  }
}
