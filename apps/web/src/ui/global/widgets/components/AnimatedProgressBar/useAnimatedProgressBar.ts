import { type AnimationDefinition, useAnimation } from 'framer-motion'
import { useCallback, useEffect } from 'react'

export function useAnimatedProgressBar(value: number, onAnimationEnd?: VoidFunction) {
  const animation = useAnimation()

  const fill = useCallback(
    (percentage: number, animationDuration = 0.3) => {
      animation.start({
        width: `${percentage}%`,
        transition: { duration: animationDuration, ease: 'linear' },
      })
    },
    [animation.start],
  )

  function handleAnimationComplete(animationDefinition: object) {
    const isAnimationEnd =
      onAnimationEnd &&
      'width' in animationDefinition &&
      animationDefinition.width === '100%'

    console.log(animationDefinition)

    if (isAnimationEnd) {
      onAnimationEnd()
    }
  }

  useEffect(() => {
    fill(value)
  }, [value, fill])

  return {
    animation,
    fill,
    handleAnimationComplete,
  }
}
