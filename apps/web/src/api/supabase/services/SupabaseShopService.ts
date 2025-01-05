import { ApiResponse, PaginationResponse } from '@stardust/core/responses'
import type { ShopItemsListingParams } from '@stardust/core/shop/types'
import type { IShopService } from '@stardust/core/interfaces'
import { HTTP_STATUS_CODE } from '@stardust/core/constants'

import type { Supabase } from '../types/Supabase'
import { SupabasePostgrestError } from '../errors'
import { SupabaseAvatarMapper, SupabaseRocketMapper } from '../mappers'
import { calculateSupabaseRange } from '../utils'

export const SupabaseShopService = (supabase: Supabase): IShopService => {
  const supabaseAvatarMapper = SupabaseAvatarMapper()
  const supabaseRocketMapper = SupabaseRocketMapper()

  return {
    async fetchAvatarById(avatarId: string) {
      const { data, error } = await supabase
        .from('avatars')
        .select('*')
        .eq('id', avatarId)
        .single()

      if (error) {
        return SupabasePostgrestError(
          error,
          'Avatar não encontrado',
          HTTP_STATUS_CODE.notFound,
        )
      }

      const avatar = supabaseAvatarMapper.toDto(data)

      return new ApiResponse({ body: avatar })
    },

    async fetchShopAvatarsList({
      search,
      page,
      itemsPerPage,
      order,
    }: ShopItemsListingParams) {
      let query = supabase.from('avatars').select('*', {
        count: 'exact',
        head: false,
      })

      if (search && search.length > 1) {
        query = query.ilike('name', `%${search}%`)
      }

      const range = calculateSupabaseRange(page, itemsPerPage)

      query = query
        .order('price', { ascending: order === 'ascending' })
        .range(range.from, range.to)

      const { data, count, error } = await query

      if (error) {
        return SupabasePostgrestError(error, 'Erro inesperado ao buscar avatares')
      }

      const avatars = data.map(supabaseAvatarMapper.toDto)

      const pagination = new PaginationResponse(avatars, Number(count))

      return new ApiResponse({ body: pagination })
    },

    async fetchAcquirableRocketsByDefault() {
      const { data, error } = await supabase
        .from('rockets')
        .select('*')
        .eq('is_acquired_by_default', true)

      if (error) {
        return SupabasePostgrestError(error, 'Erro inesperado ao buscar avatares grátis')
      }

      const rockets = data.map(supabaseRocketMapper.toDto)

      return new ApiResponse({ body: rockets })
    },

    async fetchRocketById(rocketId: string) {
      const { data, error } = await supabase
        .from('rockets')
        .select('*')
        .eq('id', rocketId)
        .single()

      if (error) {
        return SupabasePostgrestError(
          error,
          'Foquete não encontrado',
          HTTP_STATUS_CODE.notFound,
        )
      }

      const rocket = supabaseRocketMapper.toDto(data)

      return new ApiResponse({ body: rocket })
    },

    async fetchShopRocketsList({
      search,
      page,
      itemsPerPage,
      order,
    }: ShopItemsListingParams) {
      let query = supabase.from('rockets').select('*', {
        count: 'exact',
        head: false,
      })

      if (search && search.length > 1) {
        query = query.ilike('name', `%${search}%`)
      }

      const range = calculateSupabaseRange(page, itemsPerPage)

      query = query
        .order('price', { ascending: order === 'ascending' })
        .range(range.from, range.to)

      const { data, count, error } = await query

      if (error) {
        return SupabasePostgrestError(
          error,
          'Erro inesperado ao buscar lista de foquetes',
        )
      }

      const rockets = data.map(supabaseRocketMapper.toDto)

      const pagination = new PaginationResponse(rockets, Number(count))

      return new ApiResponse({ body: pagination })
    },

    async saveAcquiredAvatar(avatarId: string, userId: string) {
      const { error } = await supabase
        .from('users_acquired_avatars')
        .insert({ avatar_id: avatarId, user_id: userId })

      if (error) {
        return SupabasePostgrestError(error, 'Erro inesperado ao salvar avatar adquirido')
      }

      return new ApiResponse()
    },

    async fetchAcquirableAvatarsByDefault() {
      const { data, error } = await supabase
        .from('avatars')
        .select('*')
        .eq('is_acquired_by_default', true)

      if (error) {
        return SupabasePostgrestError(error, 'Erro inesperado ao buscar avatares grátis')
      }

      const avatars = data.map(supabaseAvatarMapper.toDto)

      return new ApiResponse({ body: avatars })
    },

    async saveAcquiredRocket(rocketId: string, userId: string) {
      const { error } = await supabase
        .from('users_acquired_rockets')
        .insert([{ rocket_id: rocketId, user_id: userId }])

      if (error) {
        return SupabasePostgrestError(
          error,
          'Erro inesperado ao salvar foquete adquirido',
        )
      }

      return new ApiResponse()
    },
  }
}
