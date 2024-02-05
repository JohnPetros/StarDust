import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type SaveHandler = (() => Promise<void>) | null

export type SaveButtonStoreActions = {
  setSaveHandler: (saveHandler: SaveHandler) => void
  setShouldSave: (shouldSave: boolean) => void
  resetState: () => void
}

export type SaveButtonContextState = {
  saveHandler: SaveHandler
  shouldSave: boolean
}

export type SaveButtonStoreProps = {
  state: SaveButtonContextState
  actions: SaveButtonStoreActions
}

const initialState: SaveButtonContextState = {
  saveHandler: null,
  shouldSave: false,
}

export const useSaveButtonStore = create<SaveButtonStoreProps>()(
  immer((set) => {
    return {
      state: initialState,
      actions: {
        setSaveHandler(saveHandler: SaveHandler) {
          return set(({ state }) => {
            state.saveHandler = saveHandler
          })
        },
        setShouldSave(shouldSave: boolean) {
          return set(({ state }) => {
            state.shouldSave = shouldSave
          })
        },
        resetState() {
          return set(({ actions }) => ({ state: initialState, actions }))
        },
      },
    }
  })
)
