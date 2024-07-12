'use client'

import { useSiderbarContext } from '@/modules/app/contexts/SidebarContext'
import { useAuthContext } from '@/modules/global/contexts/AuthContext'
import { Button } from '@/modules/global/components/shared/Button'
import { UserAvatar } from '@/modules/global/components/shared/UserAvatar'
import { Icon } from '@/modules/global/components/shared/Icon'
import { AnimatedBar } from './AnimatedBar'
import { SignOutAlertDialog } from '@/modules/global/components/shared/SignOutAlertDialog'

export function Sidebar() {
  const { user } = useAuthContext()
  const { isOpen, toggle } = useSiderbarContext()

  if (user)
    return (
      <AnimatedBar isOpen={isOpen}>
        <div className='relative'>
          <button type='button' className='absolute right-2 p-2' onClick={toggle}>
            <Icon name='close' className='h-8 w-8 text-gray-500' />
          </button>

          {user && (
            <div className='flex flex-col items-center justify-center gap-3 text-gray-100'>
              <UserAvatar avatarId={user.avatar.id} size={96} />
              <strong>{user.name.value}</strong>
              <small className='text-sm'>{user.email.value}</small>
              <SignOutAlertDialog>
                <Button className='mx-aut mt-3 w-48 bg-green-400 px-3 py-2 text-green-900'>
                  Sair
                </Button>
              </SignOutAlertDialog>
            </div>
          )}
        </div>
        <div className='custom-scrollbar mt-3 h-full overflow-y-auto p-6'>
          <div>{/* <AchievementsList /> */}</div>
        </div>
      </AnimatedBar>
    )
}
