import { Animation } from './Animation'
import { Content } from './Content'

import { UserAvatar } from '@/app/components/UserAvatar'
import { useAuth } from '@/contexts/AuthContext'

type UserProps = {
  title: string
  picture: string
  children: string[]
  hasAnimation?: boolean
}

export function User({ children, hasAnimation = true }: UserProps) {
  const { user } = useAuth()

  return (
    <Animation hasAnimation={hasAnimation}>
      <div className="not-prose flex w-full flex-col">
        <div className="flex w-full items-center">
          <Content type="user" hasAnimation={hasAnimation}>
            {children}
          </Content>
          {user && <UserAvatar avatarId={user?.avatar_id} size={80} />}
        </div>
      </div>
    </Animation>
  )
}
