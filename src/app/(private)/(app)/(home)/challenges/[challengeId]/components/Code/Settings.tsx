import { ReactNode } from 'react'
import { X } from '@phosphor-icons/react'
import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog'

import { Dialog, DialogContent, DialogTitle } from '@/app/components/Dialog'
import { RangeInput } from '@/app/components/RadioInput'
import { useEditor } from '@/hooks/useEditor'

interface SettingsProps {
  children: ReactNode
}

export function Settings({ children }: SettingsProps) {
  const { state, dispatch } = useEditor()

  function handleFontSizeRangeValueChange([value]: number[]) {
    dispatch({ type: 'setFontSize', payload: value })
  }

  function handleTabSizeRangeValueChange([value]: number[]) {
    dispatch({ type: 'setTabSize', payload: value })
  }

  return (
    <Dialog>
      <DialogContent>
        <header className="flex justify-between border-b p-3">
          <DialogTitle className="mx-auto flex w-full items-center justify-between text-xl font-semibold text-white">
            Configurações
            <DialogClose className="p-2">
              <X className="text-xl" weight="bold" />
            </DialogClose>
          </DialogTitle>
        </header>
        <dl className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <dt className="text-gray-100">Tamanho da fonte (px):</dt>
            <dd>
              <RangeInput
                value={state.fontSize}
                min={12}
                max={20}
                step={2}
                onValueChange={handleFontSizeRangeValueChange}
              />
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-gray-100">Tamanho do tab (px):</dt>
            <dd>
              <RangeInput
                value={state.tabSize}
                min={2}
                max={4}
                step={1}
                onValueChange={handleTabSizeRangeValueChange}
              />
            </dd>
          </div>
        </dl>
      </DialogContent>

      <DialogTrigger asChild>{children}</DialogTrigger>
    </Dialog>
  )
}
