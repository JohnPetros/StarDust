import {
  ArrowUp,
  ArrowDown,
  ArrowsDownUp,
  ArrowClockwise,
  ArrowLeft,
  ArrowRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  CodeBlock,
  CaretUp,
  Copy,
  Envelope,
  EyeClosed,
  Lightbulb,
  Prohibit,
  Smiley,
  CalendarBlank,
  Check,
  CheckCircle,
  Circle,
  SignIn,
  Eyes,
  Eye,
  Function as FunctionIcon,
  X,
  Link,
  DotsThreeOutlineVertical,
  Terminal,
  Tag,
  Plus,
  TestTube,
  Exam,
  Pencil,
  Command,
  Notebook,
  PlusCircle,
  User,
  List,
  Layout,
  WarningCircle,
  Quotes,
  FileCode,
  Planet,
  GearSix,
  Shield,
  Lock,
  Clock,
  ChartLine,
  PaperPlaneRight,
  ChatText,
  ShareNetwork,
  Trash,
  ChatCircleText,
  BookBookmark,
  ChatCircle,
  TextH,
  ListNumbers,
  ListBullets,
  Target,
  ThumbsUp,
  ThumbsDown,
  Power,
  Rocket,
  Code,
  Minus,
  Flag,
  Cloud,
  TerminalWindow,
  Article,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'

import type { IconName } from '../types/IconName'

export const ICONS: Record<IconName, Icon> = {
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up-down': ArrowsDownUp,
  'eye-closed': EyeClosed,
  'stop-sign': Prohibit,
  'sign-out': Power,
  'three-dots': DotsThreeOutlineVertical,
  'simple-arrow-up': CaretUp,
  'simple-arrow-down': CaretDown,
  'simple-arrow-left': CaretLeft,
  'simple-arrow-right': CaretRight,
  'runnable-code': TerminalWindow,
  'text-block': ChatCircleText,
  'strong-text-block': ChatText,
  'ordered-list': ListNumbers,
  'unordered-list': ListBullets,
  'double-eyes': Eyes,
  'plus-circle': PlusCircle,
  plus: Plus,
  comment: ChatCircle,
  alert: WarningCircle,
  cloud: Cloud,
  reload: ArrowClockwise,
  title: TextH,
  strong: Article,
  send: PaperPlaneRight,
  share: ShareNetwork,
  book: BookBookmark,
  link: Link,
  minus: Minus,
  divider: Minus,
  function: FunctionIcon,
  quote: Quotes,
  command: Command,
  menu: List,
  copy: Copy,
  snippet: CodeBlock,
  achievement: Flag,
  lightbulb: Lightbulb,
  planet: Planet,
  check: Check,
  smile: Smiley,
  checked: CheckCircle,
  code: Code,
  tag: Tag,
  level: Exam,
  trash: Trash,
  test: TestTube,
  pencil: Pencil,
  description: Notebook,
  unchecked: Circle,
  upvote: ThumbsUp,
  downvote: ThumbsDown,
  rate: ChartLine,
  target: Target,
  clock: Clock,
  layout: Layout,
  calendar: CalendarBlank,
  shield: Shield,
  gear: GearSix,
  terminal: Terminal,
  person: User,
  file: FileCode,
  enter: SignIn,
  eye: Eye,
  mail: Envelope,
  rocket: Rocket,
  home: Envelope,
  close: X,
  lock: Lock,
}
