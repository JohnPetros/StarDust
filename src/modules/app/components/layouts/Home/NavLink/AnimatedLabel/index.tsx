'use client'

import { motion, type Variants } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

const variants: Variants = {
  mobile: {
    paddingLeft: 0,
  },
  shrink: {
    paddingLeft: 80,
  },
  expand: {
    paddingLeft: 160,
  },
}

type AnimatedLabelProps = {
  children: string
  isExpanded: boolean
  isActive: boolean
}

export function AnimatedLabel({ children, isExpanded, isActive }: AnimatedLabelProps) {
  return (
    <motion.span
      variants={variants}
      initial='shrink'
      animate={isExpanded ? 'expand' : ''}
      className={twMerge(
        '-ml-2 mt-2 block overflow-hidden text-[12px] font-semibold md:-m-0 md:text-sm',
        isActive ? 'text-gray-100' : 'text-gray-400'
      )}
    >
      {children}
    </motion.span>
  )
}
