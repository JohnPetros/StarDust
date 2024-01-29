import { Animation } from './Animation'
import { Content } from './Content'
import { Picture } from './Picture'
import { Title } from './Title'

import { slugify } from '@/utils/helpers'

type TextProps = {
  title: string
  picture: string
  children: string[]
  hasAnimation?: boolean
}

export function Text({
  title,
  picture,
  children,
  hasAnimation = false,
}: TextProps) {
  console.log({ title })

  return (
    <Animation hasAnimation={hasAnimation}>
      <div className="not-prose flex w-full flex-col">
        {title && (
          <div className="mb-4 h-max w-full">
            <Title>{title}</Title>
          </div>
        )}
        <div className="flex w-full items-center">
          {picture && <Picture url={picture} />}
          <Content type="default" hasAnimation={hasAnimation}>
            {children}
          </Content>
        </div>
      </div>
    </Animation>
  )
}
