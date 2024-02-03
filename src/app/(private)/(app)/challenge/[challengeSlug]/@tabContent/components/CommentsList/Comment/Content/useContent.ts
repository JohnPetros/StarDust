'use client'

import { useState } from 'react'

import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { useApi } from '@/services/api'
import { ERRORS } from '@/utils/constants'

export function useContent(
  commentId: string,
  initialContent: string,
  onEdit: () => void,
  onCancel: () => void
) {
  const [content, setContent] = useState(initialContent)
  const { user } = useAuth()
  const api = useApi()
  const toast = useToast()

  async function handleEditComment(newContent: string) {
    if (!user) return

    try {
      await api.editComment(commentId, user.id, newContent)
      onEdit()
    } catch (error) {
      console.error(error)
      toast.show(ERRORS.comments.failedEdition, {
        type: 'error',
        seconds: 5,
      })
      onCancel()
    }
  }

  function handleCancelCommentEdition() {
    setContent(initialContent)
    onCancel()
  }

  function handleCommentContentChange(newContent: string) {
    setContent(newContent)
  }

  return {
    content,
    handleEditComment,
    handleCommentContentChange,
    handleCancelCommentEdition,
  }
}
