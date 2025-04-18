'use client'

export default function EditEventModal({ editTitle, setEditTitle, editStartAt, setEditStartAt, editEndAt, setEditEndAt, handleEditEvent, handleDeleteEvent, onClose }) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-2xl shadow-2xl w-96 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">일정 수정</h2>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full border p-2 mb-2 rounded-lg"
        />
        <input
          type="datetime-local"
          value={editStartAt}
          onChange={(e) => setEditStartAt(e.target.value)}
          className="w-full border p-2 mb-2 rounded-lg"
        />
        <input
          type="datetime-local"
          value={editEndAt}
          onChange={(e) => setEditEndAt(e.target.value)}
          className="w-full border p-2 mb-4 rounded-lg"
        />
        <div className="flex space-x-2">
          <button
            className="flex-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            onClick={handleEditEvent}
          >
            수정
          </button>
          <button
            className="flex-1 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
            onClick={handleDeleteEvent}
            >
                삭제
            </button>
            <button
            className="flex-1 bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}
