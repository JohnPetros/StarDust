'use client'

import Markdown from 'markdown-to-jsx'

import { Alert } from './templates/Alert'
import { Code } from './templates/Code'
import { Image } from './templates/Image'
import { Link } from './templates/Link'
import { Quote } from './templates/Quote'
import { Strong } from './templates/Strong'
import { Text } from './templates/Text'
import { User } from './templates/User'
import { useMdx } from './useMdx'

type MdxProps = {
  children: string
}

export function Mdx({ children }: MdxProps) {
  const { formatCodeContent } = useMdx()

  const mdx = formatCodeContent(children)

  return (
    <div className='prose prose-invert mx-auto'>
      <Markdown
        options={{
          overrides: {
            Text: {
              component: Text,
            },
            Alert: {
              component: Alert,
            },
            Quote: {
              component: Quote,
            },
            Image: {
              component: Image,
            },
            User: {
              component: User,
            },
            Link: {
              component: Link,
            },
            Code: {
              component: Code,
            },
            code: {
              component: Code,
              props: {
                isRunnable: false,
              },
            },
            strong: {
              component: Strong,
            },
            em: {
              component: Strong,
            },
            a: {
              component: Link,
            },
          },
        }}
      >
        {mdx}
      </Markdown>
    </div>
  )
}
