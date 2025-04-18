'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useEventHandlers } from './_components/_handlers/useEventHandlers'
import AddEventModal from './_components/AddEventModal'
import EditEventModal from './_components/EditEventModal'
import { toast } from 'react-hot-toast'

export default function AdminMainPage() {
  const [events, setEvents] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const [title, setTitle] = useState('')
  const [startAt, setStartAt] = useState('')
  const [endAt, setEndAt] = useState('')

  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editStartAt, setEditStartAt] = useState('')
  const [editEndAt, setEditEndAt] = useState('')

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('is_disabled', false)
      .order('start_at', { ascending: true })

    setEvents(data || [])
    if (!data) {
      toast.error('일정 불러오기 실패')
    }
  }

  const { handleAddEvent, handleEditEvent, handleDeleteEvent } = useEventHandlers(fetchEvents)

  useEffect(() => {
    fetchEvents()
  }, [])

  const openEditForm = (event) => {
    setEditId(event.id)
    setEditTitle(event.title)
    setEditStartAt(event.start_at.slice(0, 16))
    setEditEndAt(event.end_at.slice(0, 16))
    setShowEditForm(true)
  }

  const clearEditForm = () => {
    setEditId(null)
    setEditTitle('')
    setEditStartAt('')
    setEditEndAt('')
    setShowEditForm(false)
  }

  return (
    <div className="relative p-8">
      <h1 className="text-2xl font-bold mb-6">등록된 일정</h1>

      {/* 일정 테이블 */}
      <div className="overflow-x-auto mb-20">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">제목</th>
              <th className="border p-2">시작</th>
              <th className="border p-2">종료</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="text-center hover:bg-gray-200 cursor-pointer"
                onClick={() => openEditForm(event)}
              >
                <td className="border p-2">{event.title}</td>
                <td className="border p-2">{new Date(event.start_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
                <td className="border p-2">{new Date(event.end_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 고정된 + 버튼 */}
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white text-3xl w-16 h-16 rounded-full shadow-lg hover:bg-blue-600"
        onClick={() => setShowAddForm(!showAddForm)}
        aria-label="Add Event"
      >
        +
      </button>

      {/* 추가 폼 */}
      {showAddForm && (
        <AddEventModal
          title={title}
          setTitle={setTitle}
          startAt={startAt}
          setStartAt={setStartAt}
          endAt={endAt}
          setEndAt={setEndAt}
          handleAddEvent={() => handleAddEvent({
            title, startAt, endAt,
            onSuccess: () => setShowAddForm(false)
          })}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && (
        <EditEventModal
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editStartAt={editStartAt}
          setEditStartAt={setEditStartAt}
          editEndAt={editEndAt}
          setEditEndAt={setEditEndAt}
          handleEditEvent={() => handleEditEvent({
            id: editId,
            title: editTitle,
            startAt: editStartAt,
            endAt: editEndAt,
            onSuccess: clearEditForm
          })}
          handleDeleteEvent={() => handleDeleteEvent({
            id: editId,
            onSuccess: clearEditForm
          })}
          onClose={clearEditForm}
        />
      )}
    </div>
  )
}
