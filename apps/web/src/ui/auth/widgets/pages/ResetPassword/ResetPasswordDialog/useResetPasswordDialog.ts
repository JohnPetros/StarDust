'use client'

import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordSchema, stringSchema } from '@stardust/validation/global/schemas'

import { COOKIES, ROUTES } from '@/constants'
import { useToastContext } from '@/ui/global/contexts/ToastContext'
import { useApi } from '@/ui/global/hooks/useApi'
import { useRouter } from '@/ui/global/hooks/useRouter'
import type { AlertDialogRef } from '@/ui/global/widgets/components/AlertDialog/types'
import { useCookieActions } from '@/ui/global/hooks/useCookieActions'

const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: stringSchema,
  })
  .refine((fields) => fields.password === fields.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'as senhas devem ser iguais',
  })

type ResetPasswordFormFields = z.infer<typeof resetPasswordFormSchema>

export function useResetPasswordDialog(alertDialogRef: AlertDialogRef | null) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormFields>({
    resolver: zodResolver(resetPasswordFormSchema),
  })
  const { getCookie, deleteCookie } = useCookieActions()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToastContext()
  const router = useRouter()
  const api = useApi()

  function handleConfirmButtonClick() {
    router.goTo(ROUTES.auth.signIn)
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) router.goTo(ROUTES.auth.signIn)
  }

  async function handleFormSubmit({ password }: ResetPasswordFormFields) {
    setIsSubmitting(true)

    const [accessToken, refreshToken] = await Promise.all([
      getCookie(COOKIES.keys.accessToken),
      getCookie(COOKIES.keys.refreshToken),
    ])

    if (!accessToken || !refreshToken)
      throw new Error('Access or refresh token not found')

    const response = await api.resetPassword(password, accessToken, refreshToken)

    if (response.isFailure) {
      toast.show('Erro de redefinição, escolha outra senha', {
        type: 'error',
        seconds: 5,
      })
    }

    if (response.isSuccess) {
      alertDialogRef?.open()
      await Promise.all([
        deleteCookie(COOKIES.keys.accessToken),
        deleteCookie(COOKIES.keys.refreshToken),
        deleteCookie(COOKIES.keys.shouldResetPassword),
      ])
    }

    setIsSubmitting(false)
  }

  return {
    isSubmitting,
    errors,
    register,
    handleOpenChange,
    handleConfirmButtonClick,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
