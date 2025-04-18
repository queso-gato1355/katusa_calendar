'use client'

import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export function useEventHandlers(fetchEvents) {
  const handleAddEvent = async ({ title, startAt, endAt, onSuccess }) => {
    if (!title || !startAt || !endAt) {
      toast.error('모든 칸을 채워주세요!')
      return
    }

    const { error } = await supabase.from('events').insert([
      { title, start_at: startAt, end_at: endAt }
    ])

    if (error) {
      toast.error('일정 추가 실패: ' + error.message)
    } else {
      toast.success('일정 추가 완료!')
      onSuccess?.()
      fetchEvents()
    }
  }

  const handleEditEvent = async ({ id, title, startAt, endAt, onSuccess }) => {
    if (!title || !startAt || !endAt) {
      toast.error('모든 칸을 채워주세요!')
      return
    }

    const { error } = await supabase.from('events')
      .update({ title, start_at: startAt, end_at: endAt })
      .eq('id', id)

    if (error) {
      toast.error('일정 수정 실패: ' + error.message)
    } else {
      toast.success('일정 수정 완료!')
      onSuccess?.()
      fetchEvents()
    }
  }

  const handleDeleteEvent = async ({ id, onSuccess }) => {
    const confirmDelete = window.confirm('정말 삭제할까요?')
    if (!confirmDelete) return

    const { error } = await supabase.from('events')
      .update({ is_disabled: true })
      .eq('id', id)

    if (error) {
      toast.error('삭제 실패: ' + error.message)
    } else {
      toast.success('일정 삭제 완료!')
      onSuccess?.()
      fetchEvents()
    }
  }

  return { handleAddEvent, handleEditEvent, handleDeleteEvent }
}
