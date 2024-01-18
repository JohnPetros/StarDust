import Asking from '../../../public/animations/apollo-asking.json'
import Crying from '../../../public/animations/apollo-crying.json'
import Denying from '../../../public/animations/apollo-denying.json'
import Earning from '../../../public/animations/apollo-earning.json'
import type { Sound } from '../helpers/playSound'

import type { AlertType } from '@/app/components/Alert'

type AlertEffect = {
  id: AlertType
  animation: unknown | null
  sound: Sound | null
}

export const ALERT_EFFECTS: AlertEffect[] = [
  {
    id: 'earning',
    animation: Earning,
    sound: 'earning.wav',
  },
  {
    id: 'crying',
    animation: Crying,
    sound: 'crying.wav',
  },
  {
    id: 'denying',
    animation: Denying,
    sound: 'denying.wav',
  },
  {
    id: 'asking',
    animation: Asking,
    sound: 'asking.wav',
  },
  {
    id: 'generic',
    animation: null,
    sound: null,
  },
]
