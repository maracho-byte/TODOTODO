import React from 'react'
import { useTask } from '../contexts/TaskContext'

const TaskStats = () => {
  const { tasks } = useTask()

  const stats = {
    total: tasks.length,
    todo: tasks.filter(task => task.status === 'todo').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length,
    overdue: tasks.filter(task => {
      if (!task.dueDate || task.status === 'completed') return false
      return new Date(task.dueDate) < new Date()
    }).length
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Tasks</h3>
        <div className="stat-value">{stats.total}</div>
      </div>
      
      <div className="stat-card">
        <h3>To Do</h3>
        <div className="stat-value">{stats.todo}</div>
      </div>
      
      <div className="stat-card">
        <h3>In Progress</h3>
        <div className="stat-value">{stats.inProgress}</div>
      </div>
      
      <div className="stat-card">
        <h3>Completed</h3>
        <div className="stat-value">{stats.completed}</div>
      </div>
      
      <div className="stat-card">
        <h3>Overdue</h3>
        <div className="stat-value" style={{ color: stats.overdue > 0 ? 'var(--danger)' : 'inherit' }}>
          {stats.overdue}
        </div>
      </div>
      
      <div className="stat-card">
        <h3>Completion Rate</h3>
        <div className="stat-value">{completionRate}%</div>
      </div>
    </div>
  )
}

export default TaskStats
