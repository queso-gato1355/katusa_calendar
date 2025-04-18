'use client'

export default function AddEventModal({ title, setTitle, startAt, setStartAt, endAt, setEndAt, handleAddEvent, onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-30 animate-fadeIn"
      onClick={onClose} // ✨ 배경 클릭하면 닫기
    >
      <div
        className="bg-white p-4 shadow-2xl rounded-2xl w-80 m-8 animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // ✨ 모달 내부 클릭은 버블링 막기
      >
        <h2 className="text-xl font-semibold mb-4">새 일정 추가</h2>
        {/* 폼 내용 */}
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-2 rounded-lg"
        />
        <input
          type="datetime-local"
          value={startAt}
          onChange={(e) => setStartAt(e.target.value)}
          className="w-full border p-2 mb-2 rounded-lg"
        />
        <input
          type="datetime-local"
          value={endAt}
          onChange={(e) => setEndAt(e.target.value)}
          className="w-full border p-2 mb-4 rounded-lg"
        />
        <div className="flex space-x-2">
          <button
            className="flex-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            onClick={handleAddEvent}
          >
            저장
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
