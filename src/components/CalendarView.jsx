import React, { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button className="btn btn-secondary">
            <ChevronLeft size={16} />
          </button>
          <h2 className="calendar-title">
            Calendar View
          </h2>
          <button className="btn btn-secondary">
            <ChevronRight size={16} />
          </button>
        </div>
        <button className="btn btn-primary">
          <CalendarIcon size={16} />
          Today
        </button>
      </div>
      <div className="calendar-content">
        <p>Calendar view is under construction...</p>
      </div>
    </div>
  )
}
export default CalendarView
