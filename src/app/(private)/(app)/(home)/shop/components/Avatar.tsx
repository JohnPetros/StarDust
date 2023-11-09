'use client'
import { useEffect, useRef, useState } from 'react'
import { LockSimple } from '@phosphor-icons/react'
import Image from 'next/image'
import { useSWRConfig } from 'swr'
import { twMerge } from 'tailwind-merge'

import { ShopButton } from './ShopButton'

import { Avatar } from '@/@types/avatar'
import { AlertRef } from '@/app/components/Alert'
import { useAuth } from '@/contexts/AuthContext'
import { getImage, playSound } from '@/utils/helpers'

interface AvatarProps {
  data: Avatar
  addUserAcquiredAvatar: (AvatarId: string) => void
}

export function Avatar({
  data: { id, name, price, image, isAcquired },
  addUserAcquiredAvatar,
}: AvatarProps) {
  const { user, updateUser } = useAuth()

  const { mutate } = useSWRConfig()

  const [isSelected, setIsSelected] = useState(false)
  const avatarImage = getImage('avatars', image)
  const isBuyable = user ? user?.coins >= price : false

  const denyingAlertRef = useRef<AlertRef>(null)
  const earningAlertRef = useRef<AlertRef>(null)

  async function buyAvatar() {
    if (!isBuyable || !user) {
      denyingAlertRef.current?.open()

      return
    }

    try {
      await Promise.all([
        updateUser({
          coins: user.coins - price,
        }),
        addUserAcquiredAvatar(id),
        selectAvatar(),
      ])

      earningAlertRef.current?.open()
    } catch (error) {
      console.error(error)
    }
  }

  async function selectAvatar() {
    try {
      await updateUser({ avatar_id: id })
      playSound('switch.wav')
      mutate('/avatar?id=' + id, { id, name, image })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleShopButton() {
    if (isAcquired) {
      await selectAvatar()
      return
    }

    buyAvatar()
  }

  useEffect(() => {
    setIsSelected(id === user?.avatar_id)
  }, [user?.avatar_id])

  return (
    <div
      className={twMerge(
        'grid grid-cols-[1fr_1.4fr] overflow-hidden rounded-md border-2',
        isSelected ? 'border-yellow-300' : 'border-transparent',
        !isAcquired && !isBuyable ? 'brightness-75' : 'brightness-90'
      )}
    >
      <div className="flex flex-col justify-between bg-gray-800 p-6">
        <div className="flex flex-col gap-2">
          {!isAcquired && price > 0 && (
            <div className=" z-30 flex items-center gap-2">
              <Image src="/icons/coin.svg" width={24} height={24} alt="" />
              <strong className="text-lg font-semibold text-gray-100">
                {price}
              </strong>
            </div>
          )}
          <strong className="text-gray-100">{name}</strong>
        </div>

        <ShopButton
          isAcquired={isAcquired}
          isBuyable={isBuyable}
          isSelected={isSelected}
          shopHandler={handleShopButton}
          product={{ image, name }}
        />
      </div>

      <div className="relative h-64">
        {!isAcquired && (
          <div className="absolute right-3 top-3 z-30">
            <LockSimple className="text-xl text-gray-800" weight="bold" />
          </div>
        )}

        <Image
          src={avatarImage}
          fill
          alt={name}
          className="skeleton object-cover"
          onLoadingComplete={(image) => image.classList.remove('skeleton')}
        />
      </div>
    </div>
  )
}
