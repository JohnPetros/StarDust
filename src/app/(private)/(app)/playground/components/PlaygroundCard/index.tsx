'use client'

import { Pencil, ShareNetwork, Terminal, Trash } from '@phosphor-icons/react'
import Link from 'next/link'

import { SharePlaygroundDialog } from '../SharePlaygroundDialog'

import { usePlaygroundCard } from './usePlaygroundCard'

import { AlertDialog } from '@/global/components/AlertDialog'
import { Button } from '@/global/components/Button'
import { Prompt } from '@/global/components/Prompt'
import { Separator } from '@/global/components/Separator'
import { Toolbar } from '@/global/components/Toolbar'
import { ToolbarButton } from '@/global/components/Toolbar/ToolbarButton'

type PlaygroundCardProps = {
  id: string
  title: string
  onDelete: (deletedPlaygroundId: string) => void
}

export function PlaygroundCard({
  id,
  title: initialTitle,
  onDelete,
}: PlaygroundCardProps) {
  const {
    title,
    playgroundUrl,
    promptRef,
    handleDeletePlayground,
    handleEditPlaygroundTitle,
  } = usePlaygroundCard(id, initialTitle, onDelete)

  return (
    <>
      <div className="flex min-w-[16rem] cursor-pointer flex-col gap-3 rounded-md bg-green-900 p-4 shadow-md">
        <Link href={playgroundUrl} className="flex w-full items-center gap-2">
          <Terminal className="text-lg text-green-500" weight="bold" />
          <strong className="flex items-center gap-3 text-gray-100">
            {title}
          </strong>
        </Link>
        <Separator className="bg-green-700" isColumn={false} />
        <Toolbar className="justify-end">
          <AlertDialog
            type="crying"
            title="Você está preste a deletar um filho seu 😢!"
            body={
              <p className="text-center text-gray-100">
                Você tem certeza que deseja deletar esse código da sua coleção?
              </p>
            }
            action={
              <Button
                onClick={handleDeletePlayground}
                className="bg-red-700 text-gray-100"
              >
                Sim, eu tenho certeza
              </Button>
            }
            cancel={<Button>Não, eu mudei de ideia</Button>}
            shouldPlayAudio={false}
          >
            <ToolbarButton icon={Trash}>Deletar código</ToolbarButton>
          </AlertDialog>
          <Prompt
            ref={promptRef}
            title="Digite o novo título"
            onConfirm={handleEditPlaygroundTitle}
          >
            <ToolbarButton icon={Pencil}>Editar código</ToolbarButton>
          </Prompt>

          <SharePlaygroundDialog playgroundId={id}>
            <ToolbarButton icon={ShareNetwork}>
              Compartilhar código
            </ToolbarButton>
          </SharePlaygroundDialog>
        </Toolbar>
      </div>
    </>
  )
}
