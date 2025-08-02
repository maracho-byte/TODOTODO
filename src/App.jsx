import React, { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import TaskStats from './components/TaskStats'
import CalendarView from './components/CalendarView'
import { useTheme } from './contexts/ThemeContext'

function App() {
  const { theme } = useTheme()
  const [currentView, setCurrentView] = useState('list') // 'list' or 'calendar'

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <Header />
        <TaskStats />
        
        {/* 뷰 전환 버튼 */}
        <div className="view-toggle" style={{ marginBottom: '2rem' }}>
          <button 
            className={`btn ${currentView === 'list' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setCurrentView('list')}
          >
            List View
          </button>
          <button 
            className={`btn ${currentView === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setCurrentView('calendar')}
          >
            Calendar View
          </button>
        </div>

        <TaskForm />
        
        {currentView === 'list' ? (
          <>
            <FilterBar />
            <TaskList />
          </>
        ) : (
          <CalendarView />
        )}
      </div>
    </div>
  )
}

export default App
