import { NextRequest, NextResponse } from 'next/server'

import { compileMdx } from './compileMdx'

export async function POST(request: NextRequest) {
  const { components } = (await request.json()) as { components: string[] }

  if (!components)
    return NextResponse.json(
      { message: 'Components not provided' },
      { status: 400 }
    )

  const compiledMdxComponents: string[] = []

  for (const component of components) {
    const mdx = await compileMdx(component)

    console.log({ mdx })

    compiledMdxComponents.push(JSON.stringify(mdx))
  }

  console.log({ compiledMdxComponents })

  return NextResponse.json({ compiledMdxComponents })
}
