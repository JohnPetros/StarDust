import { ChallengeCraftsVisibility } from '@stardust/core/challenging/structs'
import type { ChallengeStoreState } from '../types'

export const INITIAL_CHALLENGE_STORE_STATE: ChallengeStoreState = {
  challenge: null,
  craftsVislibility: ChallengeCraftsVisibility.create({
    canShowSolutions: false,
    canShowComments: false,
  }),
  mdx: '',
  vote: null,
  tabHandler: null,
  panelsLayout: 'tabs-left;code_editor-right',
}
