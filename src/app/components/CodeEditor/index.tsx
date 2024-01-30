'use client'

import { ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import MonacoEditor from '@monaco-editor/react'

import { Loading } from '../Loading'

import { useCodeEditor } from './useCodeEditor'

import { useCodeEditorContext } from '@/contexts/CodeEditorContext'
import { useBreakpoint } from '@/hooks/useBreakpoint'

export type CursorPosition = {
  lineNumber: number
  columnNumber: number
}

export type SelectedLinesRange = {
  start: number
  end: number
}

export type CodeEditorRef = {
  getValue: () => string
  setValue: (value: string) => void
  reloadValue: () => void
  getCursorPosition: () => CursorPosition | null
  setCursorPosition: (cursorPositon: CursorPosition) => void
  getSelectedLinesRange: () => SelectedLinesRange | null
}

type CodeEditorProps = {
  value: string
  width: number | string
  height: number | string
  hasMinimap?: boolean
  isReadOnly?: boolean
  onChange?: (value: string) => void
}

export function CodeEditorComponent(
  {
    value,
    width,
    height,
    hasMinimap = false,
    isReadOnly = false,
    onChange = () => {},
  }: CodeEditorProps,
  ref: ForwardedRef<CodeEditorRef>
) {
  const { state } = useCodeEditorContext()
  const {
    getValue,
    setValue,
    reloadValue,
    getCursorPosition,
    setCursorPosition,
    getSelectedLinesRange,
    handleEditorDidMount,
  } = useCodeEditor(value)
  const { md: isMobile } = useBreakpoint()

  useImperativeHandle(
    ref,
    () => {
      return {
        getValue,
        setValue,
        reloadValue,
        getCursorPosition,
        setCursorPosition,
        getSelectedLinesRange,
      }
    },
    [
      getValue,
      setValue,
      reloadValue,
      getCursorPosition,
      setCursorPosition,
      getSelectedLinesRange,
    ]
  )

  return (
    <MonacoEditor
      width={width}
      height={height}
      language="delegua"
      theme="delegua-theme"
      options={{
        minimap: {
          enabled: hasMinimap,
        },
        tabSize: state.tabSize - (isMobile ? 2 : 0),
        fontSize: state.fontSize - (isMobile ? 2 : 0),
        fontFamily: 'Menlo',
        cursorStyle: 'line',
        wordWrap: 'on',
        autoIndent: 'full',
        readOnly: isReadOnly,
        domReadOnly: isReadOnly,
      }}
      loading={
        <div className="grid place-content-center">
          <Loading />
        </div>
      }
      value={value}
      onMount={handleEditorDidMount}
      onChange={(value) => onChange(String(value))}
    />
  )
}

export const CodeEditor = forwardRef(CodeEditorComponent)
