import type { PaginationParams } from '#global/types'
import type { SolutionsListSorter } from './SolutionsListSorter'

export type SolutionsListParams = {
  title: string
  sorter: SolutionsListSorter
  challengeId: string | null
  userId: string | null
} & PaginationParams
