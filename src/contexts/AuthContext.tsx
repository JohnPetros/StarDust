'use client'

import { createContext, useEffect, useState } from 'react'
import { AuthError, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import useSWR, { mutate } from 'swr'

import type { User } from '@/@types/user'
import { useApi } from '@/services/api'

export interface AuthContextValue {
  user: User | null
  error: unknown
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (
    email: string,
    password: string
  ) => Promise<
    | {
        userId: null
        error: AuthError
      }
    | {
        userId: string
        error: null
      }
    | null
  >
  signOut: () => Promise<string | null>
  updateUser: (newData: Partial<User>) => Promise<string | null>
  serverSession: Session | null | undefined
}

interface AuthProviderProps {
  serverSession?: Session | null
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ serverSession, children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null | undefined>(
    serverSession
  )
  const api = useApi()
  const router = useRouter()

  async function getUser() {
    const userId = session?.user?.id

    if (userId) {
      return await api.getUser(userId)
    }
  }

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(session?.user.id ? '/user' : null, getUser)

  async function signIn(email: string, password: string) {
    const { session, error } = await api.signIn(email, password)

    if (error) {
      return error
    }

    setSession(session)

    return null
  }

  async function signUp(email: string, password: string) {
    return await api.signUp(email, password)
  }

  async function signOut() {
    const error = await api.signOut()

    if (error) return error

    router.push('/sign-in')

    return null
  }

  async function updateUser(newData: Partial<User>): Promise<string | null> {
    if (user?.id) {
      const error = await api.updateUser(newData, user.id)

      if (error) {
        return error
      }

      mutate('/user', { ...user, ...newData }, false)

      return null
    }
    return null
  }

  useEffect(() => {
    if (!session?.user.id) {
      mutate('/user', null, false)
    }
  }, [session])

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((event, session) => {
  //     console.log(serverSession?.refresh_token)
  //     console.log(serverSession?.access_token)

  //     if (session?.access_token !== serverSession?.access_token) {
  //       // setTimeout(() => {
  //       const isPublicRoute = checkIsPublicRoute(pathname)

  //       if (!isPublicRoute) {
  //         router.refresh()
  //       } else {
  //       }
  //       // }, ROCKET_ANIMATION_DURATION * 1000 + 3000)
  //     }
  //   })

  //   return () => {
  //     subscription.unsubscribe()
  //   }
  // }, [supabase, serverSession?.access_token])

  const value: AuthContextValue = {
    user: user ?? null,
    error,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
    serverSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
