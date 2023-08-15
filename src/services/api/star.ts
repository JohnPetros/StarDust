'use client'
import { useSupabase } from '@/hooks/useSupabase'
import type { Star } from '@/types/star'

export default () => {
  const { supabase } = useSupabase()

  return {
    getStar: async (starId: string) => {
      const { data, error } = await supabase
        .from('stars')
        .select('*, questions(*)')
        .eq('id', starId)
        .order('order', { foreignTable: 'questions', ascending: true })
        .single<Star>()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },

    getNextStar: async (currentStar: Star, userId: string) => {
      const { data, error } = await supabase
        .from('stars')
        .select('id, users_unlocked_stars(*)')
        .match({
          planet_id: currentStar.planet_id,
          number: currentStar.number + 1,
        })
        .eq('users_unlocked_stars.user_id', userId)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      const nextStar = {
        ...data,
        isUnlocked: data.users_unlocked_stars.length > 0,
      }

      return nextStar
    },

    getUserUnlockedStars: async (userId: string) => {
      const { data, error } = await supabase
        .from('users_unlocked_stars')
        .select('*')
        .eq('user_id', userId)
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  }
}
