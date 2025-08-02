import React, { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Repeat } from 'lucide-react'
import { useTask } from '../contexts/TaskContext'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths
} from 'date-fns'
const CalendarView = () => {
  const { tasks, setCalendarDate, currentCalendarDate } = useTask()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentCalendarDate || new Date())
    const monthEnd = endOfMonth(currentCalendarDate || new Date())
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }, [currentCalendarDate])
  const getTasksForDate = (date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    return tasks.filter(task => task.dueDate === dateString)
  }
  const getFixedTasks = () => {
    return tasks.filter(task => !task.dueDate && !task.isRecurringInstance)
  }
  const navigateMonth = (direction) => {
    const currentDate = currentCalendarDate || new Date()
    const newDate = direction === 'prev'
      ? subMonths(currentDate, 1)
      : addMonths(currentDate, 1)
    if (setCalendarDate) {
      setCalendarDate(newDate)
    }
  }
  const goToToday = () => {
    const today = new Date()
    if (setCalendarDate) {
      setCalendarDate(today)
    }
    setSelectedDate(today)
  }
  const TaskCard = ({ task, isCompact = false }) => (
    <div
      className={`calendar-task-card ${task.priority} ${task.isRecurringInstance ? 'recurring' : ''}`}
      title={`${task.title}${task.isRecurringInstance ? ' (반복)' : ''}`}
    >
      {task.isRecurringInstance && <Repeat size={10} />}
      <span className="task-title">
        {isCompact && task.title.length > 15 ? task.title.substring(0, 15) + '...' : task.title}
      </span>
      <span className={`task-status ${task.status}`}></span>
    </div>
  )
  const fixedTasks = getFixedTasks()
  const currentDate = currentCalendarDate || new Date()
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button className="btn btn-secondary" onClick={() => navigateMonth('prev')}>
            <ChevronLeft size={16} />
          </button>
          <h2 className="calendar-title">
            {format(currentDate, 'yyyy년 MM월')}
          </h2>
          <button className="btn btn-secondary" onClick={() => navigateMonth('next')}>
            <ChevronRight size={16} />
          </button>
        </div>
        <button className="btn btn-primary" onClick={goToToday}>
          <CalendarIcon size={16} />
          Today
        </button>
      </div>
      <div className="calendar-layout">
        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="weekday-header">{day}</div>
            ))}
          </div>
          <div className="calendar-days">
            {calendarDays.map(day => {
              const dayTasks = getTasksForDate(day)
              const isCurrentMonth = isSameMonth(day, currentDate)
              const isSelected = isSameDay(day, selectedDate)
              const isTodayDate = isToday(day)
              return (
                <div
                  key={day.toISOString()}
                  className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isSelected ? 'selected' : ''} ${isTodayDate ? 'today' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="day-number">{format(day, 'd')}</div>
                  <div className="day-tasks">
                    {dayTasks.slice(0, 3).map(task => (
                      <TaskCard key={task.id} task={task} isCompact={true} />
                    ))}
                    {dayTasks.length > 3 && (
                      <div className="more-tasks">+{dayTasks.length - 3}개 더</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="fixed-tasks-sidebar">
          <h3>상시 업무</h3>
          <div className="fixed-tasks-list">
            {fixedTasks.length === 0 ? (
              <p className="empty-message">상시 업무가 없습니다</p>
            ) : (
              fixedTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>
      </div>
      {selectedDate && (
        <div className="selected-date-tasks">
          <h3>{format(selectedDate, 'yyyy년 MM월 dd일')} 업무</h3>
          <div className="date-tasks-list">
            {getTasksForDate(selectedDate).map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default CalendarView
