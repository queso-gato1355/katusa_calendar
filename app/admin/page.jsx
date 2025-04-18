'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startAt, setStartAt] = useState('')
  const [endAt, setEndAt] = useState('')
  const [allDay, setAllDay] = useState(false)
  const [category, setCategory] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.from('events').insert([
      {
        title,
        description,
        location,
        start_at: startAt,
        end_at: endAt,
        all_day: allDay,
        category,
      },
    ])

    if (error) {
      alert('일정 추가 실패: ' + error.message)
    } else {
      alert('일정 추가 성공!')
      // 입력 폼 초기화
      setTitle('')
      setDescription('')
      setLocation('')
      setStartAt('')
      setEndAt('')
      setAllDay(false)
      setCategory('')
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">관리자: 일정 추가</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="일정 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="위치"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="datetime-local"
          placeholder="시작 시간"
          value={startAt}
          onChange={(e) => setStartAt(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="datetime-local"
          placeholder="종료 시간"
          value={endAt}
          onChange={(e) => setEndAt(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={allDay}
            onChange={(e) => setAllDay(e.target.checked)}
            id="allDay"
          />
          <label htmlFor="allDay">종일 일정</label>
        </div>
        <input
          type="text"
          placeholder="카테고리 (선택)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          일정 추가하기
        </button>
      </form>
    </div>
  )
}