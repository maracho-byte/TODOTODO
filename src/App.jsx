import React from 'react'
import './App.css'
function App() {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🎉 TODOTODO App</h1>
      <p>앱이 성공적으로 배포되었습니다!</p>
      <button
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer'
        }}
        onClick={() => alert('버튼이 작동합니다!')}
      >
        테스트 버튼
      </button>
    </div>
  )
}
export default App
