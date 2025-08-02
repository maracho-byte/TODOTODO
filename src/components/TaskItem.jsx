import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Edit2, Trash2, Calendar, GripVertical } from 'lucide-react'
import { useTask } from '../contexts/TaskContext'
import { format, isToday, isPast } from 'date-fns'

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask, setEditingTask } = useTask()
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus })
  }

  const handleEdit = () => {
    setEditingTask(task)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id)
    }
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    
    const date = new Date(dateString)
    if (isToday(date)) {
      return 'Today'
    } else if (isPast(date)) {
      return `Overdue (${format(date, 'MMM d')})`
    } else {
      return format(date, 'MMM d, yyyy')
    }
  }

  const dueDateFormatted = formatDueDate(task.dueDate)
  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'completed'

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-item ${isDragging ? 'dragging' : ''}`}
    >
      <div className="task-header">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div
              {...attributes}
              {...listeners}
              style={{ cursor: 'grab', color: 'var(--text-muted)' }}
            >
              <GripVertical size={16} />
            </div>
            <h3 className="task-title">{task.title}</h3>
          </div>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
        
        <div className="task-actions">
          <button
            className="btn btn-secondary"
            onClick={handleEdit}
            title="Edit task"
          >
            <Edit2 size={14} />
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            title="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="task-meta">
        <select
          className="task-status"
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <span className={`task-priority ${task.priority}`}>
          {task.priority}
        </span>

        {dueDateFormatted && (
          <div className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
            <Calendar size={12} />
            <span style={{ color: isOverdue ? 'var(--danger)' : 'inherit' }}>
              {dueDateFormatted}
            </span>
          </div>
        )}

        {task.tags && task.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
            {task.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskItem
