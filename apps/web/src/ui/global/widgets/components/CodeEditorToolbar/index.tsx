'use client'

import { type ReactNode, type RefObject, useRef } from 'react'
import { ArrowClockwise, Code, Command, Gear } from '@phosphor-icons/react'
import * as Toolbar from '@radix-ui/react-toolbar'

import type { EditorRef } from '../Editor/types'
import { Button } from '../Button'
import { AlertDialog } from '../AlertDialog'
import { ROUTES } from '@/constants'
import { Tooltip } from '../Tooltip'
import { DocsDialog } from './DocsDialog'
import { HotkeysDialog } from './HotkeysDialog'
import { CodeEditorSettingsDialog } from './CodeEditorSettingsDialog'
import { useRouter } from '@/ui/global/hooks'
import { useCodeEditorToolbar } from './useCodeEditorToolbar'

type CodeEditorToolbarProps = {
  children: ReactNode
  codeEditorRef: RefObject<EditorRef>
  previousUserCode: RefObject<string>
  onRunCode: () => void
}

export function CodeEditorToolbar({
  children,
  codeEditorRef,
  previousUserCode,
  onRunCode,
}: CodeEditorToolbarProps) {
  const runCodeButtonRef = useRef<HTMLButtonElement>(null)
  const docsDialogButtonRef = useRef<HTMLButtonElement>(null)
  const { currentRoute } = useRouter()
  const { handleKeyDown, resetCode } = useCodeEditorToolbar({
    previousUserCode,
    codeEditorRef,
    runCodeButtonRef,
    docsDialogButtonRef,
  })

  const toolbarStyles = 'grid place-content-center'
  const iconStyles = 'text-xl text-green-500'

  return (
    <div onKeyUp={handleKeyDown}>
      <div className='flex items-center justify-between rounded-t-md bg-gray-700 px-3 py-2'>
        <div className='flex items-center gap-4'>
          <Button
            ref={runCodeButtonRef}
            className='h-6 w-max px-3 text-xs'
            onClick={onRunCode}
          >
            Executar
          </Button>
        </div>

        <Toolbar.Root className='flex items-center gap-3'>
          {currentRoute.includes(ROUTES.challenging.challenges) && (
            <AlertDialog
              type='asking'
              title='Tem certeza que deseja voltar para o código inicial?'
              body={null}
              action={
                <Button
                  tabIndex={0}
                  autoFocus
                  onClick={resetCode}
                  className='bg-red-700 text-gray-100'
                >
                  Voltar código
                </Button>
              }
              cancel={<Button className='bg-gray-500 text-gray-100'>Cancelar</Button>}
              shouldPlayAudio={false}
            >
              <Toolbar.Button className={toolbarStyles}>
                <Tooltip content='Voltar para o código inicial' direction='bottom'>
                  <ArrowClockwise className={iconStyles} weight='bold' />
                </Tooltip>
              </Toolbar.Button>
            </AlertDialog>
          )}

          <DocsDialog>
            <Toolbar.Button ref={docsDialogButtonRef} className={toolbarStyles}>
              <Tooltip content='Documentação' direction='bottom'>
                <Code className={iconStyles} weight='bold' />
              </Tooltip>
            </Toolbar.Button>
          </DocsDialog>

          <HotkeysDialog>
            <Toolbar.Button className={toolbarStyles}>
              <Tooltip content='Comandos' direction='bottom'>
                <Command className={iconStyles} weight='bold' />
              </Tooltip>
            </Toolbar.Button>
          </HotkeysDialog>

          <CodeEditorSettingsDialog>
            <Toolbar.Button className={toolbarStyles}>
              <Tooltip content='Configurações' direction='bottom'>
                <Gear className={iconStyles} weight='bold' />
              </Tooltip>
            </Toolbar.Button>
          </CodeEditorSettingsDialog>
        </Toolbar.Root>
      </div>
      {children}
    </div>
  )
}
